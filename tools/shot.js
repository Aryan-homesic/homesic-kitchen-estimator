// Renders app screens with headless Chrome over CDP and saves PNGs.
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9223;
const OUT = path.join(path.dirname(__dirname), '.shots');
const URL = 'http://127.0.0.1:8777/';
const W = Number(process.argv[2] || 390), H = Number(process.argv[3] || 844);
const shots = (process.argv[4] || 'start:0,units').split(',');

const sleep = ms => new Promise(r => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(OUT, { recursive: true });
  const proc = spawn(CHROME, ['--headless=new', '--disable-gpu', '--no-sandbox', '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${path.join(OUT, 'prof')}`, 'about:blank'], { stdio: 'ignore' });

  let targets = [];
  for (let i = 0; i < 40; i++) {
    try { targets = await (await fetch(`http://127.0.0.1:${PORT}/json/list`)).json(); if (targets.length) break; } catch {}
    await sleep(250);
  }
  const page = targets.find(t => t.type === 'page');
  if (!page) { console.error('no page target'); process.exit(1); }

  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0; const pending = new Map();
  ws.onmessage = ev => { const m = JSON.parse(ev.data); if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); } };
  const send = (method, params = {}) => new Promise(res => { const i = ++id; pending.set(i, res); ws.send(JSON.stringify({ id: i, method, params })); });
  await new Promise(r => (ws.onopen = r));

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 2, mobile: true });
  await send('Page.navigate', { url: URL });
  await sleep(2500);

  const dims = await send('Runtime.evaluate', { expression: 'JSON.stringify({sw:document.documentElement.scrollWidth,iw:innerWidth,bw:document.body.scrollWidth})', returnByValue: true });
  console.log('dims', dims.result && dims.result.result && dims.result.result.value);

  for (const spec of shots) {
    const [name, step] = spec.split(':');
    if (name === 'start') {
      await send('Runtime.evaluate', { expression: 'go(0)' });
    } else {
      await send('Runtime.evaluate', { expression: `state.layout='lshape'; state.l='10'; state.b='8'; state.h='9';
        if('${name}'==='quote'){ state.name='Aryan'; state.phone='9876543210'; state.city='Bengaluru';
          state.lead = { id:'HS-DEMO', at:new Date().toISOString(), delivery:'local' }; }
        state.step = STEPS.findIndex(s => s.id === '${name}'); draw();` });
    }
    await sleep(700);
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    const file = path.join(OUT, `${name}-${W}.png`);
    fs.writeFileSync(file, Buffer.from(shot.result.data, 'base64'));
    console.log('saved', file);
  }

  proc.kill();
  process.exit(0);
})();

/**
 * Builds dist/ — a single, minified, source-comment-free copy of the app.
 *
 * This is deterrence, not security: a browser must download whatever it runs.
 * See PROTECTING-THE-APP.md for what actually protects the rates.
 *
 *   node tools/build-dist.js
 */
'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');
const { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TMP = fs.mkdtempSync(path.join(os.tmpdir(), 'homesic-'));

const read = (p) => fs.readFileSync(path.join(ROOT, p), 'utf8');
const write = (p, s) => fs.writeFileSync(path.join(ROOT, p), s);

function esbuild(args) {
  // on Windows npx is a .cmd shim, which needs a shell to spawn
  const win = process.platform === 'win32';
  execFileSync(win ? 'npx.cmd' : 'npx', ['--yes', 'esbuild', ...args],
    { stdio: ['ignore', 'pipe', 'pipe'], shell: win });
}

function minifyJs(code, name) {
  const inFile = path.join(TMP, name + '.js');
  const outFile = path.join(TMP, name + '.min.js');
  fs.writeFileSync(inFile, code, 'utf8');
  esbuild([inFile, '--minify', '--target=es2020', '--legal-comments=none', '--outfile=' + outFile]);
  return fs.readFileSync(outFile, 'utf8').trim();
}

function minifyCss(code) {
  const inFile = path.join(TMP, 'app.css');
  const outFile = path.join(TMP, 'app.min.css');
  fs.writeFileSync(inFile, code, 'utf8');
  esbuild([inFile, '--minify', '--outfile=' + outFile]);
  return fs.readFileSync(outFile, 'utf8').trim();
}

// ---------------------------------------------------------------- start clean
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

let html = read('index.html');

// ---------------------------------------------------------------- style
const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/);
if (!styleMatch) throw new Error('no <style> block found');
const cssMin = minifyCss(styleMatch[1]);
html = html.replace(styleMatch[0], '<style>' + cssMin + '</style>');

// ---------------------------------------------------------------- inline script
const scriptRe = /<script>([\s\S]*?)<\/script>/g;
let scriptCount = 0;
html = html.replace(scriptRe, (whole, code) => {
  scriptCount++;
  return '<script>' + minifyJs(code, 'inline' + scriptCount) + '</script>';
});

// ---------------------------------------------------------------- external files
const pdfJs = minifyJs(read('quote-pdf.js'), 'quote-pdf');
fs.mkdirSync(path.join(DIST, 'assets', 'vendor'), { recursive: true });
fs.writeFileSync(path.join(DIST, 'quote-pdf.js'), pdfJs, 'utf8');
fs.copyFileSync(path.join(ROOT, 'assets', 'vendor', 'jspdf.umd.min.js'),
  path.join(DIST, 'assets', 'vendor', 'jspdf.umd.min.js'));

// ---------------------------------------------------------------- images
function copyDir(from, to) {
  if (!fs.existsSync(from)) return;
  fs.mkdirSync(to, { recursive: true });
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) copyDir(src, dst);
    else if (/\.(jpe?g|png|svg|webp|ico)$/i.test(entry.name)) fs.copyFileSync(src, dst);
  }
}
copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));

// ---------------------------------------------------------------- strip comments + add notice
const banner = `<!--
  Homesic kitchen estimator — https://homsic.com
  (c) ${new Date().getFullYear()} HomeSic Interiors & Design Pvt. Ltd. All rights reserved.
  Licensed for use through this site only. Copying, redistributing or reselling this
  application, its rates or its output templates is prohibited without written permission.
-->
`;
html = html.replace(/<!--(?!\[if)[\s\S]*?-->/g, '').replace(/^/, banner);

// ---------------------------------------------------------------- mild anti-casual-copy
const guard = `<script>(function(){var n=0;document.addEventListener('contextmenu',function(e){e.preventDefault()});
document.addEventListener('keydown',function(e){var k=(e.key||'').toLowerCase();
if(k==='f12'||(e.ctrlKey&&e.shiftKey&&['i','j','c'].indexOf(k)>-1)||(e.ctrlKey&&['u','s'].indexOf(k)>-1)){e.preventDefault()}});
console.log('%cHomeSic','font:600 18px serif;color:#C4708A');console.log('This application is licensed, not sold. Rates and templates are the property of HomeSic Interiors & Design Pvt. Ltd.');})();</script>`;
html = html.replace('</body>', guard + '\n</body>');

write('dist/index.html', html);

const kb = (n) => Math.round(n / 1024) + ' KB';
const srcSize = fs.statSync(path.join(ROOT, 'index.html')).size;
const outSize = fs.statSync(path.join(DIST, 'index.html')).size;
console.log('dist/index.html  ' + kb(srcSize) + '  ->  ' + kb(outSize));
console.log('scripts minified  ' + scriptCount + ' inline + quote-pdf.js');
console.log('assets copied    ' + fs.readdirSync(path.join(DIST, 'assets')).length + ' entries');

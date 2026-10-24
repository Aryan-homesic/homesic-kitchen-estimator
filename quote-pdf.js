/* Homesic quote PDF — one compact A4 page that mirrors the on-screen card. */
(function () {
  const { jsPDF } = window.jspdf;

  const INK = '#1B1A18', MUTED = '#6F6A62', FAINT = '#948E84', ACC = '#8A5A2B',
    LINE = '#DED6C8', BOX = '#F1EBDD', PAPER = '#FAF6EE';

  const money = n => 'Rs ' + Math.round(n).toLocaleString('en-IN');

  function loadImage(path) {
    return fetch(path).then(r => r.blob()).then(b => new Promise(res => {
      const img = new Image();
      img.onload = () => {
        const cv = document.createElement('canvas');
        cv.width = 220; cv.height = Math.round(220 * img.height / img.width);
        const ctx = cv.getContext('2d');
        ctx.fillStyle = PAPER; ctx.fillRect(0, 0, cv.width, cv.height);
        ctx.drawImage(img, 0, 0, cv.width, cv.height);
        res({ data: cv.toDataURL('image/jpeg', 0.9) });
      };
      img.onerror = () => res(null);
      img.src = URL.createObjectURL(b);
    })).catch(() => null);
  }

  async function build(d) {
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
    const M = 18, PW = 210, PH = 297, CW = PW - M * 2;
    const F = (size, color, style) => { doc.setFontSize(size); doc.setTextColor(color); doc.setFont('helvetica', style || 'normal'); };
    const wrap = (text, x, y, w, lh) => {
      const lines = doc.splitTextToSize(String(text || ''), w);
      lines.forEach((l, i) => doc.text(l, x, y + i * lh));
      return y + lines.length * lh;
    };

    doc.setFillColor(PAPER); doc.rect(0, 0, PW, PH, 'F');

    let y = M;
    const logo = await loadImage('assets/logo-mark.png');
    if (logo) doc.addImage(logo.data, 'JPEG', M, y, 13, 13 * (220 / 220) * (logo.h || 1) / 1);
    F(18, INK, 'bold'); doc.text('HOMESIC', M + 17, y + 7);
    F(7, MUTED); doc.text('INTERIORS & DESIGN PVT LTD', M + 17, y + 12);
    F(8.5, MUTED); doc.text('Quote ' + d.ref, PW - M, y + 5, { align: 'right' });
    F(8, FAINT); doc.text(d.dateStr, PW - M, y + 10.5, { align: 'right' });
    y += 20;

    doc.setDrawColor(INK); doc.setLineWidth(0.6); doc.line(M, y, PW - M, y);
    y += 10;

    F(15, INK, 'bold'); doc.text('Your kitchen for ' + money(d.total), M, y + 4);
    y += 9;
    F(8.5, MUTED); y = wrap('All-inclusive — material, labour, hardware, transport and 5% design, with a 10-year service warranty.', M, y + 3, CW, 4.2) + 4;

    F(8, MUTED); doc.text('PREPARED FOR', M, y + 3);
    F(9.5, INK, 'bold'); doc.text(d.name, M, y + 8.5);
    F(8, MUTED); doc.text([d.phone, d.email, d.city].filter(Boolean).join('  ·  '), M, y + 13.5);
    y += 19;

    /* picks */
    F(7.5, FAINT); doc.text('WHAT YOU PICKED', M, y);
    y += 6;
    const colW = CW / 2;
    d.picks.forEach((p, i) => {
      const x = M + (i % 2) * colW;
      const yy = y + Math.floor(i / 2) * 7.7;
      F(6.8, FAINT); doc.text(p[0].toUpperCase(), x, yy);
      F(8.6, INK); doc.text(String(p[1]).slice(0, 46), x, yy + 4.4);
    });
    y += Math.ceil(d.picks.length / 2) * 7.7 + 2;

    /* bill */
    F(7.5, FAINT); doc.text('THE BILL', M, y);
    y += 6;
    d.rows.forEach(r => {
      F(8.8, INK); doc.text(r.label, M, y + 3.2);
      if (r.detail) { F(7, MUTED); doc.text(r.detail, M, y + 7); }
      F(9.2, INK, 'bold'); doc.text(money(r.amount), PW - M, y + 4.6, { align: 'right' });
      y += r.detail ? 9.2 : 7.6;
      doc.setDrawColor(LINE); doc.setLineWidth(0.2); doc.line(M, y - 3.4, PW - M, y - 3.4);
    });

    y += 3;
    F(8.6, MUTED); doc.text('Materials, labour, hardware, transport', PW - M - 46, y, { align: 'right' });
    F(9, INK); doc.text(money(d.construction), PW - M, y, { align: 'right' });
    y += 7;
    doc.setDrawColor(INK); doc.setLineWidth(0.4); doc.line(PW - M - 74, y - 3, PW - M, y - 3);
    F(10, INK, 'bold'); doc.text('Total, all-inclusive', PW - M - 46, y + 4, { align: 'right' });
    F(14, ACC, 'bold'); doc.text(money(d.total), PW - M, y + 4, { align: 'right' });
    y += 11;

    /* payments */
    y += 6;
    F(6.6, MUTED);
    wrap('Final figures confirmed after site measurement. 10-year Homesic service warranty; brand warranty on materials.' + (d.skipped && d.skipped.length ? ' Not included: ' + d.skipped.join(', ') + '.' : ''), M, y, CW, 3.4);
    y = Math.max(y + 8, PH - 54);
    const bw = (CW - 9) / 4;
    d.terms.forEach((t, i) => {
      const x = M + i * (bw + 3);
      doc.setFillColor(BOX); doc.roundedRect(x, y, bw, 19, 2, 2, 'F');
      F(11, ACC, 'bold'); doc.text(t.pct + '%', x + 3.5, y + 8);
      F(6.6, MUTED); wrap(t.label, x + 3.5, y + 12, bw - 7, 3.2);
      F(8, INK, 'bold'); doc.text(money(t.amount), x + 3.5, y + 19);
    });



    F(6.2, FAINT);
    doc.text('Homesic Interiors & Design Pvt Ltd  ·  ' + d.ref + '  ·  ' + d.dateStr, M, PH - 7);
    return doc;
  }

  window.HomesicQuotePdf = { build };
})();

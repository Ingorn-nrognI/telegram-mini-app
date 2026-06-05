const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

const loopStart = code.indexOf('  for (let i = _borderGlowPoints.length - 1; i >= 0; i--) {');
const loopEnd = code.indexOf('  ctx.restore();\r\n}\r\n\r\nfunction drawScannerEmptyArenaState', loopStart);

const newLoop = `  for (let i = _borderGlowPoints.length - 1; i >= 0; i--) {
    const pt = _borderGlowPoints[i];
    const age = now - pt.t;
    if (age > 800) { _borderGlowPoints.splice(i, 1); continue; }
    const alpha = Math.max(0, 1 - age / 800) * 0.85;
    const dL = pt.x, dR = size - pt.x, dT = pt.y, dB = size - pt.y;
    const dMin = Math.min(dL, dR, dT, dB);
    const isHoriz = dMin === dT || dMin === dB;
    const gx = dMin === dL ? bw * 0.5 : dMin === dR ? size - bw * 0.5 : pt.x;
    const gy = dMin === dT ? bw * 0.5 : dMin === dB ? size - bw * 0.5 : pt.y;
    const rLong = bw * 3.5;
    const rShort = bw * 1.4;
    const scaleX = isHoriz ? rLong / rShort : 1;
    const scaleY = isHoriz ? 1 : rLong / rShort;
    const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, rShort);
    grad.addColorStop(0, \`rgba(45, 225, 255, \${alpha})\`);
    grad.addColorStop(0.4, \`rgba(45, 225, 255, \${alpha * 0.55})\`);
    grad.addColorStop(1, 'rgba(45, 225, 255, 0)');
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, size, size);
    ctx.rect(bw, bw, size - bw * 2, size - bw * 2);
    ctx.clip('evenodd');
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(gx, gy);
    ctx.scale(scaleX, scaleY);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(0, 0, rShort, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }\r\n\r\n`;

code = code.slice(0, loopStart) + newLoop + code.slice(loopEnd);
fs.writeFileSync(file, code, 'utf8');
const count = (code.match(/const gx/g)||[]).length;
console.log('Done. gx count:', count);
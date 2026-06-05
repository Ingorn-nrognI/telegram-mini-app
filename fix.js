const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

const loopStart = code.indexOf('  for (let i = _borderGlowPoints.length - 1; i >= 0; i--) {');
const loopEnd = code.indexOf('  ctx.restore();\r\n}\r\n\r\nfunction drawScannerEmptyArenaState', loopStart);

const newLoop = `  for (let i = _borderGlowPoints.length - 1; i >= 0; i--) {\r\n    const pt = _borderGlowPoints[i];\r\n    const age = now - pt.t;\r\n    if (age > 800) { _borderGlowPoints.splice(i, 1); continue; }\r\n    const alpha = Math.max(0, 1 - age / 800) * 0.85;\r\n    const radius = bw * 2.8;\r\n    const dL = pt.x, dR = size - pt.x, dT = pt.y, dB = size - pt.y;\r\n    const dMin = Math.min(dL, dR, dT, dB);\r\n    const gx = dMin === dL ? bw * 0.5 : dMin === dR ? size - bw * 0.5 : pt.x;\r\n    const gy = dMin === dT ? bw * 0.5 : dMin === dB ? size - bw * 0.5 : pt.y;\r\n    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);\r\n    grad.addColorStop(0, \`rgba(45, 225, 255, \${alpha})\`);\r\n    grad.addColorStop(0.45, \`rgba(45, 225, 255, \${alpha * 0.5})\`);\r\n    grad.addColorStop(1, 'rgba(45, 225, 255, 0)');\r\n    ctx.save();\r\n    ctx.globalAlpha = 1;\r\n    ctx.globalCompositeOperation = 'lighter';\r\n    ctx.fillStyle = grad;\r\n    ctx.beginPath();\r\n    ctx.rect(0, 0, size, size);\r\n    ctx.rect(bw, bw, size - bw * 2, size - bw * 2);\r\n    ctx.fill('evenodd');\r\n    ctx.restore();\r\n  }\r\n\r\n`;

code = code.slice(0, loopStart) + newLoop + code.slice(loopEnd);
fs.writeFileSync(file, code, 'utf8');
console.log('Done. lines:', code.split('\n').length, 'gx count:', (code.match(/const gx/g)||[]).length);

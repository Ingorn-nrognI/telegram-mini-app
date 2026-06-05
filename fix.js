const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);',
  'const gx = Math.max(bw * 0.5, Math.min(size - bw * 0.5, pt.x));\n    const gy = Math.max(bw * 0.5, Math.min(size - bw * 0.5, pt.y));\n    const grad = ctx.createRadialGradient(gx, gy, 0, gx, gy, radius);'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('const gx = Math.max'));

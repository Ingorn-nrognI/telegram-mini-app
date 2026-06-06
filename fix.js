const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

// Баг 1: уменьшаем максимальный dt чтобы не было прыжков
code = code.replace(
  'const _dt = Math.min(0.5, Math.max(0, (Date.now() - _serverBeamPosLastUpdate) / 1000));',
  'const _dt = Math.min(0.1, Math.max(0, (Date.now() - _serverBeamPosLastUpdate) / 1000));'
);

// Баг 2: сбрасываем _lastWall когда луч уходит от стенки
code = code.replace(
  '      renderScannerCanvas._lastWall = _curWall;',
  '      if (!_curWall) renderScannerCanvas._lastWall = null;\n      else renderScannerCanvas._lastWall = _curWall;'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('0.1') && code.includes('_lastWall = null'));

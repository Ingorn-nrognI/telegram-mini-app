const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  '_lobbyAtWall = _lobbyBx <= _lobbySafePad || _lobbyBx >= size - _lobbySafePad || _lobbyBy <= _lobbySafePad || _lobbyBy >= size - _lobbySafePad;',
  `_bwG = Math.max(11, size * 0.031) + 1;
      const _dL = _lobbyBx, _dR = size - _lobbyBx, _dT = _lobbyBy, _dB = size - _lobbyBy;
      const _mD = Math.min(_dL, _dR, _dT, _dB);
      const _curWall = _mD <= _lobbySafePad ? (_mD === _dL ? 'L' : _mD === _dR ? 'R' : _mD === _dT ? 'T' : 'B') : null;
      const _lobbyAtWall = !!_curWall;`
);

code = code.replace(
  'if (_lobbyAtWall && !renderScannerCanvas._wasAtWall)',
  'if (_curWall && _curWall !== renderScannerCanvas._lastWall)'
);

code = code.replace(
  'renderScannerCanvas._wasAtWall = _lobbyAtWall;',
  'renderScannerCanvas._lastWall = _curWall;'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('_curWall'), '| _lobbyAtWall still:', code.includes('_wasAtWall'));

const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

const i = code.indexOf('getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {');
const end = code.indexOf('\n}', i) + 2;

console.log('Found at:', i, 'to:', end);

const newFn = `getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {\r\n  if (_serverBeamPos && _serverBeamPos.x !== undefined && !_serverBeamPos.roundId) {\r\n    const _elapsedDr = Math.min(0.5, Math.max(0, (Date.now() - _serverBeamPosLastUpdate) / 1000));\r\n    const _vxDr = _serverBeamPos.vx || 0;\r\n    const _vyDr = _serverBeamPos.vy || 0;\r\n    const _padDr = 0.031;\r\n    let _pxDr = _serverBeamPos.x + _vxDr * _elapsedDr;\r\n    let _pyDr = _serverBeamPos.y + _vyDr * _elapsedDr;\r\n    _pxDr = Math.max(_padDr, Math.min(1 - _padDr, _pxDr));\r\n    _pyDr = Math.max(_padDr, Math.min(1 - _padDr, _pyDr));\r\n    const _angleDr = _serverBeamPos.angle || 0;\r\n    return { x: _pxDr, y: _pyDr, vx: _vxDr, vy: _vyDr, angle: _angleDr, travelAngle: _angleDr, renderAngle: _angleDr };\r\n  }\r\n  return getScannerSharedLobbyBeamSampleAt(timestampMs, "scanner_shared_lobby_motion_v2", scannerRealtime.runtimeData);\r\n}`;

code = code.slice(0, i) + newFn + code.slice(end);
fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('_elapsedDr'));

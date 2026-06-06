const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

const i = code.indexOf('function getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {');
const end = code.indexOf('\n}', i) + 2;

const newFn = `function getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {\n  if (_serverBeamPos && _serverBeamPos.x !== undefined && !_serverBeamPos.roundId) {\n    const _dt = Math.min(0.5, Math.max(0, (Date.now() - _serverBeamPosLastUpdate) / 1000));\n    const _vx = _serverBeamPos.vx || 0;\n    const _vy = _serverBeamPos.vy || 0;\n    const _pad = 0.031;\n    const _px = Math.max(_pad, Math.min(1 - _pad, _serverBeamPos.x + _vx * _dt));\n    const _py = Math.max(_pad, Math.min(1 - _pad, _serverBeamPos.y + _vy * _dt));\n    return { x: _px, y: _py, vx: _vx, vy: _vy, angle: _serverBeamPos.angle || 0, travelAngle: _serverBeamPos.angle || 0, renderAngle: _serverBeamPos.angle || 0 };\n  }\n  return getScannerSharedLobbyBeamSampleAt(timestampMs, "scanner_shared_lobby_motion_v2", null);\n}`;

code = code.slice(0, i) + newFn + code.slice(end);
fs.writeFileSync(file, code, 'utf8');
console.log('Done:', !code.includes('_sx'));

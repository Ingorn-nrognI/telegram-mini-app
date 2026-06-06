const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

const i = code.indexOf('function getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {');
const end = code.indexOf('\n}', i) + 2;

const newFn = `function getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {
  if (_serverBeamPos && _serverBeamPos.x !== undefined && !_serverBeamPos.roundId) {
    const _dt = Math.min(0.5, Math.max(0, (Date.now() - _serverBeamPosLastUpdate) / 1000));
    const _vx = _serverBeamPos.vx || 0;
    const _vy = _serverBeamPos.vy || 0;
    const _pad = 0.031;
    let _px = Math.max(_pad, Math.min(1 - _pad, _serverBeamPos.x + _vx * _dt));
    let _py = Math.max(_pad, Math.min(1 - _pad, _serverBeamPos.y + _vy * _dt));
    if (!getScannerSharedLobbyBeamSample._sx) { getScannerSharedLobbyBeamSample._sx = _px; getScannerSharedLobbyBeamSample._sy = _py; }
    getScannerSharedLobbyBeamSample._sx += (_px - getScannerSharedLobbyBeamSample._sx) * 0.15;
    getScannerSharedLobbyBeamSample._sy += (_py - getScannerSharedLobbyBeamSample._sy) * 0.15;
    return { x: getScannerSharedLobbyBeamSample._sx, y: getScannerSharedLobbyBeamSample._sy, vx: _vx, vy: _vy, angle: _serverBeamPos.angle || 0, travelAngle: _serverBeamPos.angle || 0, renderAngle: _serverBeamPos.angle || 0 };
  }
  return getScannerSharedLobbyBeamSampleAt(timestampMs, "scanner_shared_lobby_motion_v2", null);
}`;

code = code.slice(0, i) + newFn + code.slice(end);
fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('_sx'));

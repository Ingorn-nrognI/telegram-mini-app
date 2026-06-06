const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

const i = code.indexOf('function getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {');
const end = code.indexOf('\n}', i) + 2;

const newFn = `function getScannerSharedLobbyBeamSample(timestampMs = getNetworkTime()) {\n  return getScannerSharedLobbyBeamSampleAt(timestampMs, "scanner_shared_lobby_motion_v2", scannerRealtime.runtimeData);\n}`;

code = code.slice(0, i) + newFn + code.slice(end);
fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('getScannerSharedLobbyBeamSampleAt(timestampMs') && !code.includes('_cx'));

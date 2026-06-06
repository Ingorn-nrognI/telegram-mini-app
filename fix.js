const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

// Добавляем лог beamRenderKey прямо в renderScannerCanvas
const old = '  const beamRenderKey = getScannerBeamRenderKey(roundStatus, roundData, hasGrid ? "grid" : "empty");';
const newStr = '  const beamRenderKey = getScannerBeamRenderKey(roundStatus, roundData, hasGrid ? "grid" : "empty");\n  if (renderScannerCanvas._lastKey !== beamRenderKey) { console.log("[key changed]", renderScannerCanvas._lastKey, "->", beamRenderKey); renderScannerCanvas._lastKey = beamRenderKey; }';

code = code.replace(old, newStr);
fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('key changed'));

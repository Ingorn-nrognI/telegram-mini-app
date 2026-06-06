const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

// Находим обработчик beam_position и beam:position и убираем из них обновление _serverTimeOffset
code = code.replace(
  `  _socket.on('beam_position', (data) => {\n    _serverBeamPos = data;\n    _serverBeamPosLastUpdate = Date.now();\n    if (!_serverBeamPosSmoothed) {\n      _serverBeamPosSmoothed = { ...data };\n    }\n    if (data?.timestamp) {\n      const newOffset = data.timestamp - Date.now();\n      if (Math.abs(newOffset - _serverTimeOffsetSmoothed) > 5000) {\n        _serverTimeOffset = newOffset;\n        _serverTimeOffsetSmoothed = newOffset;\n      } else {\n        _serverTimeOffsetSmoothed += (newOffset - _serverTimeOffsetSmoothed) * 0.5;\n        _serverTimeOffset = Math.round(_serverTimeOffsetSmoothed);\n      }\n    }\n  });`,
  `  _socket.on('beam_position', (data) => {\n    _serverBeamPos = data;\n    _serverBeamPosLastUpdate = Date.now();\n    if (!_serverBeamPosSmoothed) {\n      _serverBeamPosSmoothed = { ...data };\n    }\n  });`
);

code = code.replace(
  `  _socket.on('beam:position', (data) => { _serverBeamPos = data; });`,
  `  _socket.on('beam:position', (data) => { _serverBeamPos = data; _serverBeamPosLastUpdate = Date.now(); });`
);

fs.writeFileSync(file, code, 'utf8');
console.log('Done:', !code.includes('beam_position.*timestamp'));

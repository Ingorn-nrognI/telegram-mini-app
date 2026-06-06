const fs = require('fs');
const file = './index.html';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(
  'const _alpha = 1 - Math.exp(-16 / 80);',
  'const _alpha = 1 - Math.exp(-16 / 30);'
);

fs.writeFileSync(file, code, 'utf8');
console.log('Done:', code.includes('/ 30)'));

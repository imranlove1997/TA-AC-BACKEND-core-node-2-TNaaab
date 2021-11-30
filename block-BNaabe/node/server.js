var path = require('path');

console.log(__filename);
console.log(__dirname + 'app.js');
console.log('./index.html');

var joinPath = path.join(__dirname, 'index.html');

console.log(joinPath);
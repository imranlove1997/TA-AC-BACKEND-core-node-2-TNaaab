var http = require('http');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    fs.createReadStream('./readme.txt').pipe(res);
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
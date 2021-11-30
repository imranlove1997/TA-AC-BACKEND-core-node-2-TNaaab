var http = require('http');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {

    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })

    if(req.method === 'POST' && req.url === '/') {
        res.setHeader('Content-Type', 'application/json');
        res.end(store);
    }
}

server.listen(3000, () => {
    console.log('Server listening on port 3000');
})
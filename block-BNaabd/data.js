var http = require('http');
var qs = require('querystring');
var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var dataFormat = set.headers['content-type'];
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    });
    req.on('end', () => {
        if(req.method === 'POST' && dataFormat === 'application/json' && req.url === '/json') {
            res.end(store);
        }
        if(req.method === 'POST' && dataFormat === 'application/x-www-urlencoded') {
            var parsedData = qs.parse(store);
            res.end(JSON.stringify(parsedData));
        }
    })
}

server.listen(7000, () => {
    console.log('Server is listening on port 7000')
})
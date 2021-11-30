var http = require('http');
var qs = require('querystring');
var fs = require('fs');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        if(req.method === 'GET' && req.url === '/form') {
            res.setHeader('Content-Type', 'type/html');
            fs.createReadStream('./form.html').pipe(res);
        }
        if(req.method === 'POST' && req.url === '/form') {
            var parsedData = qs.parse(store);
            res.setHeader('Content-Type', 'text/html');
            res.write(`<h2>${parsedData.name}</h2>`);
            res.write(`<h2>${parsedData.email}</h2>`);
            res.write(`<h2>${parsedData.age}</h2>`);
        }
    })
}


server.listen(5678, () => {
    console.log('Server listening on port 5678');
})
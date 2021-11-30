var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var url = require('url');

var server = http.createServer(handleRequest);

function handleRequest(req, res) {
    var store = '';
    var userDir = __dirname + '/users/';
    req.on('data', (chunk) => {
        store += chunk;
    })
    req.on('end', () => {
        var parsedUrl = url.parse(req.url).pathname;
        if(parsedUrl === '/users') {
            if(req.method === 'POST' && req.headers['content-type'] === 'application/json') {
                var username = JSON.parse(store).username;
                fs.open(userDir + username + '.json', 'wx', (err, fd) => {
                    fs.writeFile(fd, store, (err) => {
                        fs.close(fd, (err) => {
                            res.end(`${username} Created`);
                        });
                    });
                });
            } else if(req.method === 'GET') {
                var query = qs.parse(url.parse(req.url).query);
                var file_path = path.join(__dirname, 'users', query.username + '.json');
                console.log(file_path);
                fs.readFile(file_path, (err, user) => {
                    res.setHeader('Content-Type', 'application/json');
                    res.end(user);
                });
            } else if(req.method === 'DELETE') {
                var query = qs.parse(url.parse(req.url).query);
                var file_path = path.join(__dirname, 'users', query.username + '.json');
                console.log(file_path);
                fs.unlink(file_path, (err, user) => {
                    res.end(`user ${query.username} is deleted`);
                });
            } else if(req.method === 'PUT') {
                var query = qs.parse(url.parse(req.url).query);
                var file_path = path.join(__dirname, 'users', query.username + '.json');
                console.log(file_path);
                fs.open(file_path, 'r+', (err, fd) => {
                    fs.ftruncate(fd, (err) => {
                        if (err) return console.log(err);
                        fs.close(fd, () => {
                            res.end(`${username} succesfully update`);
                        });
                    });
                });
            }
        } else {
            res.setHeader('Content-Type', 'text/html');
            res.statusCode = 404;
            res.end('404: Not Found')
        }
    });
}

server.listen(3000, () => {
    console.log('Server is listening on port 3000');
})
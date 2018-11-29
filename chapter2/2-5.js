const http = require('http');
const fs = require('fs');

var server = http.createServer(
    (request,response)=>{
        fs.readFile('./2-4.html','UTF-8',
        (error,data)=>{
            response.writeHead(200,{'COntent-Type': 'text/html'});
            response.write(data);
            response.end();
        });
    }
);

server.listen(3000);
console.log('Server start!');
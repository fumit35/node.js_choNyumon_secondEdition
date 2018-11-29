const http = require('http');
const fs = require('fs');

var server = http.createServer(getFromClient);

//ここまでメインプログラム

//createServerの処理
function getFromClient(req,res){
    request = req;
    response = res;
    fs.readFile('./2-3.html','UTF-8',
        (error,data)=>{
            response.writeHead(200,{'Content-Type':'text/html'});
            response.write(data);
            response.end();
        }
    );
}
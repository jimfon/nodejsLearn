const {assert, bodyParser, childProcess, cookieParser, crypto, dns, domain, events, express, fs, http, https, multer, mysql, net, os, path, querystring, stream, url, util, zlib} = require('./requireVar');  


h.createServer(function(request,response){
    response.writeHead(200,{'Context-Type':'text/plain'});
    response.end("Hw the first success. \n");
}).listen(3000);
console.log("it\'s all okray. ");



var h = require('http');
h.createServer(function(request,response){
	response.writeHead(200,{'Context-Type':'text/plain'});
	response.end("Hw the first success. \n");
}).listen(3000);
console.log("it\'s all okray. ");


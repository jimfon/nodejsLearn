const h2=require("http2");
const http=require('http');
const fs=require('fs');
const url=require('url');


/* const ser=h2.createSecureServer({key:fs.readFileSync('./ssl/localhost-privkey.pem'),
cert:fs.readFileSync('./ssl/localhost-cert.pem'),www.eerong.com/sw/npm/
}); */
const ser=new http.Server();
ser.listen(8443);



/* ser.on('stream',(stream,headers)=>{
	stream.respond
}); */
//function funcs(req,res)

ser.on('request',function(req,res){
	var filep=fs.readFileSync('./yylj.html');
	res.writeHead(200,{
		'content-type':'text/html',
	});
	res.write(filep);
	res.end();
});



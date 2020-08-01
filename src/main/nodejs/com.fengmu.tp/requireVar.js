const assert=require('assert');
const bodyParser=require('body-parser');
const childProcess=require('child_process');
const cookieParser=require('cookie-parser');
const crypto=require('crypto');
const dns=require('dns');
const domain=require('domain');
const events=require('events');
const express=require('express');
const fs=require('fs');
const http = require('http');
const https = require('https');
const mysql=require('mysql');
const multer=require('multer');
const net=require('net');
const os=require('os');
const path=require('path');
const querystring=require('querystring');
const stream=require('stream');
const url=require('url');
const util=require('util');
const zlib=require('zlib');

//to learn websites:
//http://www.git-scm.com.cn/938.html
//https://www.runoob.com/git/git-create-repository.html
//https://campus.163.com/app/net/position
//https://www.jianshu.com/p/3aa45532e179
//http://www.selenium.org.cn/
//module.exports=class RequireVar{let version='1.0.2';constructor(vv){this.vv=vv;} function getVersion(){return version;}};
const absPath="D:\\programmer\\web\\nodejs\\tp\\";  //  D:\programmer\web\nodejs\tp\package.json === absPath\package.json
module.exports={absPath,assert, bodyParser, childProcess, cookieParser, crypto, dns, domain, events, express, fs, http, https, multer, mysql, net, os, path, querystring, stream, url, util, zlib};
//const {assert, bodyParser, childProcess, cookieParser, crypto, dns, domain, events, express, fs, http, https, multer, mysql, net, os, path, querystring, stream, url, util, zlib} = require('./js/requireVar');  
//py3  patt=re.compile('const\\s+([\\w\\d_\\$]+).+\r?\n') ls=patt.findall(ss) ', '.join(sorted(ls))
//js  var sl=ss.match(/const\\s+([\\w\\d_\\$]+).+\r?\n/g); sl.join(', ');




//to get current work directory:
const CWD=process.cwd();
try{
	if (__cwd!==undefined){
		CWD=__cwd;
	}
}catch(ex){
//test cmd:
	//console.error(ex);
	//console.log('kk');
}
//to get eem:
class MyEmitter extends events.EventEmitter {}
const myEmitter=new MyEmitter();
var eem=new events.EventEmitter();



//to encrypt and decrypt by aes:
function padmsg(msg,code='utf8',size=16,pad=0,limit=-1){
	let emsg=Buffer.from(msg,code);
	let dlen=(16-emsg.length%16)%16;
	return Buffer.concat([emsg,Buffer.alloc(dlen,pad)]);
}
function myenc(msg,key,iv,pad,promise){
	//block-size:16, mode:cbc, pad:\0; 
	let emsg=padmsg(msg);
	let enc='';
	let ekey=padmsg(key,limit=16);
	const eiv=Buffer.from('0123456789abcdef','binary');  // iv='0123456789abcdef';
	let cp=crypto.createCipheriv('aes-128-cbc',ekey,eiv);
	cp.setAutoPadding(false);
	cp.on('readable',()=>{
		const data=cp.read();
		if (data){
			enc+=data.toString('base64');
		}
	});
	cp.on('end',()=>{
		console.log(enc);
		if (promise!==undefined){
			if (promise==='mydec'){
				//mydec(enc,'123'); //have to write in this way
			}
			promise(enc);
		}
	});
	cp.write(emsg);
	cp.end();
/*	cp.destroy();
/*	console.log(enc.length,enc);
 	enc=cp.update(emsg,'binary','base64');
	enc+=cp.final('base64'); */
	//return enc;  //!!!asyn
}
function mydec(enc,key,iv,pad){
	//block-size:16, mode:cbc, pad:\0; 
	let dec='';
	let ekey=padmsg(key,limit=16);
	const eiv=Buffer.from('0123456789abcdef','binary');  // iv='0123456789abcdef';
	let dcp=crypto.createDecipheriv('aes-128-cbc',ekey,eiv);
	dcp.setAutoPadding(false);
	dcp.on('readable',()=>{
		const data=dcp.read();
		if (data){
			dec+=data.toString('utf8');
		}
	});
	dcp.on('end',()=>{console.log(dec.replace(/\0*$/g,''));});
	dcp.write(enc,'base64');
	dcp.end();
	//return dec;  //npm install async
	return "look next line which is real dec. ";
}




if (require.main!=undefined && require.main.filename!=undefined && require.main.filename.endsWith('requireVar.js')){
//test cmd:
//myenc('sdf\t  js 文件 support.js 和 master.js。','123');
var waitPromise=new Promise(function(resolve,reject){
	myenc('sdf\t  js 文件 support.js 和 master.js。','123',0,0,resolve);  // 0 means use default
});
waitPromise.then(function(enctext){
	console.log("enc text: ",enctext,enctext.length);
	console.log("dec text: ",mydec(enctext,'123'))
}).catch((err)=>{
	console.log(err);
}); 







//test final cmd:
console.log("it\'s all okray. "+CWD);
}

/*
//to crawl list in https://www.torrent.org.cn/bd
function getSizes(){
	var aim=document.getElementsByClassName('btn btn-primary btn-sm bts');
var y=[];
for (var i=0;i<100;i++){var aimi=aim[i].textContent;if (aimi.indexOf('大小')>=0){y.push(aimi.substr(3)+aim[i+1].textContent);}}
return y;
}getSizes();

*/





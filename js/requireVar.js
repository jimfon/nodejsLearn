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

const CWD=process.cwd();
try{
	if (__cwd!==undefined){
		CWD=__cwd;
	}
}catch(ex){
	//console.error(ex);
	console.log('kk');
}
class MyEmitter extends events {}
const myEmitter=new MyEmitter();
var eem=new events.EventEmitter();


function padmsg(msg,code='utf8',size=16,pad=0,limit=-1){
	let emsg=Buffer.from(msg,code);
	let dlen=(16-emsg.length%16)%16;
	return Buffer.concat([emsg,Buffer.alloc(dlen,pad)]);
}
function myenc(msg,key,iv,pad){
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
	cp.on('end',()=>{console.log(enc);});
	cp.write(emsg);
	cp.end();
/*	console.log(enc.length,enc);
 	enc=cp.update(emsg,'binary','base64');
	enc+=cp.final('base64'); */
	return enc;  //!!!asyn
}
function mydec(enc,key,iv,pad){
	//block-size:16, mode:cbc, pad:\0; 
	let dec='';
	let ekey=padmsg(key,limit=16);
	const eiv=Buffer.from('0123456789abcdef','binary');  // iv='0123456789abcdef';
	let dcp=crypto.createDecipheriv('aes-128-cbc',ekey,eiv);
	//dcp.setAutoPadding(false);
	dcp.on('readable',()=>{
		const data=dcp.read();
		if (data){
			dec+=data.toString('utf8');
		}
	});
	dcp.on('end',()=>{console.log(dec);});
	dcp.write(enc,'base64');
	dcp.end();
	return dec;
}
var enctext=myenc('sdf\t  js 文件 support.js 和 master.js。','123');
console.log(enctext);
console.log(mydec(enctext,'123'));





console.log("it\'s all okray. "+CWD);










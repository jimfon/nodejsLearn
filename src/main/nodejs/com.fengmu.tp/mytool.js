'use strict';
const {absPath,assert, bodyParser, childProcess, cookieParser, crypto, dns, domain, events, express, fs, http, https, multer, mysql, net, os, path, querystring, stream, url, util, zlib} = require('./requireVar');


class MyTool{
    constructor() {}
    readstr(filename, blocksize = 512) {
        let fin = fs.createReadStream(filename);
        let outstream=fs.createWriteStream("o1.txt");
        let ctl = 2;
        fin.on('readable', () => {
            let buff = fin.read(blocksize);
            if (buff!==null){
            if (ctl<=2 && buff.length>=ctl){
                outstream.write(buff.slice(ctl));
                ctl=2+1;
            }else{
                outstream.write(buff);
            }
        }
        });
        
        fin.on('end', () => {
            outstream.end();
        });
        return 4;
    }

}
module.exports = MyTool;


if (require.main != undefined && require.main.filename != undefined && require.main.filename.endsWith('mytool.js')) {
    let readstr=new MyTool();
    readstr.readstr("D:\\~MSSETUP.T\\web\\nodejs\\tp\\.gitignore");
    console.log(path.join(__dirname,'../../'));
}


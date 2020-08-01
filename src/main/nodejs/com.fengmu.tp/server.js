const {absPath, assert, bodyParser, childProcess, cookieParser, crypto, dns, domain, events, express, fs, http, https, multer, mysql, net, os, path, querystring, stream, url, util, zlib} = require('./requireVar');



const options = {
    key: fs.readFileSync(path.join(absPath, "src", "main", "resources", "CA", "server.key")),
    cert: fs.readFileSync(path.join(absPath, "src", "main", "resources", "CA", "server.crt"))
};
const serverFile = https.createServer(options);
serverFile.listen(4436);


let webPath = path.join(absPath, "src", "main", "webapp", "static");
let filesavePath = path.join(absPath, "src", "main", "resources", "fileSave");
const enable = ["/tp/index.html",
    "/tp", "/tp/index.html", "/tp/index", "/tp/index.html",
    "/tp/fileup.html", "/tp/fileup", "/tp/tool1.html", "/tp/tool1",
    "/assets/", "/assets/", "/tp/doFileup", "/tp/doFileup",
    "/tp/fileajax","/tp/fileAjax"
];
function toEnable(urlpath) {
    if (urlpath !== null && urlpath.startsWith("/assets/")) {
        let resourcefile = path.join(webPath, ...(urlpath.split("/")));
        if (fs.existsSync(resourcefile)) {
            return urlpath;
        } else {
            return null;
        }
    }
    if (urlpath === null || !urlpath.startsWith("/tp")) {
        return null;
    }
    let place = enable.indexOf(urlpath);
    if (place < 0) {
        return enable[0];
    }
    place += place % 2;
    return enable[place];
}

serverFile.on('request', function (req, resp) {
//to parse request attributes: 
    let urlpath = url.parse(req.url).pathname;
    urlpath = toEnable(urlpath);
    if (urlpath === null) {
        resp.writeHead(404);
        resp.end();
        return;
    }
    let attrget = url.parse(req.url,true).query;
    let attrpost;
    let attrpostarr = [];
    req.on('data', (chunk) => {
        attrpostarr.push(chunk);  //for post file Buffer
        //attrpostarr+=chunk;  //for post normal form
    });
    req.on('end', () => {
        try {
            attrpost = Buffer.concat(attrpostarr).toString("utf8");
            attrpost = querystring.parse(attrpost);
        } catch (ex) {
            attrpost = Buffer.concat(attrpostarr);
        }

//to deal request: 
        //request for assets like fileup.js, fileup.css, fileup.jpg, fileup.mp4,,,: 
        if (urlpath.startsWith('/assets/')) {
            let resourcefile = path.join(webPath, ...(urlpath.split("/")));
            if (resourcefile.endsWith(".css")) {
        //      resp.removeHeader('content-type');
        //      resp.setHeader('content-type','text/css; charset=utf-8');
        //      console.log(resp.getHeader('content-type'));
                resp.writeHead(200, {
                    'Content-Type': 'text/css; charset=utf-8',
                    'server': 'apach'
                });
            } else if (resourcefile.endsWith(".js")) {
                resp.writeHead(200, {
                    'Content-Type': 'text/javascript; charset=utf-8',
                    'server': 'apach'
                });
            } else if (resourcefile.endsWith(".ico")) {
                resp.writeHead(200, {
                    'Content-Type': 'image/x-icon',
                    'server': 'apach'
                });
            }
            fs.createReadStream(resourcefile).pipe(resp);
            return;
        }
        resp.writeHead(200, {
            'content-type': 'text/html',
            'server': 'apach'
        });
        //request for static html page: 
        if (urlpath === enable[0]) {
            fs.createReadStream(path.join(webPath, "../", "index.html")).pipe(resp);
        } else if (urlpath === enable[6]) {
            fs.createReadStream(path.join(webPath, "tool", "fileup.html")).pipe(resp);
        } else if (urlpath === enable[8]) {
            fs.createReadStream(path.join(webPath, "tool", "yylj.html")).pipe(resp);
        }
        //request for file upload: 
        else if (urlpath === enable[12]) {
            let myfsave;
            if (attrpost instanceof Buffer) {
                myfsave = path.join(filesavePath, "requestFile01");
                let fwrite = fs.createWriteStream(myfsave);
                fwrite.write(attrpost);
                fwrite.end();
                resp.end(`success, save as ${myfsave} <br><br> but you may cannot read this file correctly`);
            } else {
                myfsave = path.join(filesavePath, "requestText02");
                let fwrite = fs.createWriteStream(myfsave);
                fwrite.write(Buffer.concat(attrpostarr));
                fwrite.end();
                resp.end(`failure, save as ${myfsave} <br>`);
            }
        }
        //request for ajax: 
        else if (urlpath === enable[14]){
            let btoausn=decodeURI(attrget.usn)+' is a good name. ';
            resp.write(btoausn);
            resp.end();
        }
    });

});



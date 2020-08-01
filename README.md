tp
============
a small original basic https website, using node.js. 
<br>

File structure
------------

#### tp
>src/ <br>
>>main/ <br>
>>>nodejs/ <br>
>>>>com/fengmu/tp/(empty) <br>
>>>>com.fengmu.tp/ <br>
>>>>>requireVar.js <br>
>>>>>server.js <br>
>>>>>(3 unused files) <br>
>>>resources/ <br>
>>>>CA/ <br>
>>>>>(ssl key files for https) <br>
>>>>fileSave/ <br>
>>>>>(temp files) <br>
>>>>mysql/(empty) <br>
>>>webapp/(redirect to [down 15th line](#webapp)) <br>
>>test/ <br>
>>>nodejs/ <br>
>>>>com/fengmu/tp/(empty) <br>
>>>>com.fengmu.tp/ <br>
>>>>>test.js <br>
>>>selenium/ <br>
>target/(empty) <br>
>.gitignore <br>
>README.md <br>
>package.json <br>
>package-lock.json <br>

##### webapp
>META-INF <br>
>>context.xml <br>
>WEB-INF <br>
>>web.xml <br>
>static <br>
>>assets <br>
>>>css <br>
>>>>allPage.css <br>
>>>etc <br>
>>>js <br>
>>>>fileup.js <br>
>>>>jquery-3.3.1.js <br>
>>>multimedia <br>
>>>picture <br>
>>>>jd.ico <br>
>>>>(other 3 pictures) <br>
>>>text <br>
>>microchat/(empty) <br>
>>tool <br>
>>>fileup.html <br>
>>>remove.html <br>
>>>yylj.html <br>
>index.html

#### Introduction
only one used page: https://127.0.0.1:4436/tp/fileup <br>
all servers at one nodejs: server.js  <br>
allPage.css and fileup.js support fileup.html;  <br>
requireVar.js, server.key, server.crt support server.js; <br>
all other files are useless!  <br>
This node.js project structure references maven, you may find a folder named "nbproject" because the IDE to edit this project is netbeans8.2;  <br>

#### License:  tp  v1.0.2  since 2020/07/27  by zorrow2017  in cn
<br><br>


Usage
------------

#### to run: 
download all "dependencies" in package.json (but in v1.0.2, just this version, you need not download any module \*^__^\*) <br>
change `absPath` in file requireVar.js(line: 31) <br>
run server.js, you may cd and enter "node server.js" in Windows cmd<br>
go to https://127.0.0.1:4436/tp/fileup in your browser <br>

#### to develop: 
folder "target" and "src/test" just inherit from maven; <br>
file "package.json" "package-lock.json" ".gitignore" "README.md" inherit from git; <br>
node.js file are saved at "src/main/nodejs/com.fengmu.tp/": <br>
>requireVar.js defines modules to import(require), likes stdfix.h in c/c++ <br>
>mytool.js defines basic functions, objects, variables,,, <br>
>server.js get all httpRequest, deal(control), and send httpResponse; <br>
"resources" save many different files <br>
>CA, generated ssl files. read server.wincmd to learn, search Internet to learn more; <br>
static web resources are saved at "src/main/webapp/static/": <br>
>"../index.html" home page <br>
>"tool" many useful small tools writed by pure html5+css3+js(not node.js) <br>
>>"fileup.html" to upload and download file <br>
>>"remove.html" a game, click number block near 0 block to let the numbers look ordered in some way <br>
>>"yylj.html" waiting for your efforts <br>
>"microchat" waiting for your efforts <br>
>"assets" save css, js, text, image, mp3, mp4, etc files which will be used by *.html <br>
<br>


Author story
------------

I'm learning git, nodejs, npm, maven, and will learn sass, less, veu, rect to improve myself and hunt for a good job. <br>
Study and writing and devoting can be the most precious pleasure in our life. <br>



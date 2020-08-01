/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

const welt = "tp";

function init() {
    var say = 'to test if js can be load: fsdsdfdrrfr';
    console.log(say);
}
function isNotAscii(textElem) {
    var usn = textElem.value;
    var showpar = document.getElementById('file_up');
    var showusn = showpar.getElementsByTagName('label')[0];
    var isna = false;
    if (usn === null || usn.length === 0) {
        return;
    }
    for (var i = 0; i < usn.length; i++) {
        if (usn.charCodeAt(i) >= 128) {
            isna = true;
            break;
        }
    }
    showusn.innerHTML = isna;
    var serverdata = '';
//use jquery:
//        $.ajax.get({
//        url: '/tp/fileAjax',
//        type: 'GET',
//        dataType: "text",
//        data: {
//            "usn": usn,
//            "number": 250
//        },
//        success: (data)=>{
//            serverdata=data;
//        },
//        error: (ex)=>{
//            console.log(ex);
//        }
//    });
    var xhr = XMLHttpRequest();
    xhr.open('GET', `/tp/fileAjax?usn=${encodeURI(usn)}&&number=250`, true); //atob(usn) can only encode ascii.
    //xhr.setRequestHeader('');
    xhr.send();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            serverdata = xhr.responseText;
            serverdata = 'username ' + serverdata;
            if (isna) {
                showusn.innerHTML = serverdata + "<br>you are using Unicode. <br>";
            } else {
                showusn.innerHTML = serverdata + "<br>This is a completely English name. <br>";
            }
        }
    };

}


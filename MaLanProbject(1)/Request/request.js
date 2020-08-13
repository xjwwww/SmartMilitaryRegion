// 请求方式、请求接口、请求参数、异步或同步、回调函数
function AJAX(method, url, data, flag, callback) {
    xmlHttp = GetXmlHttpObject();
    if (xmlHttp == null) {
        alert('您的浏览器不支持AJAX！');
        return;
    }

    // callback(data)
    let xhr = null;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        //兼容IE浏览器
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    //防止请求方式输入小写
    method = method.toUpperCase();
    if (method == "GET") {
        //初始化
        if (data == '') {
            //坐统一的接口管理
            let NewUrl = "http://192.168.1.42:8080/" + url
            xhr.open(method, NewUrl, flag);

        } else {
            // data 传过来必须是字符串
            xhr.open(method, url + "?" + data, flag);
        }

        //发送请求
        xhr.send();

    } else if (method == "POST") {
        let NewUrl = "http://192.168.1.42:8080/" + url
        xhr.open(method, NewUrl, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    //判断数据是否回来,请求是否成功
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            // 解码为 json 格式
            var backData = JSON.parse(xhr.response);
            // 回调函数，返回数据
            callback(backData, xhr.status);
        } else {
            callback('');
        }
    }
}


function GetXmlHttpObject() {
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari 
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5 
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return xmlhttp;
}
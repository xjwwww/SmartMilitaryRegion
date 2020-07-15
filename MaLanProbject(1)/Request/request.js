// 请求方式、请求接口、请求参数、异步或同步、回调函数
function AJAX(method, url, data, flag, callback){
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
        if(data == ''){
            xhr.open(method, url, flag);
            
        }else{
            // data 传过来必须是字符串
            xhr.open(method, url + "?"+ data, flag);
        }

        //发送请求
        xhr.send();

    } else if (method == "POST") {
        xhr.open(method, url, flag);
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }
    //判断数据是否回来,请求是否成功
    xhr.onreadystatechange = function () {
        if(xhr.readyState === 4 && xhr.status === 200) {
            // 解码为 json 格式
            var backData = JSON.parse(xhr.responseText);
            // 回调函数，返回数据
            callback(backData);

        }else{
            callback('');
        }
    }
}

// function AJAX(method, url, data){
//     $.ajax({
//         url: url,
//         type: method,
//         data: data,
//         dataType: 'json',
//         // async: flag, // 异步或同步
//         success: function(res){
//             console.log(res)
//         },
//         error: function(err){
//             console.log(err)
//         }
//     })
// }

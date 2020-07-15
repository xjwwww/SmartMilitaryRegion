var management = document.getElementById('management'); // 管理
var notice = document.getElementById('notice'); // 通知
var environmentSystem = document.getElementById('environmentSystem'); // 环境监控 

var mainLeft = document.getElementById('mainLeft'); // 左边 ul 列表

let shutdown = document.getElementById('shutdown'); // 退出登录

window.onload = function() {

    // AJAX() 来自 request.js; 第二个参数是后端接口, 第三个参数是请求参数
    AJAX('GET', '', '', true, function(res) {
        console.log(res);
        // res 因为不知道后端返回的格式是什么，所以请根据实际的数据

        // for(let i = 0; i < 【请根据实际的返回数据长度】; i++){
        // 创建 li 元素，并把 li 元素插入到 ul 中
        //     var li = document.createElement('li');
        //     li.innerHTML = '【请根据实际的返回数据内容】';
        //     mainLeft.appendChild(li);
        // }

    });
}
management.onclick = function() {
    alert('没有设计图, 还没有做')
}
notice.onclick = function() {
    alert('没有设计图, 还没有做')
}

// 默认选中环境监控
environmentSystem.style.borderBottom = '0.5vh solid #FFF';

// 默认选中第一个温湿度?
mainLeft.children[0].style.background = 'rgba(255, 255, 255, 0.1)';

for (let i = 0; i < mainLeft.children.length; i++) {
    mainLeft.children[i].onclick = function() {

        for (let i = 0; i < mainLeft.children.length; i++) {
            mainLeft.children[i].style.background = '';
        }
        this.style.background = 'rgba(255, 255, 255, 0.1)';
    };
}

// 退出登录时，提示是否要退出
shutdown.addEventListener('click', function() {
    // console.log(11)

    var boo = confirm("您确定要退出登录吗");
    if (boo == true) {
        window.location.href = '../Login/login.html'
    } else {
        return false
    }

});
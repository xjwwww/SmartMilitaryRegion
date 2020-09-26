var username = document.getElementById('username'); // 账号
var password = document.getElementById('password'); // 密码
var loginBtn = document.getElementById('loginBtn'); // 登录按钮

var forget = document.getElementById('forget'); // 忘记密码/注册
var memorization = document.getElementById('memorization'); // 记住密码

// 记住密码选择框
var checkbox = document.getElementById('checkbox');

// 账号、密码错误时显示
var fonts = document.getElementsByClassName('font');

// 忘记密码/注册 没有设计图，还没有做
forget.onclick = function() {
    alert('没有设计图，还没有做!')
}

// 输入框获取焦点隐藏 账号或密码不能为空红色字体
username.onchange = function() {
    fonts[0].style.display = 'none';
};
password.onchange = function() {
    fonts[1].style.display = 'none';
};

// loginBtn.addEventListener("click", function() {

// })

// 登录
loginBtn.addEventListener('click', function() {
    let Data = {
        password: password.value,
        username: username.value
    }
    if (Data.username == '') {
        fonts[0].innerHTML = '账号或密码不能为空';
        fonts[0].style.display = 'block';

    } else if (Data.password == '') {
        fonts[1].innerHTML = '账号或密码不能为空'
        fonts[1].style.display = 'block';

    } else {
        AJAX('POST', 'software/login?password=' + Data.password + '&username=' + Data.username, "", true, function(res, status) {
            if (status !== 200 && typeof(status) !== "undefined") {
                alert("网络请求错误！请重试！")
            } else if (status == 200 && res.zt == "ok") {
                //登录成功跳转到主页
                window.location.href = './HomePage/homepage.html'
                console.log(res);

            } else if (status == 200 && res.zt == "error") {
                for (let i = 0; i < fonts.length; i++) {
                    fonts[i].innerHTML = '账号或密码错误';
                    fonts[i].style.display = 'block';
                }
            }
        })
    }
});

// 获取用户cookie
window.onload = function() {
    var UserName = document.cookie.match(
        new RegExp("(^| )" + "UserName" + "=([^;]*)(;|$)")
    );
    var Password = document.cookie.match(
        new RegExp("(^| )" + "Password" + "=([^;]*)(;|$)")
    );
    if (UserName === null || Password === null) {
        checkbox.checked = false
    } else {
        checkbox.checked = true
        username.value = UserName[2]
        password.value = Password[2]
    }
}

// 忘记密码?注册
// forget.onclick = function(){
//     window.location.href = ''
// }

// memorization.addEventListener('click', function(){
//     console.log(checkbox.checked)

//     checkbox.checked = !checkbox.checked

// })

// 记住密码
checkbox.onclick = function() {
    var boo = this.checked ? true : false;
    if (boo) {
        var Days = 7;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000); //时分秒，cookie过期时间
        document.cookie =
            "UserName" + "=" + escape(username.value) + ";expires=" + exp.toGMTString(); //"Name"是键,escape(是值)
        document.cookie =
            "Password" + "=" + escape(password.value) + ";expires=" + exp.toGMTString();
    } else {
        // 原生js是无法直接删除cookie的，当cookie的时间过期后浏览器会自动删除cookie。
        var cookieKeys = document.cookie.match(/[^ =;]+(?=\=)/g); // 获取cookie
        var date = new Date(); // 获取当前时间
        date.setTime(date.getTime() - 10000); // 改变当前时间
        if (cookieKeys) {
            // 循环设置cookie过期时间
            for (var i = 0; i < cookieKeys.length; i++) {
                document.cookie =
                    cookieKeys[i] + "=0; expires=" + date.toGMTString() + "; path=/";
            }
        }
    }
}

//页面还在加载的过程中
// document.onreadystatechange = function() {
//     if (document.readyState == "complete") {
//         alert(1)
//         document.getElementById("page").style.display = "none"
//     }
// }
var username = document.getElementById('username'); // 账号
var password = document.getElementById('password'); // 密码
// var loginBtn = document.getElementById('loginBtn'); // 登录按钮

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
// username.onfocus = function(){
//     fonts[0].style.display = 'none';
// };
// password.onfocus = function(){
//     fonts[1].style.display = 'none';
// };

loginBtn.addEventListener('click', function() {
    window.location.href = '../HomePage/homepage.html'
    console.log(1)
})

// 登录
// loginBtn.addEventListener('click', function(){
//     this.style.background = '#556e55';

// let Data = 'username='+username.value + '&password='+ data.password;

//     if(username.value == ''){     
//         fonts[0].innerHTML = '账号或密码不能为空';
//         fonts[0].style.display = 'block';

//     }else if(password.value == ''){
//         fonts[1].innerHTML = '账号或密码不能为空'
//         fonts[1].style.display = 'block';

//     }else{
//         // console.log(username.value, password.value)

//         // 登录 ajax, 第二个参数是请求接口
//         AJAX('POST', '', Data, true, function(res){

//             if(res.zt == 'error'){
//                 for(let i = 0; i < fonts.length; i++){
//                     fonts[i].innerHTML = '账号或密码错误';
//                     fonts[i].style.display = 'block';
//                 }

//             }else if(res.zt == 'ok'){
//                 var result = res
//                 console.log(result);

//                 // 登录成功跳转到主页
//                 window.location.href = '../HomePage/homepage.html'     
//             }

//         })
//     }
// });


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
    // var boo = this.checked ? true : false;
    // if(boo){
    //     console.log('真')

    // }else{
    //     console.log('假')        
    // }
    alert('记住密码功能还没有做')
}
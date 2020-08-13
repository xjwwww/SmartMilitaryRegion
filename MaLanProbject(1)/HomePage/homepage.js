let securityBox = document.getElementById('securityBox'); // 安防系统
let ringBox = document.getElementById('ringBox'); // 动环系统

let headeContent = document.getElementById('headeContent');
let homepage = document.getElementById('homepage'); // 主页
let management = document.getElementById('management'); // 管理
let notice = document.getElementById('notice'); // 通知

let shutdown = document.getElementById('shutdown'); // 退出登录

let Obj = {
    // 鼠标点击时bottom的状态
    bottomState: function() {
        for (let i = 0; i < headeContent.children.length; i++) {
            headeContent.children[i].style.borderBottom = '';
        }
        this.style.borderBottom = '0.6vh solid #FFF';

        // if(this.id == 'management'){
        //     document.getElementsByTagName('body')[0].style.backgroundImage = 'url("")';
        //     document.getElementById('main').style.display = 'none';
        // }
    },

    // 选择系统
    selectSystem: function() {

        // 请根据后端的路径
        if (this.id == 'securityBox') {
            window.location.href = '../SecuritySystem/securitySystem.html'
        } else if (this.id == 'ringBox') {
            window.location.href = '../RingSystem/ringSystem.html'
        }

    }
}

// 默认 body 背景
// document.getElementsByTagName('body')[0].style.backgroundImage = "url('./imgs/homepageBg.png')";

// 默认主页选中
homepage.style.borderBottom = '0.6vh solid #FFF';

// 鼠标点击时bottom的hover状态
homepage.addEventListener('click', Obj.bottomState);
management.addEventListener('click', Obj.bottomState);
notice.addEventListener('click', Obj.bottomState);

// 管理---没有设计图，还没有做
management.onclick = function() {
    alert('管理---没有设计图，还没有做')
}

// 通知---没有设计图，还没有做
notice.onclick = function() {
    alert('管理---没有设计图，还没有做')
}

securityBox.addEventListener('click', Obj.selectSystem);
ringBox.addEventListener('click', Obj.selectSystem);

// 退出登录时，提示是否要退出
shutdown.addEventListener('click', function() {
    // console.log(11)

    var boo = confirm("您确定要退出登录吗");
    if (boo == true) {
        window.location.href = '../login.html'
    } else {
        return false
    }

});
var management = document.getElementById('management'); // 管理
var notice = document.getElementById('notice'); // 通知
var environmentSystem = document.getElementById('environmentSystem'); // 环境监控 

var mainLeft = document.getElementById('mainLeft'); // 左边 ul 列表

let shutdown = document.getElementById('shutdown'); // 退出登录

//切换环境系统
let Environmental = {
    // 左边切换按钮
    NoWaterleakage: document.getElementById("NoWaterleakage"),
    PrecisionAir: document.getElementById("PrecisionAir"),
    ControlTemp: document.getElementById("ControlTemp"),
    SmokeControl: document.getElementById("SmokeControl"),

    // 右边内容ID
    waterLeakage: document.getElementById("water-leakage"),
    rightAirConditioner: document.getElementById("right-AirConditioner"),
    TempAndHumi: document.getElementById("TempAndHumi"),
    SmokeSensation: document.getElementById("SmokeSensation"),
    Ups: document.getElementById("right-ups"),
    ElectricityMeter: document.getElementById('ElectricityMeter')

}

//隐藏所有的兄弟元素
function HiddenBrother(id) {
    $(id).siblings().map(function(index, sy) {
        sy.style.display = "none"
    })
}

window.onload = function() {
    TempAndHum()
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
mainLeft.children[1].style.background = 'rgba(255, 255, 255, 0.1)';

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
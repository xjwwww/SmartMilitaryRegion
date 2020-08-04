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
    SmokeSensation: document.getElementById("SmokeSensation")
}

//隐藏所有的兄弟元素
function HiddenBrother(id) {
    $(id).siblings().map(function(index, sy) {
        sy.style.display = "none"
    })
}

let FunObj = {
    EnvironSwitch: function() {
        switch (this.id) {
            case "NoWaterleakage":
                // 定时器， 根据后端数据实时更新
                // intervalId = setInterval(function() {
                //     console.log("打开定时器！！")
                //     Waterleakage()
                // }, 5000);
                Waterleakage()
                HiddenBrother(Environmental.waterLeakage)
                break;
            case "PrecisionAir":
                precisionAir()
                HiddenBrother(Environmental.rightAirConditioner)
                break;
            case "SmokeControl":
                SmokeControl()
                HiddenBrother(Environmental.SmokeSensation)
                break;
            default:
                // 停止控制器
                // clearInterval(intervalId)
                TempAndHum()
                HiddenBrother(Environmental.TempAndHumi)
        };
    }
}

//非定位漏水和烟感根据内容显示
var Change = function(id, status, number) {
    var ChangeId = document.getElementById(id).children[number].children[0].children[2].children[1]
    if (status == 0) {
        ChangeId.innerHTML = "正常"
        ChangeId.style.backgroundColor = 'rgb(68,165,148)'

    } else if (status == 2) {
        ChangeId.innerHTML = "报警"
        ChangeId.style.backgroundColor = 'rgb(165,68,68)'
    } else {
        ChangeId.innerHTML = "关闭"
        ChangeId.style.backgroundColor = 'rgb(179,179,179)'
    }
}

//环境系统-切换内容事件
Environmental.NoWaterleakage.addEventListener("click", FunObj.EnvironSwitch)
Environmental.PrecisionAir.addEventListener("click", FunObj.EnvironSwitch)
Environmental.ControlTemp.addEventListener("click", FunObj.EnvironSwitch)
Environmental.SmokeControl.addEventListener("click", FunObj.EnvironSwitch)


window.onload = function() {
    TempAndHum()
        // AJAX() 来自 request.js; 第二个参数是后端接口, 第三个参数是请求参数
        // AJAX('GET', '', '', true, function(res) {
        //     console.log(res);
        // res 因为不知道后端返回的格式是什么，所以请根据实际的数据
        // for(let i = 0; i < 【请根据实际的返回数据长度】; i++){
        // 创建 li 元素，并把 li 元素插入到 ul 中
        //     var li = document.createElement('li');
        //     li.innerHTML = '【请根据实际的返回数据内容】';
        //     mainLeft.appendChild(li);
        // }
        // });
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
        window.location.href = '../login.html'
    } else {
        return false
    }

});
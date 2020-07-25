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

    // 右边内容ID
    waterLeakage: document.getElementById("water-leakage"),
    rightAirConditioner: document.getElementById("right-AirConditioner"),
    TempAndHumi: document.getElementById("TempAndHumi")
}

// //非定位漏水的状态

//模拟后端的数据
var data = ["正常", "报警", "正常", "报警", "正常", "正常"]
var datas = ["正常", "报警", "正常", "报警", "报警", "报警", "报警", "正常", "正常"]

let FunObj = {
    EnvironSwitch: function() {
        switch (this.id) {
            case "NoWaterleakage":
                Environmental.waterLeakage.style.display = "block";
                Environmental.TempAndHumi.style.display = "none";
                Environmental.rightAirConditioner.style.display = "none";
                Change("water-leakage", 1);
                break;
            case "PrecisionAir":
                Environmental.rightAirConditioner.style.display = "block";
                Environmental.TempAndHumi.style.display = "none";
                Environmental.waterLeakage.style.display = "none";
                for (var i = 0; i < datas.length; i++) {
                    AlarmStatus("AlarmStatus", datas[i], i)
                };
                for (var s = 0; s < data.length; s++) {
                    AirChange("AirState", data[s], s)
                };
                document.getElementById("right-AirConditioner").children[1].children[0].innerHTML = "2号精密空调"
                document.getElementById("right-temperature").innerHTML = "温度:30℃"
                document.getElementById("right-humidity").innerHTML = "湿度:70%"
                break;
            default:
                Environmental.TempAndHumi.style.display = "block";
                Environmental.waterLeakage.style.display = "none";
                Environmental.rightAirConditioner.style.display = "none"
                document.getElementById("TempAndHumi-temperature").children[1].innerHTML = "30℃"
                document.getElementById("TempAndHumi-humidity").children[1].innerHTML = "90%"
                AJAX('GET', "http://192.168.1.42:8080/software/crac/getCracManageAll", '', true, function(res) {
                    console.log(res);
                })
        };
    }
}

//精密空调
var AirChange = function(id, content, Serial) {
    if (Serial < 3 && content == "正常") {
        document.getElementById(id).children[1].children[Serial].style.color = 'rgb(68,165,148)'
        document.getElementById(id).children[1].children[Serial].innerHTML = content
    } else if (Serial < 3 && content == "报警") {
        document.getElementById(id).children[1].children[Serial].innerHTML = content
        document.getElementById(id).children[1].children[Serial].style.color = 'rgb(165,68,68)'
    } else if (Serial >= 3 && content == "正常") {
        document.getElementById(id).children[3].children[Serial - 3].style.color = 'rgb(68,165,148)'
        document.getElementById(id).children[3].children[Serial - 3].innerHTML = content
    } else if (Serial >= 3 && content == "报警") {
        document.getElementById(id).children[3].children[Serial - 3].style.color = 'rgb(165,68,68)'
        document.getElementById(id).children[3].children[Serial - 3].innerHTML = content
    }
}

//报警状态
var AlarmStatus = function(id, content, Serial) {
    if (Serial < 3 && content == "正常") {
        document.getElementById(id).children[1].children[Serial].innerHTML = content
    } else if (Serial < 3 && content == "报警") {
        document.getElementById(id).children[1].children[Serial].innerHTML = content
        document.getElementById(id).children[1].children[Serial].style.backgroundColor = 'rgb(165,68,68)'
    } else if (Serial >= 3 && Serial < 6 && content == "正常") {
        document.getElementById(id).children[3].children[Serial - 3].innerHTML = content
    } else if (Serial >= 3 && Serial < 6 && content == "报警") {
        document.getElementById(id).children[3].children[Serial - 3].innerHTML = content
        document.getElementById(id).children[3].children[Serial - 3].style.backgroundColor = 'rgb(165,68,68)'
    } else if (Serial >= 6 && content == "正常") {
        document.getElementById(id).children[5].children[Serial - 6].innerHTML = content
    } else if (Serial >= 6 && content == "报警") {
        document.getElementById(id).children[5].children[Serial - 6].innerHTML = content
        document.getElementById(id).children[5].children[Serial - 6].style.backgroundColor = 'rgb(165,68,68)'
    }
}

//非定位漏水根据内容显示
var Change = function(id, content) {
    document.getElementById(id).children[3].children[1].innerHTML = content
    if (content == 0) {
        document.getElementById(id).children[3].children[1].innerHTML = "正常"
        document.getElementById(id).children[3].children[1].style.backgroundColor = 'rgb(68,165,148)'
        document.getElementById(id).children[3].children[0].innerHTML = 'DI0'
        document.getElementById(id).children[1].children[0].innerHTML = '非定位漏水'

    } else {
        document.getElementById(id).children[3].children[1].innerHTML = "报警"
        document.getElementById(id).children[3].children[1].style.backgroundColor = 'rgb(165,68,68)'
        document.getElementById(id).children[3].children[0].innerHTML = 'DI1'
        document.getElementById(id).children[1].children[0].innerHTML = '烟感'
    }
}

//环境系统-切换内容事件
Environmental.NoWaterleakage.addEventListener("click", FunObj.EnvironSwitch)
Environmental.PrecisionAir.addEventListener("click", FunObj.EnvironSwitch)
Environmental.ControlTemp.addEventListener("click", FunObj.EnvironSwitch)

// document.getElementById('NoWaterleakage').addEventListener('click', function() {
//     console.log(1)
// });

window.onload = function() {
    document.getElementById("TempAndHumi-temperature").children[1].innerHTML = "30℃"
    document.getElementById("TempAndHumi-humidity").children[1].innerHTML = "90%"
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
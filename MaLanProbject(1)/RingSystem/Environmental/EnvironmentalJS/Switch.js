//切换事件
Switch()

//切换左边导航栏
function Switch() {
    let mainLeft = document.getElementById("mainLeft")
    let li = mainLeft.getElementsByTagName("li")
    var Newindex = 0
    for (let i = 0; i < li.length; i++) {
        let liChild = li[i];
        liChild.index = i;
        liChild.onclick = function() {
            for (let i = 0; i < li.length; i++) {
                li[i].style.background = ''
            }
            this.style.background = 'rgba(255, 255, 255, 0.1)'
            Newindex = this.index
            RightSwitch(Newindex)
        }
    }
    //列表向下事件
    document.getElementById('down').addEventListener('click', function() {
            if (Newindex !== li.length - 1) {
                RightSwitch(Newindex + 1)
                for (let i = 0; i < li.length; i++) {
                    li[i].style.background = ''
                }
                li[Newindex + 1].style.background = 'rgba(255, 255, 255, 0.1)'
                Newindex = Newindex + 1
            } else {
                RightSwitch(0)
                for (let i = 0; i < li.length; i++) {
                    li[i].style.background = ''
                }
                li[0].style.background = 'rgba(255, 255, 255, 0.1)'
                Newindex = 0
            }
        })
        //列表向上事件
    document.getElementById("up").addEventListener("click", function() {
        if (Newindex !== 0) {
            RightSwitch(Newindex - 1)
            for (let i = 0; i < li.length; i++) {
                li[i].style.background = ''
            }
            li[Newindex - 1].style.background = 'rgba(255, 255, 255, 0.1)'
            Newindex = Newindex - 1
        } else {
            RightSwitch(li.length - 1)
            for (let i = 0; i < li.length; i++) {
                li[i].style.background = ''
            }
            li[li.length - 1].style.background = 'rgba(255, 255, 255, 0.1)'
            Newindex = li.length - 1
        }
    })
}

//根据index显示左边列表
function RightSwitch(index) {
    switch (index) {
        case 0:
            // 停止控制器
            // clearInterval(intervalId)
            TempAndHum()
            HiddenBrother(Environmental.TempAndHumi)
            break;
        case 1:
            // 定时器， 根据后端数据实时更新
            // intervalId = setInterval(function() {
            //     console.log("打开定时器！！")
            //     Waterleakage()
            // }, 5000);
            Waterleakage()
            HiddenBrother(Environmental.waterLeakage)
            break;
        case 2:
            precisionAir()
            HiddenBrother(Environmental.rightAirConditioner)
            break;
        case 3:
            ExhaustFan()
            HiddenBrother(Environmental.ExhaustFan)
            break;
        case 4:
            ups()
            HiddenBrother(Environmental.Ups)
            break;
        case 5:
            SmokeControl()
            HiddenBrother(Environmental.SmokeSensation)
            break;
        case 6:
            ElectricityMeter()
            HiddenBrother(Environmental.ElectricityMeter)
            break;
        case 7:
            FreshAirFanFun()
            HiddenBrother(Environmental.FreshAirFan)
            break;
        case 8:
            PowerSupplyFun()
            HiddenBrother(Environmental.PowerSupply)
            break;
        default:
            alert("暂无设计图" + index)
    };
}
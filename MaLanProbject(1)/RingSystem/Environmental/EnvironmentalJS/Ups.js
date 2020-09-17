function ups() {
    Environmental.Ups.style.display = "block"
    GetUpsState()
    UpsChange()
}

function UpsChange() {
    let WaterChange = document.getElementById("right-ups").children[0]
    WaterChange.children[0].addEventListener("click", function() {
            document.getElementById("UpsData").style.display = "block"
            document.getElementById("UpsWarning").style.display = "none"
            WaterChange.children[1].style.color = "#888"
            WaterChange.children[0].style.color = "#FFFFFF"
            GetUpsState()
        })
        //切换到报警数据页面的事件
    WaterChange.children[1].addEventListener("click", function() {
        document.getElementById("UpsWarning").style.display = "block"
        document.getElementById("UpsData").style.display = "none"
        WaterChange.children[1].style.color = "#FFFFFF"
        WaterChange.children[0].style.color = "#888"
        UpsGulf()
        UpsGulfs()
        UpsConeten()
    })
}


//报警数据Fun
function UpsGulf() {
    let Guifdata = ["所有设备", '123123', 'asdasdasd', '骄傲斯岛上的']
    for (let i = 0; i < Guifdata.length; i++) {
        console.log(i)
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("UpsSecond").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("UpsSecond").addEventListener('change', function() {
        let index = document.getElementById("UpsSecond").selectedIndex
        let GuifContent = document.getElementById("UpsSecond").options[index].text
    })
}

function UpsGulfs() {
    let Guifdata = ["所有设备", '123123', 'asdasdasd', '骄傲斯岛上的asdasdsa']
    for (let i = 0; i < Guifdata.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("UpsThird").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("UpsThird").addEventListener('change', function() {
        let index = document.getElementById("UpsThird").selectedIndex
        let GuifContent = document.getElementById("UpsThird").options[index].text
    })
}

//添加内容
function UpsConeten() {
    let WaterConetenData = [
        { a: '1', b: '1号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '2', b: '2号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '3', b: '3号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '5', b: '4号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '6', b: '4号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '7', b: '4号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '8', b: '4号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '9', b: '4号监控机房', c: '设备名称', e: '发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '10', b: '4号监控机房', c: '设备名称', e: '发生报警发123123123123123123123123asdasdasdas', f: '2017-08-29 09:46' },
    ]
    let htmlAlert = "";
    for (let i = 0; i < WaterConetenData.length; i++) {
        htmlAlert +=
            "<div class='UpsWarningContent'>" +
            "<div>" + WaterConetenData[i].a + "</div>" +
            "<div>" + WaterConetenData[i].b + "</div>" +
            "<div>" + WaterConetenData[i].c + "</div>" +
            "<div style='width:35.52%;' title=" + WaterConetenData[i].e + ">" + WaterConetenData[i].e + "</div>" +
            "<div>" + WaterConetenData[i].f + "</div>" +
            "</div>"
    }
    document.getElementById("UpsAllContent").innerHTML = "";
    document.getElementById("UpsAllContent").insertAdjacentHTML('beforeEnd', htmlAlert);
    let record = WaterConetenData.length + 1
    let page = record % 10 == 0 ? (record / 10) : (Math.floor(record / 10) + 1)
    document.getElementById("UpsPage").innerHTML = 1
    document.getElementById("UpsRecord").innerHTML = "一共" + page + "页, " + record + "条记录 "
}


//实时数据添加内容
function GetUpsState() {
    let WaterConetenData = [
        { a: '1号UPS', b: '0.0V', c: 0, d: '220.0V', e: '220.0V' },
        { a: '1号UPS', b: '0.0V', c: 0, d: '220.0V', e: '220.0V' },
        { a: '1号UPS', b: '0.0V', c: 0, d: '220.0V', e: '220.0V' },
    ]
    let htmlAlert = "";
    for (let i = 0; i < WaterConetenData.length; i++) {
        htmlAlert +=
            "<div class='UPSContentList'>" +
            "<div>" +
            "<div>1号UPS</div>" +
            "<img src='../imgs/UPS.png'/>" +
            "</div>" +
            "<div>" +
            "<div>电池电压：0.0V</div>" +
            "<div>电池电压：0.0V</div>" +
            "<div>电池电压：0.0V</div>" +
            "<div>电池电压：0.0V</div>" +
            "<div>电池电压：0.0V</div>" +
            "<div>电池电压：0.0V</div>" +
            "<div>电池电压：0.0V</div>" +
            "</div>" +
            "<div>" +
            "<div>" + "UPS：" + "<div>正常</div>" + "</div>" +
            "<div>" + "UPS：" + "<div>正常</div>" + "</div>" +
            "<div>" + "UPS：" + "<div>正常</div>" + "</div>" +
            "<div>" + "UPS：" + "<div>正常</div>" + "</div>" +
            "<div>" + "UPS：" + "<div>正常</div>" + "</div>" +
            "<div>" + "UPS工作状态：" + "<div>正常</div>" + "</div>" +
            "</div>" +
            "<div>" +
            "<div>三相输入量</div>" +
            "<div>A相输入电压：220.0V</div>" +
            "<div>B相输入电压：220.0V</div>" +
            "<div>C相输入电压：220.0V</div>" +
            "<div>A相旁路电压：220.0V</div>" +
            "<div>B相旁路电压：220.0V</div>" +
            "<div>C相旁路电压：220.0V</div>" +
            "</div>" +
            "<div>" +
            "<div>三相输出量</div>" +
            "<div>A相逆变器电压：220.0V</div>" +
            "<div>B相逆变器电压：220.0V</div>" +
            "<div>C相逆变器电压：220.0V</div>" +
            "<div>A相负载百分比：220.0V</div>" +
            "<div>B相旁路电压：220.0V</div>" +
            "<div>C相负载百分比：220.0V</div>" +
            "</div>" +
            "</div>"
    }
    let BottomHtml = "<div>1号监控机房</div>"
    document.getElementById("UPS-midder").innerHTML = "";
    document.getElementById("UPS-midder").insertAdjacentHTML('beforeEnd', htmlAlert);
    document.getElementById("Ups-bottom").innerHTML = ""
    document.getElementById("Ups-bottom").insertAdjacentHTML('beforeEnd', BottomHtml);
}
// <------------------------------非定位漏水--------------------------------------------->
//同步处理，先执行请求数据的方法
function Waterleakage() {
    let WaterData = [
        { status: 0, gallery: "DIO" },
        { status: 1, gallery: "DI2" },
        { status: 2, gallery: "DI1" }
    ]
    GetWaterData().then(function(res) {
        WaterView(res)
        WaterChangePage(res) //切换非定位漏水的页面
    })
    pagecurrent()
}


function pagecurrent() {
    $('#asspager').zPager({
        totalData: 13,
        htmlBox: $('#wraper'),
        btnShow: true,
        ajaxSetData: false
    });
}

function currentPage(currentPage) {
    // console.log(currentPage);
}

//根据后端的数据循环插入html片段
function WaterView(WaterData) {
    const WateEmun = new Map([
        [0, ['正常', 'rgb(68,165,148)']],
        [1, ['报警', 'rgb(165,68,68)']],
        [2, ['关闭', 'rgb(179,179,179)']]
    ])
    let htmlStr = "";
    for (let h = 0; h < WaterData.length; h++) {
        htmlStr += "<div class='RealTime-mind'>" +
            "<div style='margin: 3vh 0 0 2.5vw;'>" +
            "<div>" + WaterData[h].elmName + "</div>" +
            "<div style='margin-top: 5vh;'>" +
            "<span>通道</span>" +
            "<span style='margin-left: 13.5vw;'>状态</span>" +
            "</div>" +
            "<div style='display: flex;flex-direction: row;align-items: center;margin-top: 5.5vh;'>" +
            " <span>" + WaterData[h].elmAddress + "</span>" +
            "<span class='WaterState' style=background-color:" + WateEmun.get(WaterData[h].elmStatus)[1] + ">" + WateEmun.get(WaterData[h].elmStatus)[0] + "</span>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("RealTime").innerHTML = "";
    document.getElementById("RealTime").insertAdjacentHTML('beforeEnd', htmlStr);

    Environmental.waterLeakage.style.display = "block";
}

//切换

function WaterChangePage(res) {
    let WaterChange = document.getElementById("water-leakage").children[0]
    WaterChange.children[0].addEventListener("click", function() {
            document.getElementById("RealTime").style.display = "flex"
            document.getElementById("WaterWarning").style.display = "none"
            WaterChange.children[1].style.color = "#888"
            WaterChange.children[0].style.color = "#FFFFFF"
        })
        //切换到报警数据页面的事件
    WaterChange.children[1].onclick = function() {
        document.getElementById("WaterWarning").style.display = "block"
        document.getElementById("RealTime").style.display = "none"
        WaterChange.children[1].style.color = "#FFFFFF"
        WaterChange.children[0].style.color = "#888"
        GetTime()
        WaterGulf(res)
    }
}

//报警数据Fun
function WaterGulf(res) {
    var index = 0

    //非定位漏水的默认开始时间
    document.getElementById("WaterWarningStartTime").children[1].innerHTML = DataTime()

    //非定位漏水的默认结束时间
    document.getElementById("WaterWarningEndTime").children[1].innerHTML = DataTime()

    GetWaterWaring(res[index].elmId, DataTime(), DataTime()).then(function(res) {
            WaterConeten(res)
        }) //默认查询当天第一个设备的报警数据

    document.getElementById("Second-Select").options.length = 0;

    for (let i = 0; i < res.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = res[i].elmName
        document.getElementById("Second-Select").appendChild(option)
    }

    //获取选中的index，获取到对应的值
    document.getElementById("Second-Select").addEventListener('change', function() {
        index = document.getElementById("Second-Select").selectedIndex
    })

    //点击查询按钮
    document.getElementById("AdvancedQuery").onclick = function() {
        let PlayTime = document.getElementById("WaterWarningStartTime").children[1].innerHTML
        let EndTime = document.getElementById("WaterWarningEndTime").children[1].innerHTML
        GetWaterWaring(res[index].elmId, PlayTime, EndTime).then(function(res) {
            WaterConeten(res)
        })
    }

}

//添加内容
function WaterConeten(res) {
    // let WaterConetenData = [
    //     { a: '1', b: '1号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '2', b: '2号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '3', b: '3号监控机房', c: '设备名称', d: 'DIO', e: '发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
    //     { a: '4', b: '3号监控机房', c: '设备名称', d: 'DIO', e: '发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
    //     { a: '5', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '6', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '7', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '8', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '9', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    //     { a: '10', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    // ]
    let htmlAlert = "";
    for (let i = 0; i < res.length; i++) {
        htmlAlert +=
            "<div class='WarningContent'>" +
            "<div>" + i + "</div>" +
            "<div>" + "无字段" + "</div>" +
            "<div>" + res[i].elmName + "</div>" +
            "<div>" + "无字段" + "</div>" +
            "<div>" + res[i].elaInfo + "</div>" +
            "<div>" + res[i].time + "</div>" +
            "</div>"
    }
    document.getElementById("WarningAllContent").innerHTML = "";
    document.getElementById("WarningAllContent").insertAdjacentHTML('beforeEnd', htmlAlert);
}

//报警数据查询
function GetWaterWaring(id, startTime, endTime) {
    return new Promise(function(resolve, reject) {
        AJAX('GET', 'software/location/findLocationAlarm/' + id + "/" + startTime + "/" + endTime, '', true, function(res) {
            if (typeof res == "object") {
                data = res
                resolve(res)
            }
        })
    })
}

//获取非定位漏水设备的后端数据
function GetWaterData() {
    return new Promise(function(resolve, reject) {
        AJAX('GET', 'software/location/getLocationAll', '', true, function(res) {
            if (typeof res == "object") {
                data = res
                resolve(res)
            }
        })
    })
}
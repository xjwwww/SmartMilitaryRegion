// <------------------------------非定位漏水--------------------------------------------->
//同步处理，先执行请求数据的方法
function Waterleakage() {
    let WaterData = [
        { status: 0, gallery: "DIO" },
        { status: 1, gallery: "DI2" },
        { status: 2, gallery: "DI1" }
    ]
    WaterView(WaterData)

    // GetWaterData().then(function(data) {
    //     WaterView(data)
    // })

    //切换非定位漏水的页面
    WaterChangePage()
}

//获取非定位漏水设备的后端数据
function GetWaterData() {
    return new Promise(function(resolve, reject) {
        AJAX('GET', 'software/ktr8052/getKtr8052Status/1', '', true, function(res) {
            if (typeof res == "object") {
                data = res
                resolve(res)
            }
        })
    })
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
            "<div>非定位漏水设备</div>" +
            "<div style='margin-top: 5vh;'>" +
            "<span>通道</span>" +
            "<span style='margin-left: 13.5vw;'>状态</span>" +
            "</div>" +
            "<div style='display: flex;flex-direction: row;align-items: center;margin-top: 5.5vh;'>" +
            " <span>" + WaterData[h].gallery + "</span>" +
            "<span class='WaterState' style=background-color:" + WateEmun.get(WaterData[h].status)[1] + ">" + WateEmun.get(WaterData[h].status)[0] + "</span>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("RealTime").innerHTML = "";
    document.getElementById("RealTime").insertAdjacentHTML('beforeEnd', htmlStr);

    Environmental.waterLeakage.style.display = "block";
}

//切换

function WaterChangePage() {
    let WaterChange = document.getElementById("water-leakage").children[0]
    WaterChange.children[0].addEventListener("click", function() {
            document.getElementById("RealTime").style.display = "flex"
            document.getElementById("WaterWarning").style.display = "none"
            WaterChange.children[1].style.color = "#888"
            WaterChange.children[0].style.color = "#FFFFFF"
        })
        //切换到报警数据页面的事件
    WaterChange.children[1].addEventListener("click", function() {
        document.getElementById("WaterWarning").style.display = "block"
        document.getElementById("RealTime").style.display = "none"
        WaterChange.children[1].style.color = "#FFFFFF"
        WaterChange.children[0].style.color = "#888"
        WaterGulf()
        WaterConeten()
        WaterGulfs()
        StartTime()
    })
}

//报警数据Fun
function WaterGulf() {
    let Guifdata = ["所有设备", '123123', 'asdasdasd', '骄傲斯岛上的']
    for (let i = 0; i < Guifdata.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("Second-Select").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("Second-Select").addEventListener('change', function() {
        let index = document.getElementById("Second-Select").selectedIndex
        let GuifContent = document.getElementById("Second-Select").options[index].text
    })
}

function WaterGulfs() {
    let Guifdata = ["所有设备", '123123', 'asdasdasd', '骄傲斯岛上的asdasdsa']
    for (let i = 0; i < Guifdata.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("Third-Select").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("Third-Select").addEventListener('change', function() {
        let index = document.getElementById("Third-Select").selectedIndex
        let GuifContent = document.getElementById("Third-Select").options[index].text
    })
}
//添加内容
function WaterConeten() {
    let WaterConetenData = [
        { a: '1', b: '1号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '2', b: '2号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '3', b: '3号监控机房', c: '设备名称', d: 'DIO', e: '发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '4', b: '3号监控机房', c: '设备名称', d: 'DIO', e: '发生报警发生报警发生报警发生报警发生报警发生报警', f: '2017-08-29 09:46' },
        { a: '5', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '6', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '7', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '8', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '9', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
        { a: '10', b: '4号监控机房', c: '设备名称', d: 'DIO', e: '发生报警', f: '2017-08-29 09:46' },
    ]
    let htmlAlert = "";
    for (let i = 0; i < WaterConetenData.length; i++) {
        htmlAlert +=
            "<div class='WarningContent'>" +
            "<div>" + WaterConetenData[i].a + "</div>" +
            "<div>" + WaterConetenData[i].b + "</div>" +
            "<div>" + WaterConetenData[i].c + "</div>" +
            "<div>" + WaterConetenData[i].d + "</div>" +
            "<div>" + WaterConetenData[i].e + "</div>" +
            "<div>" + WaterConetenData[i].f + "</div>" +
            "</div>"
    }
    document.getElementById("WarningAllContent").innerHTML = "";
    document.getElementById("WarningAllContent").insertAdjacentHTML('beforeEnd', htmlAlert);
    let record = WaterConetenData.length
    let page = record % 10 == 0 ? (record / 10) : (Math.floor(record / 10) + 1)
    document.getElementById("WaterPage").innerHTML = 1
    document.getElementById("WaterRecord").innerHTML = "一共" + page + "页, " + record + "条记录 "
}


// 时间触发事件
function StartTime() {
    Calendar.create({
        classN: 'calendar-item',
        callBack: function(bindElem, dateObj) {
            // console.log("1--------" + bindElem.year);
            console.log("2--------" + dateObj.year);
            bindElem.innerHTML = dateObj.year + '-' + dateObj.month + '-' + dateObj.date;
        }
    })
}
//温湿度

//同步处理，先执行请求数据的方法
function TempAndHum() {
    // GetTempAndHumData().then(function(data) {
    //     TempAndHumView(data)
    // })
    let data = [{
            "dId": 0,
            "name": null,
            "isShow": 0,
            "diId": 0,
            "diAddress": null,
            "diPort": 0,
            "diIsConnect": 0,
            "diOperate": 0,
            "gId": 0,
            "ehmId": 117,
            "ehmDeviceAddress": 0,
            "ehmDeviceFunction": 0,
            "ehmDeviceName": "温湿度1",
            "ehmTem": 34.0,
            "ehmHum": 54.0,
            "ehmMaxTem": 0.0,
            "ehmMinTem": 0.0,
            "ehmMaxHum": 0.0,
            "ehmMinHum": 0.0,
            "ehmStatus": 0,
            "intervalTime": 0
        },
        {
            "dId": 0,
            "name": null,
            "isShow": 0,
            "diId": 0,
            "diAddress": null,
            "diPort": 0,
            "diIsConnect": 0,
            "diOperate": 0,
            "gId": 0,
            "ehmId": 118,
            "ehmDeviceAddress": 0,
            "ehmDeviceFunction": 0,
            "ehmDeviceName": "温湿度2",
            "ehmTem": 40.0,
            "ehmHum": 20.0,
            "ehmMaxTem": 0.0,
            "ehmMinTem": 0.0,
            "ehmMaxHum": 0.0,
            "ehmMinHum": 0.0,
            "ehmStatus": 2,
            "intervalTime": 0
        },
        {
            "dId": 0,
            "name": null,
            "isShow": 0,
            "diId": 0,
            "diAddress": null,
            "diPort": 0,
            "diIsConnect": 0,
            "diOperate": 0,
            "gId": 0,
            "ehmId": 118,
            "ehmDeviceAddress": 0,
            "ehmDeviceFunction": 0,
            "ehmDeviceName": "温湿度2",
            "ehmTem": 40.0,
            "ehmHum": 20.0,
            "ehmMaxTem": 0.0,
            "ehmMinTem": 0.0,
            "ehmMaxHum": 0.0,
            "ehmMinHum": 0.0,
            "ehmStatus": 2,
            "intervalTime": 0
        },
        {
            "dId": 0,
            "name": null,
            "isShow": 0,
            "diId": 0,
            "diAddress": null,
            "diPort": 0,
            "diIsConnect": 0,
            "diOperate": 0,
            "gId": 0,
            "ehmId": 118,
            "ehmDeviceAddress": 0,
            "ehmDeviceFunction": 0,
            "ehmDeviceName": "温湿度2",
            "ehmTem": 40.0,
            "ehmHum": 20.0,
            "ehmMaxTem": 0.0,
            "ehmMinTem": 0.0,
            "ehmMaxHum": 0.0,
            "ehmMinHum": 0.0,
            "ehmStatus": 2,
            "intervalTime": 0
        }
    ]
    TempAndHumView(data)
        // //切换温湿度的页面
    TempAndHumiChangePage()
}

//获取温湿度后端数据
function GetTempAndHumData() {
    return new Promise(function(resolve, reject) {
        AJAX('GET', 'software/humiture/findHumitureStatus', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//温湿度
function TempAndHumView(TempAndHumData) {
    var htmlStr = "";
    for (let h = 0; h < TempAndHumData.length; h++) {
        htmlStr +=
            "<div class='TempAndHumiRealTime-mind'>" +
            "<div>" +
            "<div style='font-size: 1.3vw;margin-left: 2vw;margin-top: 2vh'>" + TempAndHumData[h].ehmDeviceName + "</div>" +
            " <div style='width: 30vw;height: 37vh'></div>" +
            "</div>" +
            "<div style='display:flex;flex-direction: column;align-items: center;margin:4vh 0 0 2.7vw'>" +
            "<div style='display: flex;align-items: center'><img src='../imgs/temperatureicon.png' style='margin-right: 0.5vw;height: 1vh; width:3vw' alt=''>温度</div>" +
            "<div style='display: flex;align-items: center;margin-top: 1vh'><img src='../imgs/humidityicon.png' style='margin-right: 0.5vw;height: 1vh;width:3vw' alt=''>湿度</div>" +
            "<div style='margin-top: 7.5vh;'>温度</div>" +
            "<div style='margin-top: 2vh;background-color: rgb(229, 131, 96);width: 6.5vw;line-height: 4.5vh;display: flex;justify-content: center;border-radius: 3vw'>" +
            TempAndHumData[h].ehmTem + "℃</div>" +
            "<div style='margin-top: 5vh'>湿度</div>" +
            "<div style='margin-top: 2vh;background-color: rgb(68, 165, 148);width: 6.5vw;line-height: 4.5vh;display: flex;justify-content: center;border-radius: 3vw'>" +
            TempAndHumData[h].ehmHum + "%</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById('TempAndHumiRealTime').innerHTML = "";
    document.getElementById('TempAndHumiRealTime').insertAdjacentHTML('beforeEnd', htmlStr);
    for (let s = 0; s < TempAndHumData.length; s++) {
        Echar(s)
    }
    Environmental.TempAndHumi.style.display = "block";
}


//切换
function TempAndHumiChangePage() {
    const Type = new Map([
        [0, 'TempAndHumiRealTime'],
        [1, 'TempAndHumiWarning'],
        [2, 'HistoricalCurve'],
        [3, 'DeviceManagement']
    ])
    let TempAndHumiChange = document.getElementById("TempAndHumi").children[0]
    let span = TempAndHumiChange.getElementsByTagName("span")
    for (let i = 0; i < span.length; i++) {
        let spanChild = span[i];
        spanChild.index = i; //给当前div下的每个span元素添加index属性;
        spanChild.onclick = function() {
            TempAndHumiChange.children[this.index].style.color = "#FFFFFF"
            document.getElementById(Type.get(this.index)).style.display = "flex"
            for (let i = 0; i < span.length; i++) {
                if (i !== this.index) {
                    TempAndHumiChange.children[i].style.color = "#888"
                    document.getElementById(Type.get(i)).style.display = "none"
                }
            }
        }
    }
}
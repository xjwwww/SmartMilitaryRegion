//温湿度

function TempAndHum() {
    GetTempAndHumData().then(function(data) {
        TempAndHumView(data)

        // //切换温湿度的页面
        TempAndHumiChangePage(data)
    })
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
            }
        ]
        // TempAndHumView(data)
}

//温湿度
function TempAndHumView(TempAndHumData) {
    let htmlStr = "";
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
function TempAndHumiChangePage(data) {
    const Type = new Map([
        [0, ['TempAndHumiRealTime']],
        [1, ['TempAndHumiWarning', TempAndHumiWaring]],
        [2, ['HistoricalCurve', HistoricalCurve]],
        [3, ['DeviceManagement', GetTempAndHumiDevice]]
    ])
    let TempAndHumiChange = document.getElementById("TempAndHumi").children[0]
    let span = TempAndHumiChange.getElementsByTagName("span")
    for (let i = 0; i < span.length; i++) {
        let spanChild = span[i];
        spanChild.index = i; //给当前div下的每个span元素添加index属性;
        spanChild.onclick = function() {
            TempAndHumiChange.children[this.index].style.color = "#FFFFFF"
            document.getElementById(Type.get(this.index)[0]).style.display = "flex"
            for (let i = 0; i < span.length; i++) {
                if (i !== this.index) {
                    TempAndHumiChange.children[i].style.color = "#888"
                    document.getElementById(Type.get(i)[0]).style.display = "none"
                }
            }
            Type.get(i)[1](data)
        }
    }
}

//报警数据
function TempAndHumiWaring(data) {
    let time = document.getElementById('TempAndHumiWarning').children[0].children[0]
    let StartTime = time.children[0].getElementsByClassName('calendar-item')
    let EndtTime = time.children[1].getElementsByClassName('calendar-item')
    StartTime[0].innerHTML = DataTime() //默认开始时间
    EndtTime[0].innerHTML = DataTime() //默认结束时间
    let htmlStr = "";
    for (let i = 0; i < data.length; i++) {
        htmlStr +=
            "<option>" + data[i].ehmDeviceName + "</option>"
    }
    document.getElementById('TempAndHumi-Select').innerHTML = "";
    document.getElementById('TempAndHumi-Select').insertAdjacentHTML('beforeEnd', htmlStr);
    GetTime() //时间选择器
    GetTempAndHumWaringData(data[0].ehmId, DataTime(), DataTime())
    document.getElementById("TempAndHumiCheck").onclick = function() {
        let select = document.getElementById("TempAndHumi-Select")
        let id = data[select.selectedIndex].ehmId
        let startTime = StartTime[0].innerHTML
        let endTime = EndtTime[0].innerHTML
        GetTempAndHumWaringData(id, startTime, endTime)
    }
}


//获取报警数据
function GetTempAndHumWaringData(ehmId, startTime, endTime) {
    let WaringDat = {
        ehmId: ehmId,
        startTime: startTime,
        endTime: endTime
    }
    return new Promise(function(resolve) {
        AJAX('POST', 'software/humiture/findHumitureAlarm', WaringDat, true, function(res) {
            if (typeof res == "object") {
                // console.log(res);
                AddTempAndHumiWaring(res)
                resolve(res)
            }
        })
    })
}


//循环插入报警数据
function AddTempAndHumiWaring(res) {
    console.log(res);
    let htmlstr = ""
    if (res.pageInfo.list.length !== 0) {
        for (let i = 0; i < res.pageInfo.list.length; i++) {
            let number = parseInt(i) + 1
            htmlstr +=
                "<div class='TempAndHumiAllContent'>" +
                "<div>" + number + "</div>" +
                "<div>" + res.pageInfo.list[i].address + "号监控机房</div>" +
                "<div>" + res.pageInfo.list[i].ehaName + "</div>" +
                "<div>" + res.pageInfo.list[i].ehaInfo + "213123131" + "</div>" +
                "<div>" + res.pageInfo.list[i].ehaTime + "</div>" +
                "</div>"
        }
        document.getElementById('TempAndHumiAllList').innerHTML = "";
        document.getElementById('TempAndHumiAllList').insertAdjacentHTML('beforeEnd', htmlstr);
    } else {
        document.getElementById('TempAndHumiAllList').innerHTML = "";
    }
}

//历史曲线
function HistoricalCurve(data) {
    let htmlsrt = ''
    for (let i = 0; i < data.length; i++) {
        htmlsrt +=
            "<option>" + data[i].ehmDeviceName + "</option>"
    }

    document.getElementById("Historical-scond").innerHTML = ''
    document.getElementById("Historical-scond").insertAdjacentHTML("beforeend", htmlsrt)

    document.getElementById("HistoricalStartTime").innerHTML = DataTime()
    document.getElementById("HistoricalEndTime").innerHTML = DataTime()

    GetHistoricalCurve().then(function(res) {
        let dataDB = []
        for (let i = 0; i < res.pageInfo.length; i++) {
            let values = [res.pageInfo[i].ehhTime, res.pageInfo[i].ehhTem]
            dataDB.push({ value: values })
        }
        HistoricalCurveEchar(dataDB)
    })
}

//获取历史曲线数据
function GetHistoricalCurve() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/humiture/findHumitureHistory/129/2019-12-12/2020-7-12/1', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//遮掩层的数据列表
function TempAndHumiDataList() {
    let UpTemperatureLimit = [60, 55, 50, 45, 40, 35, 30, 25, 20, 10] //温度上限
    let LowerTemperatureLimit = [-60, 150, -30, -20, -10, -5, 0, 5, 10, 20] //温度下限
    let UpperLimitHumidity = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] //湿度上限
    let LowerLimitHumidity = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35] //湿度下限
    let UpTempHtml = ''
    let LowerTempHtml = ''
    let UpHumidityHtml = ''
    let LowerHumidityHtml = ''
    for (let i = 0; i < UpTemperatureLimit.length; i++) {
        UpTempHtml +=
            "<option>" + UpTemperatureLimit[i] + "</option>",
            LowerTempHtml +=
            "<option>" + LowerTemperatureLimit[i] + "</option>",
            UpHumidityHtml +=
            "<option>" + UpperLimitHumidity[i] + "</option>",
            LowerHumidityHtml +=
            "<option>" + LowerLimitHumidity[i] + "</option>"
    }
    document.getElementById("UpTemperatureLimit").innerHTML = ""
    document.getElementById("UpTemperatureLimit").insertAdjacentHTML('beforeend', UpTempHtml)
    document.getElementById("LowerTemperatureLimit").innerHTML = ""
    document.getElementById("LowerTemperatureLimit").insertAdjacentHTML('beforeend', LowerTempHtml)
    document.getElementById("UpperLimitHumidity").innerHTML = ""
    document.getElementById("UpperLimitHumidity").insertAdjacentHTML('beforeend', UpHumidityHtml)
    document.getElementById("LowerLimitHumidity").innerHTML = ""
    document.getElementById("LowerLimitHumidity").insertAdjacentHTML('beforeend', LowerHumidityHtml)

    //遮掩层弹窗的inpt
    let list = document.getElementById("TempAndHumiChange-bg").children[1].children[1]

    //获取到点击的列表信息
    let data = document.getElementById("TempAndHumiDeviceList").children[this.index]

    //点击遮掩层获取到点击的列表数据
    list.children[0].children[0].value = data.children[1].innerHTML //设备地址
    list.children[1].children[0].value = data.children[2].innerHTML //所在位置
    list.children[2].children[0].value = data.children[9].innerHTML //IP端口号
    list.children[3].children[0].value = data.children[3].innerHTML //设备名称
    list.children[8].children[0].value = data.children[8].innerHTML //保存间隔
}

//设备管理内容
function TempAndHumiDeviceList(DeviceList) {
    let htmlStr = "";
    for (let i = 0; i < DeviceList.length; i++) {
        let number = parseInt(i) + 1
        htmlStr +=
            "<div class='TempAndHumiDeviceList'>" +
            "<div>" + number + "</div>" +
            "<div>" + DeviceList[i].ehmDeviceAddress + "</div>" +
            "<div>" + "无字段" + "</div>" +
            "<div>" + DeviceList[i].ehmDeviceName + "</div>" +
            "<div>" + DeviceList[i].ehmMaxTem + "</div>" +
            "<div>" + DeviceList[i].ehmMinTem + "</div>" +
            "<div>" + DeviceList[i].ehmMaxHum + "</div>" +
            "<div>" + DeviceList[i].ehmMinHum + "</div>" +
            "<div>" + DeviceList[i].intervalTime + "</div>" +
            "<div>" + DeviceList[i].diAddress + ":" + DeviceList[i].diPort + "</div>" +
            "<div style='display: flex;flex-direction: row'>" +
            "<div class='TempAndHumiDeviceUp'>更新</div>" +
            "<div class='TempAndHumiDeviceDelete'>删除</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById('TempAndHumiDeviceList').innerHTML = "";
    document.getElementById('TempAndHumiDeviceList').insertAdjacentHTML('beforeEnd', htmlStr);

    //打开设备管理遮掩层
    document.getElementById("AddTempAndHumiDevice").onclick = function() {
        document.getElementById("TempAndHumi-bg").style.display = "block"
        let address = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
        let addresshtml = ''
        for (let i = 0; i < address.length; i++) {
            addresshtml +=
                "<option>" + address[i] + "</option>"
        }
        document.getElementById("TempAndHumiBg-address").innerHTML = ''
        document.getElementById("TempAndHumiBg-address").insertAdjacentHTML('beforeend', addresshtml)
        GeTempAndHumtIP().then(function(res) {
            let IPhtml = ''
            for (let i = 0; i < res.length; i++) {
                IPhtml +=
                    "<option>" + res[i].diAddress + ":" + res[i].diPort + "</option>"
            }
            document.getElementById("TempAndHumiBg-AdddiPort").innerHTML = ''
            document.getElementById("TempAndHumiBg-AdddiPort").insertAdjacentHTML('beforeend', IPhtml)
        })
        let AddUpTemperatureLimit = [60, 55, 50, 45, 40, 35, 30, 25, 20, 10] //温度上限
        let AddLowerTemperatureLimit = [-60, 150, -30, -20, -10, -5, 0, 5, 10, 20] //温度下限
        let AddUpperLimitHumidity = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100] //湿度上限
        let AddLowerLimitHumidity = [-10, -5, 0, 5, 10, 15, 20, 25, 30, 35] //湿度下限
        let UpTempHtml = ''
        let LowerTempHtml = ''
        let UpHumidityHtml = ''
        let LowerHumidityHtml = ''
        for (let i = 0; i < AddUpTemperatureLimit.length; i++) {
            UpTempHtml +=
                "<option>" + AddUpTemperatureLimit[i] + "</option>",
                LowerTempHtml +=
                "<option>" + AddLowerTemperatureLimit[i] + "</option>",
                UpHumidityHtml +=
                "<option>" + AddUpperLimitHumidity[i] + "</option>",
                LowerHumidityHtml +=
                "<option>" + AddLowerLimitHumidity[i] + "</option>"
        }
        document.getElementById("AddUpTemperatureLimit").innerHTML = ""
        document.getElementById("AddUpTemperatureLimit").insertAdjacentHTML('beforeend', UpTempHtml)
        document.getElementById("AddLowerTemperatureLimit").innerHTML = ""
        document.getElementById("AddLowerTemperatureLimit").insertAdjacentHTML('beforeend', LowerTempHtml)
        document.getElementById("AddUpperLimitHumidity").innerHTML = ""
        document.getElementById("AddUpperLimitHumidity").insertAdjacentHTML('beforeend', UpHumidityHtml)
        document.getElementById("AddLowerLimitHumidity").innerHTML = ""
        document.getElementById("AddLowerLimitHumidity").insertAdjacentHTML('beforeend', LowerHumidityHtml)

    }

    //关闭设备管理遮掩层
    document.getElementById("TempAndHumi-clone").onclick = function() {
        document.getElementById("TempAndHumi-bg").style.display = "none"
    }

    //提交添加设备
    document.getElementById("AddTempAndHumi").onclick = function() {
        let address = document.getElementById("TempAndHumiBg-address").value //用户选择的设备地址
        let number = document.getElementById("TempAndHumiBg-AdddiPort").selectedIndex
        let IP = DeviceList[number].diId //IP端口号
        let Name = document.getElementById("TempAndHumiBg-EquipmentName").value // 设备名称
        let AddUpTemperatureLimit = document.getElementById("AddUpTemperatureLimit").value //温度上限
        let AddLowerTemperatureLimit = document.getElementById("AddLowerTemperatureLimit").value //温度下限
        let AddUpperLimitHumidity = document.getElementById("AddUpperLimitHumidity").value //湿度上限
        let AddLowerLimitHumidity = document.getElementById("AddLowerLimitHumidity").value //湿度下限
        let SaveInterval = document.getElementById("TempAndHumiBgSaveInterval").value //保存间隔
        let data = {
            diId: IP,
            ehmDeviceAddress: address,
            ehmDeviceName: Name,
            ehmMaxTem: AddUpTemperatureLimit,
            ehmMinTem: AddLowerTemperatureLimit,
            ehmMaxHum: AddUpperLimitHumidity,
            ehmMinHum: AddLowerLimitHumidity,
            intervalTime: SaveInterval
        }

        AddTempAndHumtDevice(data)
    }
    TempAndHumiUp(DeviceList)
}


//更新及删除按钮
function TempAndHumiUp(DeviceList) {
    document.getElementById("TempAndHumiChaneg-clone").onclick = function() {
        document.getElementById("TempAndHumiChange-bg").style.display = 'none'
    }
    let mainLeft = document.getElementById('TempAndHumiDeviceList')
    let AddDiv = mainLeft.getElementsByClassName('TempAndHumiDeviceUp') //更新
    let DeleteDiv = mainLeft.getElementsByClassName('TempAndHumiDeviceDelete') //删除
    for (let i = 0; i < AddDiv.length; i++) {
        let AdddivChild = AddDiv[i];
        let DeleteDivChild = DeleteDiv[i]
        AdddivChild.index = i;
        DeleteDivChild.index = i
        AdddivChild.onclick = function() {
            document.getElementById("TempAndHumiChange-bg").style.display = 'block'
            TempAndHumiDataList.call(this)
        }
        DeleteDivChild.onclick = function() {
            DeleteTempAndHumtDevice(DeviceList[this.index].ehmId)
        }
    }
}


//获取后端设备管理数据
function GetTempAndHumiDevice() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/humiture/findHumitureManageAll', '', true, function(res) {
            if (typeof res == "object") {
                TempAndHumiDeviceList(res)
                resolve(res)
            }
        })
    })
}

//获取温湿度后端数据
function GetTempAndHumData() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/humiture/findHumitureStatus', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//获取IP端口号
function GeTempAndHumtIP() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/humiture/findHumitureDeviceIp', '', true, function(res) {
            if (typeof res == "object") {
                console.log(res);
                resolve(res)
            }
        })
    })
}


//添加温湿度设备列表
function AddTempAndHumtDevice(data) {
    AJAX('POST', 'software/humiture/insertHumitureManage', data, true, function(res) {
        if (res === true) {
            document.getElementById("TempAndHumi-bg").style.display = "none"
            GetTempAndHumiDevice()
        }
    })
}

//删除温湿度设备列表
function DeleteTempAndHumtDevice(ID) {
    AJAX('DELETE', 'software/humiture/deleteHumitureManageById/' + ID, '', true, function(res) {
        if (res === true) {
            GetTempAndHumiDevice()
        }
    })
}
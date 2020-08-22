//精密空调

function precisionAir() {
    // GetprecisionAir().then(function(data) {
    //     precisionAirView(data)
    // })
    let data = [{
            "ecmId": 1,
            "ecmDeviceAddress": 1,
            "ecmDeviceName": "1号精密空调",
            "ecmTemp": 23.0,
            "ecmHum": 22.2,
            "ecmOnoroffStatus": 0,
            "ecmComprStatus": 0,
            "ecmFanStatus": 0,
            "ecmRefrigerationStatus": 0,
            "ecmHeatingStatus": 0,
            "ecmDehumidifyStatus": 0,
            "ecmHumidificationStatus": 0,
            "ecmRunningStatus": 0,
            "ecmHighPressureAlarm": 0,
            "ecmLowPressureAlarm": 0,
            "ecmHighTempAlarm": 0,
            "ecmLowTempAlarm": 0,
            "ecmHighHumAlarm": 0,
            "ecmLowHumAlarm": 0,
            "ecmPowerFailureAlarm": 0,
            "ecmHotGasByPassValveAlarm": 0,
            "ecmIntervalTime": 30,
            "gId": 2,
            "diId": 36,
            "group": {
                "gId": 0,
                "parentId": 0,
                "gName": null,
                "children": null
            }
        },
        {
            "ecmId": 2,
            "ecmDeviceAddress": 3,
            "ecmDeviceName": "精密空调2",
            "ecmTemp": 0.0,
            "ecmHum": 0.0,
            "ecmOnoroffStatus": 0,
            "ecmComprStatus": 0,
            "ecmFanStatus": 0,
            "ecmRefrigerationStatus": 0,
            "ecmHeatingStatus": 0,
            "ecmDehumidifyStatus": 0,
            "ecmHumidificationStatus": 0,
            "ecmRunningStatus": 0,
            "ecmHighPressureAlarm": 0,
            "ecmLowPressureAlarm": 0,
            "ecmHighTempAlarm": 0,
            "ecmLowTempAlarm": 0,
            "ecmHighHumAlarm": 0,
            "ecmLowHumAlarm": 0,
            "ecmPowerFailureAlarm": 0,
            "ecmHotGasByPassValveAlarm": 0,
            "ecmIntervalTime": 30,
            "gId": 3,
            "diId": 36,
            "group": {
                "gId": 0,
                "parentId": 0,
                "gName": null,
                "children": null
            }
        }, {
            "ecmId": 2,
            "ecmDeviceAddress": 3,
            "ecmDeviceName": "精密空调2",
            "ecmTemp": 0.0,
            "ecmHum": 0.0,
            "ecmOnoroffStatus": 0,
            "ecmComprStatus": 0,
            "ecmFanStatus": 0,
            "ecmRefrigerationStatus": 0,
            "ecmHeatingStatus": 0,
            "ecmDehumidifyStatus": 0,
            "ecmHumidificationStatus": 0,
            "ecmRunningStatus": 0,
            "ecmHighPressureAlarm": 0,
            "ecmLowPressureAlarm": 0,
            "ecmHighTempAlarm": 0,
            "ecmLowTempAlarm": 0,
            "ecmHighHumAlarm": 0,
            "ecmLowHumAlarm": 0,
            "ecmPowerFailureAlarm": 0,
            "ecmHotGasByPassValveAlarm": 0,
            "ecmIntervalTime": 30,
            "gId": 3,
            "diId": 36,
            "group": {
                "gId": 0,
                "parentId": 0,
                "gName": null,
                "children": null
            }
        }
    ]
    precisionAirView(data)
}

////获取精密空调后端数据
function GetprecisionAir() {
    return new Promise(function(resolve, reject) {
        AJAX('GET', 'software/crac/getCracManageAll', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//紧密空调
function precisionAirView(precisionAirData) {
    const StateColors = new Map([
        [1, 'rgb(165,68,68)'],
        [0, 'rgb(68,165,148)'],
        [2, 'rgb(179,179,179)']
    ]);
    const states = new Map([
        [0, '正常'],
        [1, '报警'],
        [2, '关闭']
    ]);
    let htmlStr = "";
    for (let h = 0; h < precisionAirData.length; h++) {
        htmlStr +=
            "<div class='AllAir'>" +
            "<div class='AirState'>" +
            "<div>" +
            "1号精密空调" +
            "</div>" +
            "<div style='display: flex;flex-direction: row;'>" +
            "<div>" +
            "<img src='./imgs/temperature.png'>" +
            "温度：30℃</div>" +
            "<div>" +
            "<img src='./imgs/humidity.png'>" +
            "湿度：20%</div>" +
            "</div>" +
            "<div class='StateType'>" +
            "<ul>" +
            " <li>风机状态：</li>" +
            " <li>制冷状态：</li>" +
            " <li>加热状态：</li>" +
            "</ul>" +
            "<ul style='margin-right: 6.5vw;'>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmFanStatus) + ">" + states.get(precisionAirData[h].ecmFanStatus) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmRefrigerationStatus) + ">" + states.get(precisionAirData[h].ecmRefrigerationStatus) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmHeatingStatus) + ">" + states.get(precisionAirData[h].ecmHeatingStatus) + "</li>" +
            "</ul>" +

            "<ul>" +
            " <li>除湿&nbsp;&nbsp;&nbsp;&nbsp;状态：</li>" +
            " <li>加湿&nbsp;&nbsp;&nbsp;&nbsp;状态：</li>" +
            " <li>开关机状态：</li>" +
            "</ul>" +

            "<ul>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmDehumidifyStatus) + ">" + states.get(precisionAirData[h].ecmDehumidifyStatus) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmHumidificationStatus) + ">" + states.get(precisionAirData[h].ecmHumidificationStatus) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmOnoroffStatus) + ">" + states.get(precisionAirData[h].ecmOnoroffStatus) + "</li>" +
            "</ul>" +
            "</div>" +
            "</div>" +
            "<div class='AlarmStatus'>" +
            "<div>报警状态</div>" +
            "<div>" +

            "<ul class='AirTitle'>" +
            " <li>高压报警</li>" +
            " <li>低压报警</li>" +
            " <li>电源故障报警</li>" +
            "</ul>" +

            "<ul class='AirIcon'>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighPressureAlarm) + ">" + states.get(precisionAirData[h].ecmHighPressureAlarm) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus) + ">" + states.get(precisionAirData[h].ecmRunningStatus) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmPowerFailureAlarm) + ">" + states.get(precisionAirData[h].ecmPowerFailureAlarm) + "</li>" +
            "</ul>" +

            "<ul class='AirTitle'>" +
            " <li>高温报警</li>" +
            " <li>低温报警</li>" +
            " <li>运行状态</li>" +
            "</ul>" +

            "<ul class='AirIcon'>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighPressureAlarm) + ">" + states.get(precisionAirData[h].ecmHighPressureAlarm) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus) + ">" + states.get(precisionAirData[h].ecmRunningStatus) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmPowerFailureAlarm) + ">" + states.get(precisionAirData[h].ecmPowerFailureAlarm) + "</li>" +
            "</ul>" +

            "<ul class='AirTitle'>" +
            " <li>高温报警</li>" +
            " <li>低温报警</li>" +
            " <li>热气阀门</li>" +
            "</ul>" +

            "<ul class='AirIcon'>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighPressureAlarm) + ">" + states.get(precisionAirData[h].ecmHighPressureAlarm) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus) + ">" + states.get(precisionAirData[h].ecmRunningStatus) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmPowerFailureAlarm) + ">" + states.get(precisionAirData[h].ecmPowerFailureAlarm) + "</li>" +
            "</ul>" +

            "</div>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("AirConditionerContent").innerHTML = "";
    document.getElementById("AirConditionerContent").insertAdjacentHTML('beforeEnd', htmlStr);
    Environmental.rightAirConditioner.style.display = "block";
}
//精密空调

async function precisionAir() {
    var precisionAirData = []
    await GetprecisionAir().then((data) => {
        precisionAirData = data
    })
    precisionAirView(precisionAirData)
}


////获取精密空调后端数据
function GetprecisionAir() {
    return new Promise((resolve, reject) => {
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
            "<div>" +
            "<text>实时数据</text>" +
            "<text style='margin-left: 2.5vw;color: #8888;'>报警数据</text>" +
            "</div>" +
            "<div>" +
            "<text>" + precisionAirData[h].ecmDeviceName + "</text>" +
            "<text style=' margin-left: 50vw;'>报警状态</text>" +
            "</div>" +
            "<div style='display: flex;flex-direction: row;'>" +
            "<text id='right-temperature' style='margin-top: 6vh;margin-left: 4.5vw;background-color: rgb(229, 131, 96);width: 10vw;line-height: 6vh;border-radius: 10vw;display: flex;justify-content: center'>" +
            "<img src='./imgs/temperature.png' alt='' style='height: 3.3vh;width: 1.1vw;margin: auto 1vw auto 0.3vw;'>" +
            "<text style='font-size:1vw'>" + "温度:" + precisionAirData[h].ecmTemp + "℃" + "</text>" +
            "</text>" +
            "<text id='right-humidity' style='margin-top: 6vh;margin-left: 5vw;background-color: rgb(68, 165, 148);width: 10vw;line-height: 6vh;border-radius: 10vw;display: flex;justify-content: center;'>" +
            "<img src='./imgs/humidity.png' alt='' style='height: 3.3vh;width: 1.1vw;margin: auto 1vw auto 0.3vw;'>" +
            "<text style='font-size:1vw'>" + "湿度:" + precisionAirData[h].ecmHum + "%" + "</text>" +
            "</text>" +
            "</div>" +
            "<div class='AirState'>" +
            "<ul>" +
            " <li>风机状态：</li>" +
            " <li>制冷状态：</li>" +
            " <li>加热状态：</li>" +
            "</ul>" +
            "<ul style='margin-right: 7.5vw;'>" +
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
            "<div  class='AlarmStatus'>" +
            "<ul>" +
            " <li>高压报警</li>" +
            " <li style='margin-top: 4.5vh;'>低压报警</li>" +
            " <li style='margin-top: 4.5vh;'>电源故障报警</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighPressureAlarm) + ">" + states.get(precisionAirData[h].ecmHighPressureAlarm) + "</li>" +
            " <li style='margin-top: 4.5vh;'background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus) + ">" + states.get(precisionAirData[h].ecmRunningStatus) + "</li>" +
            " <li style='margin-top: 4.5vh;'background-color:" + StateColors.get(precisionAirData[h].ecmPowerFailureAlarm) + ">" + states.get(precisionAirData[h].ecmPowerFailureAlarm) + "</li>" +
            "</ul>" +
            "<ul>" +
            " <li>高温报警</li>" +
            " <li style='margin-top: 4.5vh;'>低温报警</li>" +
            " <li style='margin-top: 4.5vh;'>运行状态</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighTempAlarm) + ">" + states.get(precisionAirData[h].ecmHighTempAlarm) + "</li>" +
            " <li style='margin-top: 4.5vh;'background-color:" + StateColors.get(precisionAirData[h].ecmLowTempAlarm) + ">" + states.get(precisionAirData[h].ecmLowTempAlarm) + "</li>" +
            " <li style='margin-top: 4.5vh;'background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus) + ">" + states.get(precisionAirData[h].ecmRunningStatus) + "</li>" +
            "</ul>" +
            "<ul>" +
            " <li>高温报警</li>" +
            " <li style='margin-top: 4.5vh;'>低温报警</li>" +
            " <li style='margin-top: 4.5vh;'>热气阀门</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighTempAlarm) + ">" + states.get(precisionAirData[h].ecmHighTempAlarm) + "</li>" +
            " <li style='margin-top: 4.5vh;'background-color:" + StateColors.get(precisionAirData[h].ecmLowTempAlarm) + ">" + states.get(precisionAirData[h].ecmLowTempAlarm) + "</li>" +
            " <li style='margin-top: 4.5vh;'background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus) + ">" + states.get(precisionAirData[h].ecmRunningStatus) + "</li>" +
            "</ul>" +
            "</div>" +
            "</div>"
    }
    Environmental.rightAirConditioner.innerHTML = "";
    Environmental.rightAirConditioner.insertAdjacentHTML('beforeEnd', htmlStr);
    Environmental.rightAirConditioner.style.display = "block";
}
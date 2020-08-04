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
        AJAX('GET', 'http://192.168.1.42:8080/software/crac/getCracManageAll', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//紧密空调
function precisionAirView(precisionAirData) {
    //枚举
    const StateColors = new Map([
        ['1', 'rgb(165,68,68)'],
        ['0', 'rgb(68,165,148)'],
        ['2', 'rgb(179,179,179)']
    ]);
    const states = new Map([
        ['0', '正常'],
        ['1', '报警'],
        ['2', '关闭']
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
            "<text id='right-temperature' style='margin-top: 6vh;margin-left: 4.5vw;background-color: rgb(229, 131, 96);width: 10vw;line-height: 6.4vh;border-radius: 10vw;display: flex;justify-content: center;'>" +
            "<img src='./imgs/temperature.png' alt='' style='height: 3.3vh;width: 1.1vw;margin: auto 1vw auto 0.3vw;'>" +
            "<text>" + "温度:" + precisionAirData[h].ecmTemp + "℃" + "</text>" +
            "</text>" +
            "<text id='right-humidity' style='margin-top: 6vh;margin-left: 5vw;background-color: rgb(68, 165, 148);width: 10vw;line-height: 6.4vh;border-radius: 10vw;display: flex;justify-content: center;'>" +
            "<img src='./imgs/humidity.png' alt='' style='height: 3.3vh;width: 1.1vw;margin: auto 1vw auto 0.3vw;'>" +
            "<text>" + "湿度:" + precisionAirData[h].ecmHum + "%" + "</text>" +
            "</text>" +
            "</div>" +
            "<div class='AirState'>" +
            "<ul>" +
            " <li>风机状态：</li>" +
            " <li>制冷状态：</li>" +
            " <li>加热状态：</li>" +
            "</ul>" +
            "<ul style='margin-right: 7.5vw;'>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmFanStatus.toString()) + ">" + states.get(precisionAirData[h].ecmFanStatus.toString()) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmRefrigerationStatus.toString()) + ">" + states.get(precisionAirData[h].ecmRefrigerationStatus.toString()) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmHeatingStatus.toString()) + ">" + states.get(precisionAirData[h].ecmHeatingStatus.toString()) + "</li>" +
            "</ul>" +
            "<ul>" +
            " <li>除湿&nbsp;&nbsp;&nbsp;&nbsp;状态：</li>" +
            " <li>加湿&nbsp;&nbsp;&nbsp;&nbsp;状态：</li>" +
            " <li>开关机状态：</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmDehumidifyStatus.toString()) + ">" + states.get(precisionAirData[h].ecmDehumidifyStatus.toString()) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmHumidificationStatus.toString()) + ">" + states.get(precisionAirData[h].ecmHumidificationStatus.toString()) + "</li>" +
            " <li style=color:" + StateColors.get(precisionAirData[h].ecmOnoroffStatus.toString()) + ">" + states.get(precisionAirData[h].ecmOnoroffStatus.toString()) + "</li>" +
            "</ul>" +
            "</div>" +
            "<div  class='AlarmStatus'>" +
            "<ul>" +
            " <li>高压报警</li>" +
            " <li>低压报警</li>" +
            " <li>电源故障报警</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighPressureAlarm.toString()) + ">" + states.get(precisionAirData[h].ecmHighPressureAlarm.toString()) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus.toString()) + ">" + states.get(precisionAirData[h].ecmRunningStatus.toString()) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmPowerFailureAlarm.toString()) + ">" + states.get(precisionAirData[h].ecmPowerFailureAlarm.toString()) + "</li>" +
            "</ul>" +
            "<ul>" +
            " <li>高温报警</li>" +
            " <li>低温报警</li>" +
            " <li>运行状态</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighTempAlarm.toString()) + ">" + states.get(precisionAirData[h].ecmHighTempAlarm.toString()) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmLowTempAlarm.toString()) + ">" + states.get(precisionAirData[h].ecmLowTempAlarm.toString()) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus.toString()) + ">" + states.get(precisionAirData[h].ecmRunningStatus.toString()) + "</li>" +
            "</ul>" +
            "<ul>" +
            " <li>高温报警</li>" +
            " <li>低温报警</li>" +
            " <li>热气阀门</li>" +
            "</ul>" +
            "<ul>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmHighTempAlarm.toString()) + ">" + states.get(precisionAirData[h].ecmHighTempAlarm.toString()) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmLowTempAlarm.toString()) + ">" + states.get(precisionAirData[h].ecmLowTempAlarm.toString()) + "</li>" +
            " <li style=background-color:" + StateColors.get(precisionAirData[h].ecmRunningStatus.toString()) + ">" + states.get(precisionAirData[h].ecmRunningStatus.toString()) + "</li>" +
            "</ul>" +
            "</div>" +
            "</div>"
    }
    Environmental.rightAirConditioner.innerHTML = "";
    Environmental.rightAirConditioner.insertAdjacentHTML('beforeEnd', htmlStr);
    Environmental.rightAirConditioner.style.display = "block";
}
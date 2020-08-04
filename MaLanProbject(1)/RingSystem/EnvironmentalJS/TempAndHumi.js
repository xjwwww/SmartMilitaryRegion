//同步处理，先执行请求数据的方法
async function TempAndHum() {
    var TempAndHumData = []
    await GetTempAndHumData().then((data) => {
        TempAndHumData = data
    })
    TempAndHumView(TempAndHumData)
}

//获取温湿度后端数据
function GetTempAndHumData() {
    return new Promise((resolve, reject) => {
        AJAX('GET', 'http://192.168.1.42:8080/software/humiture/findHumitureStatus', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//温湿度
function TempAndHumView(TempAndHumData) {
    console.log(TempAndHumData)
    var htmlStr = "";
    for (let h = 0; h < TempAndHumData.length; h++) {
        htmlStr +=
            "<div class='TempAndHumiRealTime-mind'>" +
            "<div>" +
            "<div style='font-size: 1.3vw;margin-left: 2vw;margin-top: 2vh'>" + TempAndHumData[h].ehmDeviceName + "</div>" +
            " <div style='width: 30vw;height: 37vh'></div>" +
            "</div>" +
            "<div style='display:flex;flex-direction: column;align-items: center;margin:4vh 0 0 2.7vw'>" +
            "<div style='display: flex;align-items: center'><img src='./imgs/temperatureicon.png' style='margin-right: 0.5vw;height: 1vh; width:3vw' alt=''>温度</div>" +
            "<div style='display: flex;align-items: center;margin-top: 1vh'><img src='./imgs/humidityicon.png' style='margin-right: 0.5vw;height: 1vh;width:3vw' alt=''>湿度</div>" +
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
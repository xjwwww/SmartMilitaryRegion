//<---------------------------------烟感控制--------------------------------->

//同步处理，先执行请求数据的方法
async function SmokeControl() {
    var SmokeData = []
    await GetSmokeData().then(data => {
        SmokeData = data
    })
    SmokeView(SmokeData)
}

//获取烟感控制设备的后端数据
function GetSmokeData() {
    return new Promise((resolve, reject) => {
        AJAX('GET', 'http://192.168.1.42:8080/software/ktr8052/getKtr8052Status/1', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//根据后端的数据循环插入html片段
function SmokeView(SmokeData) {
    let htmlStr = "";
    for (let h = 0; h < SmokeData.length; h++) {
        htmlStr += "<div class='SmokRealTime-mind'>" +
            "<div style='margin: 3vh 0 0 2.5vw;'>" +
            "<div>烟感设备</div>" +
            "<div style='margin-top: 5vh;'>" +
            "<span>通道</span>" +
            "<span style='margin-left: 13.5vw;'>状态</span>" +
            "</div>" +
            "<div style='display: flex;flex-direction: row;align-items: center;margin-top: 5.5vh;'>" +
            " <span>" + SmokeData[h].gallery + "</span>" +
            "<span class='SomkeState'>正常</span>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("SmokRealTime").innerHTML = "";
    document.getElementById("SmokRealTime").insertAdjacentHTML('beforeEnd', htmlStr);
    for (let j = 0; j < SmokeData.length; j++) {
        Change("SmokRealTime", SmokeData[j].status, j);
    }
    Environmental.SmokeSensation.style.display = "block";
}
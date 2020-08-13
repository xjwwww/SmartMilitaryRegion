// <------------------------------非定位漏水--------------------------------------------->
//同步处理，先执行请求数据的方法
async function Waterleakage() {
    let WaterData = []

    await GetWaterData().then(data => {
        WaterData = data
    })
    WaterView(WaterData)

    //切换非定位漏水的页面
    WaterChangePage()
}

//获取非定位漏水设备的后端数据
function GetWaterData() {
    return new Promise((resolve, reject) => {
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
    var htmlStr = "";
    for (var h = 0; h < WaterData.length; h++) {
        htmlStr += "<div class='RealTime-mind'>" +
            "<div style='margin: 3vh 0 0 2.5vw;'>" +
            "<div>非定位漏水设备</div>" +
            "<div style='margin-top: 5vh;'>" +
            "<span>通道</span>" +
            "<span style='margin-left: 13.5vw;'>状态</span>" +
            "</div>" +
            "<div style='display: flex;flex-direction: row;align-items: center;margin-top: 5.5vh;'>" +
            " <span>" + WaterData[h].gallery + "</span>" +
            "<span class='WaterState'></span>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("RealTime").innerHTML = "";
    document.getElementById("RealTime").insertAdjacentHTML('beforeEnd', htmlStr);
    for (var j = 0; j < WaterData.length; j++) {
        Change("RealTime", WaterData[j].status, j);
    }
    Environmental.waterLeakage.style.display = "block";
}

//切换

function WaterChangePage() {
    let WaterChange = document.getElementById("water-leakage").children[0]
    WaterChange.children[0].addEventListener("click", function() {
        document.getElementById("RealTime").style.display = "flex"
        document.getElementById("WaterWarning").style.display = "none"
        document.getElementById("water-leakage").children[0].children[1].style.color = "#8888"
        document.getElementById("water-leakage").children[0].children[0].style.color = "#FFFFFF"
    })
    WaterChange.children[1].addEventListener("click", function() {
        document.getElementById("WaterWarning").style.display = "block"
        document.getElementById("RealTime").style.display = "none"
        document.getElementById("water-leakage").children[0].children[1].style.color = "#FFFFFF"
        document.getElementById("water-leakage").children[0].children[0].style.color = "#8888"
    })
}
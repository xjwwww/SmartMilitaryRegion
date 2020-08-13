//<---------------------------------烟感控制--------------------------------->

//同步处理，先执行请求数据的方法
async function SmokeControl() {
    let SmokeData = []
    await GetSmokeData().then(data => {
        SmokeData = data
    })
    SmokeView(SmokeData)
        //切换烟感的页面
    SmokChangePage()
}

//获取烟感控制设备的后端数据
function GetSmokeData() {
    return new Promise((resolve, reject) => {
        AJAX('GET', 'software/ktr8052/getKtr8052Status/1', '', true, function(res) {
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

//切换

function SmokChangePage() {
    let SmokChange = document.getElementById("SmokeSensation").children[0]
    SmokChange.children[1].addEventListener('click', function() {
        document.getElementById("SmokRealTime").style.display = "none"
        document.getElementById("SmokWarning").style.display = "block"
        document.getElementById("SmokeSensation").children[0].children[0].style.color = "#8888"
        document.getElementById("SmokeSensation").children[0].children[1].style.color = "#FFFFFF"
    })
    SmokChange.children[0].addEventListener('click', function() {
        document.getElementById("SmokRealTime").style.display = "flex"
        document.getElementById("SmokWarning").style.display = "none"
        document.getElementById("SmokeSensation").children[0].children[0].style.color = "#FFFFFF"
        document.getElementById("SmokeSensation").children[0].children[1].style.color = "#8888"
    })
}
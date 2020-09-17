//<---------------------------------烟感控制--------------------------------->

//同步处理，先执行请求数据的方法
function SmokeControl() {
    let data = [
            { status: 0, gallery: "DIO" },
            { status: 1, gallery: "DI2" },
            { status: 2, gallery: "DI1" }
        ]
        // GetSmokeData().then(function(data) {
        //         SmokeView(data)
        //     })

    SmokeView(data)
        //切换烟感的页面
    SmokChangePage()
}

//获取烟感控制设备的后端数据
function GetSmokeData() {
    return new Promise(function(resolve, reject) {
        AJAX('GET', 'software/ktr8052/getKtr8052Status/1', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//根据后端的数据循环插入html片段
function SmokeView(SmokeData) {
    const SmokeEmun = new Map([
        [0, ['正常', 'rgb(68,165,148)']],
        [1, ['报警', 'rgb(165,68,68)']],
        [2, ['关闭', 'rgb(179,179,179)']]
    ])
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
            "<span class='SomkeState' style=background-color:" + SmokeEmun.get(SmokeData[h].status)[1] + ">" + SmokeEmun.get(SmokeData[h].status)[0] + "</span>" +
            "</div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("SmokRealTime").innerHTML = "";
    document.getElementById("SmokRealTime").insertAdjacentHTML('beforeEnd', htmlStr);
    Environmental.SmokeSensation.style.display = "block";
}

//切换

function SmokChangePage() {
    let SmokChange = document.getElementById("SmokeSensation").children[0]
    SmokChange.children[1].addEventListener('click', function() {
        document.getElementById("SmokRealTime").style.display = "none"
        document.getElementById("SmokWarning").style.display = "block"
        SmokChange.children[0].style.color = "#8888"
        SmokChange.children[1].style.color = "#FFFFFF"
    })
    SmokChange.children[0].addEventListener('click', function() {
        document.getElementById("SmokRealTime").style.display = "flex"
        document.getElementById("SmokWarning").style.display = "none"
        SmokChange.children[0].style.color = "#FFFFFF"
        SmokChange.children[1].style.color = "#8888"
    })
}
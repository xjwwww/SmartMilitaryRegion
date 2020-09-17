function AlarmSettingsFun() {
    GetAlarmSettings().then(function(res) {
        WaringContent(res)
        AlarmSettings(res)
    })
}

function AlarmPageFun() {
    // console.log(111 + "----------------");
    let currentPage = 1
    GetAlarmSettings(currentPage).then(function(res) {
        pagecurrent(8, "#AlarmPager")
    })
}
// pagecurrent(13, "#AlarmPager")

function WaringContent(WaringContentDatas) {
    const WaringState = new Map([
        [0, ["已开启", '#44a594']],
        [1, ["已关闭", '#808080']],
    ])
    let htmlstr = ''
    for (let i = 0; i < WaringContentDatas.length; i++) {
        htmlstr += "<div class='waring-content'>" +
            "<h5>" + WaringContentDatas[i].week + "</h5>" +
            "<h5>" + WaringContentDatas[i].timeQuantumOne + "</h5>" +
            "<h5>" + WaringContentDatas[i].timeQuantumTwo + "</h5>" +
            "<h5>" + WaringContentDatas[i].timeQuantumThree + "</h5>" +
            "<h5>" + "<div style=background-color:" + WaringState.get(WaringContentDatas[i].smsStatus)[1] + ">" +
            WaringState.get(WaringContentDatas[i].smsStatus)[0] + "</div>" + "</h5>" +
            "<h5>" + "<div style=background-color:" + WaringState.get(WaringContentDatas[i].soundLightStatus)[1] + ">" +
            WaringState.get(WaringContentDatas[i].soundLightStatus)[0] + "</div>" + "</h5>" +
            "<h5>" + WaringContentDatas[i].intervalTime + "</h5>" +
            "<h5>" + "<div class='waring-updata'>更新</div>" + "</h5>" +
            "</div>"
    }
    document.getElementById("WaringContent").innerHTML = ''
    document.getElementById("WaringContent").insertAdjacentHTML('beforeEnd', htmlstr)
}

function AlarmSettings(res) {
    let mainLeft = document.getElementById('WaringContent')
    let div = mainLeft.getElementsByClassName('waring-updata')
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        divChild.index = i;
        divChild.addEventListener("click", function() {
            WaringContentBg.call(this)
            WaringBg.style.display = "block"
            AlaremWaring(res[this.index])
        })
    }
}

// 更新方法
function AlaremWaring(index) {
    document.getElementById("WaringBg-Up").onclick = function() {
        index.week = document.getElementById("WaringBg-middle").children[0].children[0].value
        index.timeQuantumOne = document.getElementById("WaringBg-middle").children[1].children[0].value
        index.timeQuantumTwo = document.getElementById("WaringBg-middle").children[2].children[0].value
        index.timeQuantumThree = document.getElementById("WaringBg-middle").children[3].children[0].value
        index.intervalTime = document.getElementById("WaringBg-middle").children[4].children[0].value
        ChangeAlarmSettings(index)
    }
}

//显示默认值
function WaringContentBg() {
    let content = document.getElementById("WaringContent").children[this.index]
    document.getElementById("WaringBg-middle").children[0].children[0].value = content.children[0].innerHTML
    document.getElementById("WaringBg-middle").children[1].children[0].value = content.children[1].innerHTML
    document.getElementById("WaringBg-middle").children[2].children[0].value = content.children[2].innerHTML
    document.getElementById("WaringBg-middle").children[3].children[0].value = content.children[3].innerHTML
    document.getElementById("WaringBg-middle").children[4].children[0].value = content.children[6].innerHTML
}

//查询数据
function GetAlarmSettings() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/deviceIp/findDeviceAlarmAll', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//修改数据
function ChangeAlarmSettings(index) {
    AJAX('PUT', 'software/deviceIp/updateDeviceAlarmById', index, true, function(res) {
        if (res === true) {
            WaringBg.style.display = 'none'
            AlarmPageFun()
        }
    })
}
function IpFun(currentPage) {
    console.log("IpFun中的页数-------" + currentPage)
    Promise.all([GerIpContent(currentPage), GetMoudles()]).then(function(res) {
        IpContent(res[0].pageInfo.list, res[1])
        IpOperation(res[0].pageInfo.list)
        OpenAdd(res[1], currentPage)
    })
}

function PageFun() {
    console.log(111 + "----------------");
    let currentPage = 1
    GerIpContent(currentPage).then(function(res) {
        pagecurrent(res.pageInfo.total, "#pager")
    })
}


function UpIp(diId) {
    document.getElementById('ChangeIp-up').addEventListener('click', function change() {
        let IpAddress = document.getElementById('IpChangeBg-middle').children[0].children[0].value
        let IpPort = document.getElementById('IpChangeBg-middle').children[1].children[0].value
        let IpUpData = {}
        IpUpData.diAddress = IpAddress
        IpUpData.diPort = IpPort
        IpUpData.diId = diId
        changeIpBg.style.display = "none"
        ModifyContent(IpUpData)
        document.getElementById('ChangeIp-up').removeEventListener('click', change)
    })
}

//Ip界面操作
function IpOperation(IpAllcontenttData) {
    let mainLeft = document.getElementById('ip-allcontent')
    let div = mainLeft.getElementsByClassName('IpDelete')
    let state = mainLeft.getElementsByClassName('IpState')
    let ChangeIpBg = mainLeft.getElementsByClassName("IpChange")
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        let stateChild = state[i]
        let ChangeIpBgChild = ChangeIpBg[i]
        divChild.index = i;
        stateChild.index = i;
        ChangeIpBgChild.index = i
        divChild.addEventListener("click", function() {
            //删除
            DeleteContent(IpAllcontenttData[this.index].diId)
        })

        stateChild.addEventListener('click', function() {
                //修改连接状态
                let content = mainLeft.children[this.index]
                let IpAddress = content.children[2].innerHTML
                let diPort = content.children[3].innerHTML
                let IpUpData = {}
                IpUpData.diAddress = IpAddress
                IpUpData.diPort = diPort
                IpUpData.diId = IpAllcontenttData[this.index].diId
                IpUpData.diIsConnect = IpStateLine(IpAllcontenttData[this.index].diIsConnect)
                IpUpData.diOperate = IpStateLine(IpAllcontenttData[this.index].diOperate)
                ModifyContent(IpUpData)
            })
            //修改
        ChangeIpBgChild.addEventListener('click', function() {
            let content = mainLeft.children[this.index]
            document.getElementById("IpChangeBg-middle").children[0].children[0].value = content.children[2].innerHTML
            document.getElementById("IpChangeBg-middle").children[1].children[0].value = content.children[3].innerHTML
            changeIpBg.style.display = "block"
            UpIp(IpAllcontenttData[this.index].diId)
        })
    }
}


function IpStateLine(c) {
    if (c === 1)
        c = 0
    else
        c = 1
    return c
}

function OpenAdd(AddName, currentPage) {
    document.getElementById("ip-header").addEventListener("click", function() {
        IpBg.style.display = "block"; //点击页面出现遮罩层
        let htmlstr = ''
        for (let i = 1; i < AddName.length; i++) {
            htmlstr += "<option>" + AddName[i - 1].name + "</option>"
        }
        document.getElementById("IpBg-modules").innerHTML = ''
        document.getElementById("IpBg-modules").insertAdjacentHTML('beforeEnd', htmlstr)
    })
    document.getElementById("IpBg-up").onclick = function() {
        let NewdId = document.getElementById("IpBg-middle").children[0].children[0]
        let NewdiAddress = document.getElementById("IpBg-middle").children[1].children[0]
        let NewdiPort = document.getElementById("IpBg-middle").children[2].children[0]
        let IpData = {}
        IpData.dId = AddName[NewdId.selectedIndex].dId
        IpData.diAddress = NewdiAddress.value
        IpData.diPort = NewdiPort.value
        AddIp(IpData, currentPage)
    }
}


var deviceTypeDecomposition = function(element) {
    return {
        id: element.dId,
        name: element.name
    }
}

var Newdata = function(moudels) {
    let dataList = moudels.map(function(element) {
        return deviceTypeDecomposition(element);
    })
    let dataMap = {}
    dataList.forEach(function(element) {
        dataMap[element.id] = element
    })
    return dataMap
}

//根据数据插入html
function IpContent(IpAllcontenttData, moudels) {
    let htmlstr = ''
    const IpState = new Map([
        [0, ["启动", '#44a594', "连接正常"]],
        [1, ["关闭", '#a54444', '连接中断']]
    ])
    for (let i = 0; i < IpAllcontenttData.length; i++) {

        let listNumber = parseInt(i) + 1
        htmlstr +=
            "<div class='ip-content'>" +
            "<h5>" + listNumber + "</h5>" +
            "<h5>" + Newdata(moudels)[IpAllcontenttData[i].dId].name + "</h5>" +
            "<h5>" + IpAllcontenttData[i].diAddress + "</h5>" +
            "<h5>" + IpAllcontenttData[i].diPort + "</h5>" +
            "<h5 style=color:" + IpState.get(IpAllcontenttData[i].diIsConnect)[1] + ">" +
            IpState.get(IpAllcontenttData[i].diIsConnect)[2] + "</h5>" +
            "<h5 ><div class='IpState' style=background-color:" + IpState.get(IpAllcontenttData[i].diIsConnect)[1] + ">" +
            IpState.get(IpAllcontenttData[i].diIsConnect)[0] + "</div></h5>" +
            "<h5>" +
            "<div class='IpChange'>修改</div>" +
            "<div class='IpDelete'>删除</div>" +
            "</h5>" +
            "</div>"
    }
    document.getElementById("ip-allcontent").innerHTML = ''
    document.getElementById("ip-allcontent").insertAdjacentHTML('beforeEnd', htmlstr)
}

//修改数据
function ModifyContent(IpUpData) {
    console.log(IpUpData);
    AJAX('PUT', 'software/deviceIp/updateDeviceIpById', IpUpData, true, function(res) {
        if (res === true) {
            PageFun()
        }
    })
}

//删除数据
function DeleteContent(diId) {
    AJAX('DELETE', 'software/deviceIp/deleteDeviceIpById/' + diId, '', true, function(res) {
        if (res === true) {
            PageFun()
        }
    })
}

//查询数据
function GerIpContent(currentPage) {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/deviceIp/findDeviceIpAll?&pageNum=' + currentPage, '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//查询数据
function GetMoudles() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/deviceIp/findDeviceAll', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//增加数据
function AddIp(IpData, currentPage) {
    AJAX('post', 'software/deviceIp/insertDeviceIpAll', IpData, true, function(res) {
        if (res === true) {
            PageFun()
            IpBg.style.display = 'none'
        }
    })
}
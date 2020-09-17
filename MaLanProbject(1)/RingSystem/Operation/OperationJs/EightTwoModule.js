function EightModuleFun(currentPage) {
    Promise.all([GetIP(), GetEightEquipment(), GetEightMoudle(currentPage)]).then(function(res) {
        let dataMap = {}
        res[1].forEach(function(element) {
            dataMap[element.kId] = element
        })
        EignthAllcontent(res[2], dataMap);
        EightListFun(res[2])
        AddModule(res[0], res[1])
    })
}

function PageFunss() {
    GetEightMoudle().then(function(res) {
        pagecurrent(30, "#EightTwoModulePager", 0)
    })
}

function EignthAllcontent(EignthAllcontenttDatas, dataMap) {
    let htmlstr = ''
    for (let i = 0; i < EignthAllcontenttDatas.length; i++) {
        htmlstr +=
            "<div class='eight-content'>" +
            "<h5>" + EignthAllcontenttDatas[i].ekmAddress + "</h5>" +
            "<h5>" + EignthAllcontenttDatas[i].gallery + "</h5>" +
            "<h5>" + '无字段' + "</h5>" +
            "<h5>" + dataMap[EignthAllcontenttDatas[i].kId].kName + "</h5>" +
            "<h5>" + EignthAllcontenttDatas[i].ekmName + "</h5>" +
            "<h5>" + EignthAllcontenttDatas[i].deviceIp.diAddress + ":" + EignthAllcontenttDatas[i].deviceIp.diPort + "</h5>" +
            "<h5>" +
            "<div class='EightChange'>更新</div>" +
            "<div class='EightDelete'>删除</div>" +
            "</h5>" +
            "</div>"
    }
    document.getElementById("eignth-allcontent").innerHTML = ''
    document.getElementById("eignth-allcontent").insertAdjacentHTML('beforeEnd', htmlstr)
}

//
function EightListFun(res) {
    let mainLeft = document.getElementById('eignth-allcontent')
    let div = mainLeft.getElementsByClassName('EightDelete')
    let Update = mainLeft.getElementsByClassName('EightChange')
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        let UpdateChild = Update[i]
        divChild.index = i;
        UpdateChild.index = i
        divChild.addEventListener("click", function() {
            DeleteMoudle(res[this.index].ekmId)
        })
        UpdateChild.onclick = function() {
            let index = this.index
            let content = document.getElementById("eignth-allcontent").children[this.index]
            let ContentBg = document.getElementById('EigChange-middle')
            ContentBg.children[0].children[0].value = content.children[0].innerHTML
            ContentBg.children[1].children[0].value = content.children[2].innerHTML
            ContentBg.children[2].children[0].value = content.children[1].innerHTML
            ContentBg.children[3].children[0].value = content.children[4].innerHTML
            EigChangeBg.style.display = "block"
            document.getElementById("EigChange-up").onclick = function() {
                let ChangeData = {}
                let ekmAddress = ContentBg.children[0].children[0].value
                let ekmName = ContentBg.children[3].children[0].value
                let gallery = ContentBg.children[2].children[0].value
                ChangeData.ekmAddress = ekmAddress
                ChangeData.ekmName = ekmName
                ChangeData.gallery = gallery
                ChangeData.ekmId = res[index].ekmId
                UpEightList(ChangeData)
            }
        }
    }
}


//添加8052模块
function AddModule(moudles, equipment) {
    document.getElementById("EigAdd-up").onclick = function() {
        let DeviceAddress = document.getElementById('DeviceAddress')
        let IPAccess = document.getElementById('IPAccess').selectedIndex
        let SelectAddress = document.getElementById('SelectAddress').selectedIndex
        let EquipmentAccess = document.getElementById('EquipmentAccess')
        let Equipment = EquipmentAccess.options[EquipmentAccess.selectedIndex].value //通道得值
        let Ip = IPAccess //IP端口号moudles[Ip].diId
        let Select = SelectAddress //设备kid equipment[Select].kId
        let AddressName = document.getElementById('AddressName').value
        let Manage = {}
        Manage.ekmName = AddressName
        Manage.diId = moudles[Ip].diId
        Manage.kId = equipment[Select].kId
        Manage.gallery = Equipment
        Manage.ekmAddress = DeviceAddress[DeviceAddress.selectedIndex].value
        AJAX('POST', 'software/ktr8052/insertKtr8052Manage', Manage, true, function(res) {
            if (res === true) {
                EightBg.style.display = 'none'
                EightModuleFun()
            }
        })
    }
}

//修改数据
function UpEightList(date) {
    AJAX('PUT', 'software/ktr8052/updateKtr8052Manage', date, true, function(res) {
        if (res === true) {
            EigChangeBg.style.display = 'none'
            EightModuleFun()
            console.log(res);
        }
    })
}

//查询8052模块
function GetEightMoudle(currentPage) {
    let NewCurrentPage = 1
    if (typeof currentPage !== "undefined") {
        NewCurrentPage = currentPage
    }
    // console.log(NewCurrentPage);
    return new Promise(function(resolve) {
        AJAX('GET', 'software/ktr8052/findKtr8052AndIpAll', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//查询Ip端口号选中list
function GetIP() {
    return new Promise(function(reslove) {
        AJAX('GET', 'software/deviceIp/findDeviceAndDeviceIpAll', '', true, function(res) {
            if (typeof res == "object") {
                let HtmlIp = ''
                for (let l = 0; l < res.length; l++) {
                    HtmlIp +=
                        "<option>" + res[l].diAddress + ":" + res[l].diPort + "</option>"
                    document.getElementById("IPAccess").innerHTML = ''
                    document.getElementById("IPAccess").insertAdjacentHTML('beforeEnd', HtmlIp)
                }
                reslove(res)
            }
        })
    })
}


function GetEightEquipment() {
    return new Promise(function(reslove) {
        AJAX('GET', 'software/ktr8052/findKtr8052Device', '', true, function(res) {
            if (typeof res == "object") {
                let channels = ['DI0', 'DI1', 'DI2', 'DI3', 'DI4', 'DI5', 'DI6', 'DI7']
                let htmlstr = ''
                let htmlNumber = ''
                let htpMpassageway = ''
                for (let i = 0; i < res.length; i++) {
                    htmlstr +=
                        "<option>" + res[i].kName + "</option>"
                }
                for (let l = 0; l < channels.length; l++) {
                    htpMpassageway +=
                        "<option>" + channels[l] + "</option>"
                }
                for (let o = 1; o < 21; o++) {
                    htmlNumber +=
                        "<option>" + o + "</option>"
                }

                document.getElementById("SelectAddress").innerHTML = ''
                document.getElementById("SelectAddress").insertAdjacentHTML('beforeEnd', htmlstr)
                document.getElementById("DeviceAddress").innerHTML = ''
                document.getElementById("DeviceAddress").insertAdjacentHTML('beforeEnd', htmlNumber)
                document.getElementById("EquipmentAccess").innerHTML = ''
                document.getElementById("EquipmentAccess").insertAdjacentHTML('beforeEnd', htpMpassageway)
                reslove(res)
            }
        })
    })
}

//删除8052设备
function DeleteMoudle(id) {
    AJAX('DELETE', 'software/ktr8052/deleteKtr8052Manage/' + id, '', true, function(res) {
        if (res === true) {
            EightModuleFun()
        }
    })
}
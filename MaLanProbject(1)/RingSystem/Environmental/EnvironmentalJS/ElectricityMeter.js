function ElectricityMeter() {
    Environmental.ElectricityMeter.style.display = "block";
    ElectrChangePage()

    //根据后端数据动态插入html
    ElectrConeten()

    GetElectricity()
        //插入标题
    ElectrTitle()

    document.getElementById("AddElectricityDevice").onclick = function() {
        document.getElementById("Electricity-bg").style.display = "block"
        GetIPElectricit()
    }
    document.getElementById("ElectricityBg-clone").onclick = function() {
        document.getElementById("Electricity-bg").style.display = "none"
    }
}

function ElectrTitle() {
    let htmlElectr =
        "<div class='ElectrTitle'>" +
        "<h5>编号</h5>" +
        "<h5>A相电压(V)</h5>" +
        "<h5>A相电流(A)</h5>" +
        "<h5>B相电压(V)</h5>" +
        "<h5>B相电流(A)</h5>" +
        "<h5>C相电压(V)</h5>" +
        "<h5>C相电流(A)</h5>" +
        "<h5>总功率(KW)</h5>" +
        "<h5>用电时间(H)</h5>" +
        "<h5>电量(KW*H)</h5>" +
        "<h5>报警时间</h5>" +
        "</div>"
    document.getElementById("ElectrTitle").innerHTML = "";
    document.getElementById("ElectrTitle").insertAdjacentHTML('beforeEnd', htmlElectr);
}

function a() {

}
//切换
function ElectrChangePage() {
    const Type = new Map([
        [0, ['ElectricityContent', GetElectricity]],
        [1, ['ElectricityWarning', a]],
        [2, ['ElectricityHistorical', a]],
        [3, ['ElectricityDevice', GetElectricityAll]]
    ])
    let ElectrChange = document.getElementById("ElectricityMeter").children[0]
    let span = ElectrChange.getElementsByTagName("span")
    for (let i = 0; i < span.length; i++) {
        let spanChild = span[i];
        spanChild.index = i; //给当前div下的每个span元素添加index属性;
        spanChild.onclick = function() {
            ElectrChange.children[this.index].style.color = "#FFFFFF"
            document.getElementById(Type.get(this.index)[0]).style.display = "block"
            Type.get(i)[1]()
            for (let i = 0; i < span.length; i++) {
                if (i !== this.index) {
                    ElectrChange.children[i].style.color = "#888"
                    document.getElementById(Type.get(i)[0]).style.display = "none"
                }
            }
            if (this.index === 2) {
                ElectricityGulf()
                ElectricityVague()
                ElectricityFeesGulf()
            }
        }
    }
}

//动态插入仪表盘
function NewDashboards(res) {
    let datalength = document.getElementById("ElectricityRealTime")
    const Title = new Map([
            [0, ["A箱电压", "pedAvol"]],
            [1, ["B箱电压", "pedBvol"]],
            [2, ["C箱电压", "pedCvol"]],
            [3, ["A箱电流", "pedAcur"]],
            [4, ["B箱电流", "pedBcur"]],
            [5, ["C箱电流", "pedCcur"]]
        ])
        //到时根据后端数据长度动态添加datalength.children[length]
    for (let i = 0; i < res.length; i++) {
        for (let s = 0; s < 6; s++) {
            Dashboard(datalength.children[i].children[0].children[s], Title.get(s)[0], res[i][Title.get(s)[1]])
        }
    }
}

//报警数据Fun
function ElectricityGulf() {
    let Guifdata = ["所有设备", '123123', 'asdasdasd', '骄傲斯岛上的']
    for (let i = 0; i < Guifdata.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("Electri-SelectOne").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("Electri-SelectOne").addEventListener('change', function() {
        let index = document.getElementById("Electri-SelectOne").selectedIndex
        let GuifContent = document.getElementById("Electri-SelectOne").options[index].text
    })
}

function ElectricityFeesGulf() {
    let Guifdata = ["0.1", '0.2', '0.3', '0.4']
    for (let i = 0; i < Guifdata.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("Electri-SelectTwo").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("Electri-SelectTwo").addEventListener('change', function() {
        let index = document.getElementById("Electri-SelectTwo").selectedIndex
        let GuifContent = document.getElementById("Electri-SelectTwo").options[index].text
    })
}

function ElectricityVague() {
    let Guifdata = ["0.1", '0.2', '0.3', '0.4']
    for (let i = 0; i < Guifdata.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = Guifdata[i]
        document.getElementById("Electri-Select").appendChild(option)
    }
    //获取选中的index，获取到对应的值
    document.getElementById("Electri-Select").addEventListener('change', function() {
        let index = document.getElementById("Electri-Select").selectedIndex
        let GuifContent = document.getElementById("Electri-Select").options[index].text
    })
}

//根据后端数据插入实时数据模块
function GetElectricityState(res) {
    let htmlElectr = "";
    for (let i = 0; i < res.length; i++) {
        htmlElectr +=
            "<div class='Electricity-mind'>" +
            //仪表盘
            "<div class='Dashboard'>" +
            "<div class='DashboardOne'></div>" +
            "<div class='DashboardOne'></div>" +
            "<div class='DashboardOne'></div>" +
            "<div class='DashboardOne'></div>" +
            "<div class='DashboardOne'></div>" +
            "<div class='DashboardOne'></div>" +
            "</div>" +
            //中间区域
            "<div class='ElectricityRealTime-mind'>" +
            "<div>" +
            "<div>" + res[i].pedId + "号电池</div>" +
            "<div>A相电压：<div>" + res[i].pedAvol + "</div>V</div>" +
            "<div>B相电压：<div>" + res[i].pedBvol + "</div>V</div>" +
            "<div>C相电压：<div>" + res[i].pedCvol + "</div>V</div>" +
            "</div>" +
            "<div>" +
            "<div>A相电流：<div>" + res[i].pedAcur + "</div>A</div>" +
            "<div>B相电流：<div>" + res[i].pedBcur + "</div>A</div>" +
            "<div>C相电流：<div>" + res[i].pedCcur + "</div>A</div>" +
            "</div>" +
            "</div>" +
            //尾部区域
            "<div class='ElectricityRealTime-bottom'>" +
            "<div>" +
            "<div><div>AB箱电压：</div><div>" + res[i].pedABvol + "</div>V</div>" +
            "<div><div>BC箱电压：</div><div>" + res[i].pedBCvol + "</div>V</div>" +
            "<div><div>CA箱电压：</div><div>" + res[i].pedCAvol + "</div>V</div>" +
            "<div><div>A箱有功功率：</div><div>" + res[i].pedApap + "</div>Kw</div>" +
            "<div><div>B箱有功功率：</div><div>" + res[i].pedBpap + "</div>Kw</div>" +
            "<div><div>C箱有功功率：</div><div>" + res[i].pedCpap + "</div>Kw</div>" +
            "<div><div>总有功功率：</div><div>" + res[i].pedTpap + "</div>Kw</div>" +
            "<div><div>A箱无功功率：</div><div>" + res[i].pedAprp + "</div>Kvar</div>" +
            "<div><div>B箱无功功率：</div><div>" + res[i].pedBprp + "</div>Kvar</div>" +
            "<div><div>C箱无功功率：</div><div>" + res[i].pedCprp + "</div>Kvar</div>" +
            "<div><div>总无功功率：</div><div>" + res[i].pedTprp + "</div>Kvar</div>" +
            "<div><div>A箱功率因素：</div><div>" + res[i].pedAppf + "</div></div>" +
            "<div><div>B箱功率因素：</div><div>" + res[i].pedBppf + "</div></div>" +
            "<div><div>C箱功率因素：</div><div>" + res[i].pedCppf + "</div></div>" +
            "<div><div>总功率因素：</div><div>" + res[i].pedTppf + "</div></div>" +
            "</div>" +
            "</div>" +
            "</div>"

    }

    let BottomHtml = "<div>1号监控机房</div>"
    document.getElementById("Electricity-bottom").innerHTML = "";
    document.getElementById("Electricity-bottom").insertAdjacentHTML('beforeEnd', BottomHtml);
    document.getElementById("ElectricityRealTime").innerHTML = "";
    document.getElementById("ElectricityRealTime").insertAdjacentHTML('beforeEnd', htmlElectr);
}

//动态插入报警数据
function ElectrConeten() {
    let WaterConetenData = [
        { a: '1', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '2', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '3', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '4', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '5', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '6', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '7', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '8', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '9', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
        { a: '10', b: '180', c: '20', d: '230', e: '32', f: '250', g: '36', h: '19.96', i: '0.5', j: '9.68', k: '2017-08-29 09:46' },
    ]
    let htmlElectr = "";
    for (let i = 0; i < WaterConetenData.length; i++) {
        htmlElectr +=
            "<div class='ElectrContent-details'>" +
            "<div>" + WaterConetenData[i].a + "</div>" +
            "<div>" + WaterConetenData[i].b + "</div>" +
            "<div>" + WaterConetenData[i].c + "</div>" +
            "<div>" + WaterConetenData[i].d + "</div>" +
            "<div>" + WaterConetenData[i].e + "</div>" +
            "<div>" + WaterConetenData[i].f + "</div>" +
            "<div>" + WaterConetenData[i].g + "</div>" +
            "<div>" + WaterConetenData[i].h + "</div>" +
            "<div>" + WaterConetenData[i].i + "</div>" +
            "<div>" + WaterConetenData[i].j + "</div>" +
            "<div>" + WaterConetenData[i].k + "</div>" +
            "</div>"
    }
    document.getElementById("ElectrContent").innerHTML = "";
    document.getElementById("ElectrContent").insertAdjacentHTML('beforeEnd', htmlElectr);
    let record = WaterConetenData.length
    let page = record % 10 == 0 ? (record / 10) : (Math.floor(record / 10) + 1)
    document.getElementById("ElectrPage").innerHTML = 1
    document.getElementById("ElectrRecord").innerHTML = "一共" + page + "页, " + record + "条记录 "
}

//动态插入设备管理
function ElectricityDetails(Name, Parameters) {
    let htmlElectr = "";
    for (let i = 0; i < Parameters.length; i++) {
        htmlElectr +=
            "<div class='ElectricityDetails'>" +
            //右边区域
            "<div class='ElectricityDetailsLeft'>" +
            "<div>" + Parameters[i].pemName + "</div>" +
            "<div>" +
            "<div>" +
            "<div>地址</div>" +
            "<div>所在位置</div>" +
            "<div>设IP端口</div>" +
            "</div>" +
            "<div>" +
            "<div>1</div>" +
            "<div>1号监控机房</div>" +
            "<div>" + Name[i].diAddress + ":" + Name[i].diPort + "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            //中间区域
            "<div class='ElectricityDetailsMiddle'>" +
            //中间title
            "<div>" +
            "<div>参数名称</div>" +
            "<div>上限</div>" +
            "<div>下限</div>" +
            "<div>参数名称</div>" +
            "<div>上限</div>" +
            "<div>下限</div>" +
            "<div>参数名称</div>" +
            "<div>上限</div>" +
            "<div>下限</div>" +
            "</div>" +
            //中间内容区
            "<div>" +
            "<div>" +
            "<div>A箱电压</div>" +
            "<div>" + Parameters[i].pemMaxAvol + "</div>" +
            "<div>" + Parameters[i].pemMinAvol + "</div>" +
            "<div>B箱电压</div>" +
            "<div>" + Parameters[i].pemMaxBvol + "</div>" +
            "<div>" + Parameters[i].pemMinBvol + "</div>" +
            "<div>C箱电压</div>" +
            "<div>" + Parameters[i].pemMaxCvol + "</div>" +
            "<div>" + Parameters[i].pemMinCvol + "</div>" +
            "</div>" +
            "<div>" +
            "<div>A箱电流</div>" +
            "<div>" + Parameters[i].pemMaxAcur + "</div>" +
            "<div>" + Parameters[i].pemMinAcur + "</div>" +
            "<div>B箱电流</div>" +
            "<div>" + Parameters[i].pemMaxBcur + "</div>" +
            "<div>" + Parameters[i].pemMinBcur + "</div>" +
            "<div>C箱电流</div>" +
            "<div>" + Parameters[i].pemMaxCcur + "</div>" +
            "<div>" + Parameters[i].pemMinCcur + "</div>" +
            "</div>" +
            "<div>" +
            "<div>AB箱电压</div>" +
            "<div>" + Parameters[i].pemMaxABvol + "</div>" +
            "<div>" + Parameters[i].pemMinABvol + "</div>" +
            "<div>BC箱电压</div>" +
            "<div>" + Parameters[i].pemMaxBCvol + "</div>" +
            "<div>" + Parameters[i].pemMinBCvol + "</div>" +
            "<div>CA箱电压</div>" +
            "<div>" + Parameters[i].pemMaxCAvol + "</div>" +
            "<div>" + Parameters[i].pemMinCAvol + "</div>" +
            "</div>" +
            "<div>" +
            "<div>A箱有功功率</div>" +
            "<div>" + Parameters[i].pemMaxApap + "</div>" +
            "<div>" + Parameters[i].pemMinApap + "</div>" +
            "<div>B箱有功功率</div>" +
            "<div>" + Parameters[i].pemMaxBpap + "</div>" +
            "<div>" + Parameters[i].pemMinBpap + "</div>" +
            "<div>C箱有功功率</div>" +
            "<div>" + Parameters[i].pemMaxCpap + "</div>" +
            "<div>" + Parameters[i].pemMinCpap + "</div>" +
            "</div>" +
            "<div>" +
            "<div>A箱无功功率</div>" +
            "<div>" + Parameters[i].pemMaxAprp + "</div>" +
            "<div>" + Parameters[i].pemMinAprp + "</div>" +
            "<div>B箱无功功率</div>" +
            "<div>" + Parameters[i].pemMaxBprp + "</div>" +
            "<div>" + Parameters[i].pemMinBprp + "</div>" +
            "<div>C箱无功功率</div>" +
            "<div>" + Parameters[i].pemMaxCprp + "</div>" +
            "<div>" + Parameters[i].pemMinCprp + "</div>" +
            "</div>" +
            "<div>" +
            "<div>A箱功率因素</div>" +
            "<div>" + Parameters[i].pemMaxAppf + "</div>" +
            "<div>" + Parameters[i].pemMinAppf + "</div>" +
            "<div>B箱功率因素</div>" +
            "<div>" + Parameters[i].pemMaxBppf + "</div>" +
            "<div>" + Parameters[i].pemMinBppf + "</div>" +
            "<div>C箱功率因素</div>" +
            "<div>" + Parameters[i].pemMaxCppf + "</div>" +
            "<div>" + Parameters[i].pemMinCppf + "</div>" +
            "</div>" +
            "<div>" +
            "<div>总有功功率</div>" +
            "<div>" + Parameters[i].pemMaxTpap + "</div>" +
            "<div>" + Parameters[i].pemMinTpap + "</div>" +
            "<div>总无功功率</div>" +
            "<div>" + Parameters[i].pemMaxTprp + "</div>" +
            "<div>" + Parameters[i].pemMinTprp + "</div>" +
            "<div>总功率因素</div>" +
            "<div>" + Parameters[i].pemMaxTppf + "</div>" +
            "<div>" + Parameters[i].pemMinTppf + "</div>" +
            "</div>" +
            "</div>" +
            "</div>" +
            //右边区域
            "<div class='ElectricityDetailsRight'>" +
            "<div class='ElectricityDetailsUp'>更新</div>" +
            "<div class='ElectricityDetailsDelete'>删除</div>" +
            "</div>" +
            "</div>"

    }
    document.getElementById("ElectricityDeviceList").innerHTML = "";
    document.getElementById("ElectricityDeviceList").insertAdjacentHTML('beforeEnd', htmlElectr);
    ElectricityDetailsUp(Name, Parameters)
}

//修改功能
function ElectricityDetailsUp(Name, Parameters) {

    let mainLeft = document.getElementById('ElectricityDeviceList')
    let div = mainLeft.getElementsByClassName('ElectricityDetailsUp') //更新
    let DeleteDiv = mainLeft.getElementsByClassName("ElectricityDetailsDelete") //删除

    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        let DeleteDivChild = DeleteDiv[i]
        DeleteDivChild.index = i
        divChild.index = i;
        divChild.onclick = function() {
            GetElectricitDeviceM(this.index, Name[this.index], Parameters[this.index])
            document.getElementById("ElectricityChange-bg").style.display = "block"
        }
        DeleteDivChild.onclick = function() {
            alert(this.index)
        }
    }

    document.getElementById("ElectricityChange-Clone").onclick = function() {
        document.getElementById("ElectricityChange-bg").style.display = "none"
    }
}

//获取电量仪实时数据
function GetElectricity() {
    AJAX('GET', 'software/electricmeter/findElectricmeterDataAll', '', true, function(res) {
        if (typeof res == "object") {
            GetElectricityState(res)
            NewDashboards(res)
        }
    })
}

//获取电量仪设备参数
function GetElectricityParameters() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/electricmeter/findElectricmeterAll', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}

//获取设备名称
function GetElectricityName() {
    return new Promise(function(resolve) {
        AJAX('GET', 'software/electricmeter/findElectricmeterDeviceIp', '', true, function(res) {
            if (typeof res == "object") {
                resolve(res)
            }
        })
    })
}
//获取设备管理全部的数据后执行方法
function GetElectricityAll() {
    Promise.all([GetElectricityName(), GetElectricityParameters()]).then(function(res) {
        ElectricityDetails(res[0], res[1])
    })
}


//获取ip信息
function GetIPElectricit() {
    let address = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    let state = document.getElementById("ElectricityBg-state")
    let AddressHtml = ''
    for (let i = 0; i < address.length; i++) {
        AddressHtml +=
            "<option>" + address[i] + "</option>",
            state.children[0].children[0].children[1].innerHTML = ''
        state.children[0].children[0].children[1].insertAdjacentHTML("beforeend", AddressHtml)
    }

    //获取ip信息
    AJAX('GET', 'software/electricmeter/findElectricmeterDeviceIp', '', true, function(res) {
        if (typeof res == "object") {
            let AddressHtml = ''

            for (let p = 0; p < res.length; p++) {
                AddressHtml +=
                    "<option>" + res[p].diAddress + ":" + res[p].diPort + "</option>",
                    state.children[0].children[8].children[1].innerHTML = ''
                state.children[0].children[8].children[1].insertAdjacentHTML("beforeend", AddressHtml)
            }
            //新增设备点击提交事件
            document.getElementById("ElectricityBg-Add").onclick = function() {
                AddElectricit()
            }
        }
    })
}


//点击添加,获取到添加的信息
function AddElectricit() {
    let state = document.getElementById("ElectricityBg-state")

    //A箱
    let AddressIndex = state.children[0].children[0].children[1].selectedIndex
    let Address = state.children[0].children[0].children[1].children[AddressIndex].innerHTML //设备地址
    let pemMaxAvol = state.children[0].children[1].children[1].value //A箱电压上限
    let pemMinAvol = state.children[0].children[1].children[2].value //A箱电压下限
    let pemMaxAcur = state.children[0].children[2].children[1].value //A相电流上限
    let pemMinAcur = state.children[0].children[2].children[2].value //A相电流下限
    let pemMaxABvol = state.children[0].children[3].children[1].value //AB相电压上限
    let pemMinABvol = state.children[0].children[3].children[2].value //AB相电压下限
    let pemMaxApap = state.children[0].children[4].children[1].value //A相有功功率上限
    let pemMinApap = state.children[0].children[4].children[2].value //A相有功功率下限
    let pemMaxAprp = state.children[0].children[5].children[1].value //A相无功功率上限
    let pemMinAprp = state.children[0].children[5].children[2].value //A相无功功率下限
    let pemMaxAppf = state.children[0].children[6].children[1].value //A相功率因素上限
    let pemMinAppf = state.children[0].children[6].children[2].value //A相功率因素下限
    let pemMaxTpap = state.children[0].children[7].children[1].value //总有功功率上限
    let pemMinTpap = state.children[0].children[7].children[2].value //总有功功率下限
    let IPIndex = state.children[0].children[8].children[1].selectedIndex
    let IP = state.children[0].children[8].children[1].children[IPIndex].innerHTML //IP


    //B箱
    let position = state.children[1].children[0].children[1].value //所在位置
    let pemMaxBvol = state.children[1].children[1].children[1].value //	B相电压上限
    let pemMinBvol = state.children[1].children[1].children[2].value //	B相电压下限
    let pemMaxBcur = state.children[1].children[2].children[1].value //	B相电流上限
    let pemMinBcur = state.children[1].children[2].children[2].value // B相电流下限
    let pemMaxBCvol = state.children[1].children[3].children[1].value //BC相电压上限
    let pemMinBCvol = state.children[1].children[3].children[2].value //BC相电压下限
    let pemMaxBpap = state.children[1].children[4].children[1].value //B相有功功率上限
    let pemMinBpap = state.children[1].children[4].children[2].value //B相有功功率下限
    let pemMaxBprp = state.children[1].children[5].children[1].value //B相无功功率上限
    let pemMinBprp = state.children[1].children[5].children[2].value //B相无功功率下限
    let pemMaxBppf = state.children[1].children[6].children[1].value //	B相功率因素上限
    let pemMinBppf = state.children[1].children[6].children[2].value //B相功率因素下限
    let pemMaxTprp = state.children[1].children[7].children[1].value //	总无功功率上限
    let pemMinTprp = state.children[1].children[7].children[2].value //	总无功功率下限



    //C箱
    let equipmentNaem = state.children[2].children[0].children[1].value //设备名称
    let pemMaxCvol = state.children[2].children[1].children[1].value //	C相电压上限
    let pemMinCvol = state.children[2].children[1].children[2].value //	C相电压下限
    let pemMaxCcur = state.children[2].children[2].children[1].value //	C相电流上限
    let pemMinCcur = state.children[2].children[2].children[2].value // C相电流下限
    let pemMaxCAvol = state.children[2].children[3].children[1].value //CA相电压上限
    let pemMinCAvol = state.children[2].children[3].children[2].value //CA相电压下限
    let pemMaxCpap = state.children[2].children[4].children[1].value //C相有功功率上限
    let pemMinCpap = state.children[2].children[4].children[2].value //	C相有功功率下限
    let pemMaxCprp = state.children[2].children[5].children[1].value // C相无功功率上限
    let pemMinCprp = state.children[2].children[5].children[2].value //	C相无功功率下限
    let pemMaxCppf = state.children[2].children[6].children[1].value // C相功率因素上限
    let pemMinCppf = state.children[2].children[6].children[2].value //	C相功率因素下限
    let pemMaxTppf = state.children[2].children[7].children[1].value // 总功率因素上限
    let pemMinTppf = state.children[2].children[7].children[2].value //	总功率因素下限

    document.getElementById("Electricity-bg").style.display = "none"
}

//获取修改的信息
function GetElectricitDeviceM(index, Name, Parameters) {
    console.log(Name);
    console.log(Parameters);
    let state = document.getElementById("ElectricityBg-UpState")

    //A箱
    state.children[0].children[0].children[1].value = "字段不明确" //设备地址
    state.children[0].children[1].children[1].value = Parameters.pemMaxAvol //A箱电压上限
    state.children[0].children[1].children[2].value = Parameters.pemMinAvol //A箱电压下限
    state.children[0].children[2].children[1].value = Parameters.pemMaxAvol //A相电流上限
    state.children[0].children[2].children[2].value = Parameters.pemMinAcur //A相电流下限
    state.children[0].children[3].children[1].value = Parameters.pemMaxABvol //AB相电压上限
    state.children[0].children[3].children[2].value = Parameters.pemMinABvol //AB相电压下限
    state.children[0].children[4].children[1].value = Parameters.pemMaxApap //A相有功功率上限
    state.children[0].children[4].children[2].value = Parameters.pemMinApap //A相有功功率下限
    state.children[0].children[5].children[1].value = Parameters.pemMaxAprp //A相无功功率上限
    state.children[0].children[5].children[2].value = Parameters.pemMinAprp //A相无功功率下限
    state.children[0].children[6].children[1].value = Parameters.pemMaxAppf //A相功率因素上限
    state.children[0].children[6].children[2].value = Parameters.pemMinAppf //A相功率因素下限
    state.children[0].children[7].children[1].value = Parameters.pemMaxTpap //总有功功率上限
    state.children[0].children[7].children[2].value = Parameters.pemMinTpap //总有功功率下限
    state.children[0].children[8].children[1].value = Name.diAddress + ":" + Name.diPort //IP


    //B箱
    state.children[1].children[0].children[1].value = "字段不明确" //所在位置
    state.children[1].children[1].children[1].value = Parameters.pemMaxBvol //	B相电压上限
    state.children[1].children[1].children[2].value = Parameters.pemMinBvol //	B相电压下限
    state.children[1].children[2].children[1].value = Parameters.pemMaxBcur //	B相电流上限
    state.children[1].children[2].children[2].value = Parameters.pemMinBcur // B相电流下限
    state.children[1].children[3].children[1].value = Parameters.pemMaxBCvol //BC相电压上限
    state.children[1].children[3].children[2].value = Parameters.pemMinBCvol //BC相电压下限
    state.children[1].children[4].children[1].value = Parameters.pemMaxBpap //B相有功功率上限
    state.children[1].children[4].children[2].value = Parameters.pemMinBpap //B相有功功率下限
    state.children[1].children[5].children[1].value = Parameters.pemMaxBprp //B相无功功率上限
    state.children[1].children[5].children[2].value = Parameters.pemMinBprp //B相无功功率下限
    state.children[1].children[6].children[1].value = Parameters.pemMaxBppf //	B相功率因素上限
    state.children[1].children[6].children[2].value = Parameters.pemMinBppf //B相功率因素下限
    state.children[1].children[7].children[1].value = Parameters.pemMaxTprp //	总无功功率上限
    state.children[1].children[7].children[2].value = Parameters.pemMinTprp //	总无功功率下限



    //C箱
    state.children[2].children[0].children[1].value = Parameters.pemName //设备名称
    state.children[2].children[1].children[1].value = Parameters.pemMaxBvol //	C相电压上限
    state.children[2].children[1].children[2].value = Parameters.pemMinBvol //	C相电压下限
    state.children[2].children[2].children[1].value = Parameters.pemMaxBcur //	C相电流上限
    state.children[2].children[2].children[2].value = Parameters.pemMinBcur // C相电流下限
    state.children[2].children[3].children[1].value = Parameters.pemMaxBCvol //CA相电压上限
    state.children[2].children[3].children[2].value = Parameters.pemMinBCvol //CA相电压下限
    state.children[2].children[4].children[1].value = Parameters.pemMaxBpap //C相有功功率上限
    state.children[2].children[4].children[2].value = Parameters.pemMinBpap //	C相有功功率下限
    state.children[2].children[5].children[1].value = Parameters.pemMaxBprp // C相无功功率上限
    state.children[2].children[5].children[2].value = Parameters.pemMinBprp //	C相无功功率下限
    state.children[2].children[6].children[1].value = Parameters.pemMaxBppf // C相功率因素上限
    state.children[2].children[6].children[2].value = Parameters.pemMinBppf //	C相功率因素下限
    state.children[2].children[7].children[1].value = Parameters.pemMaxTprp // 总功率因素上限
    state.children[2].children[7].children[2].value = Parameters.pemMinTprp //	总功率因素下限
    pemMinCcur = 2;
}
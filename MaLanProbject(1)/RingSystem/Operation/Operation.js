var operations = document.getElementById('operations'); // 运维监控 
var Bg = document.getElementById('bg') //位置设置遮掩层
var ChangeBg = document.getElementById("ChangeBg") //位置设置修改遮掩层
var WaringBg = document.getElementById('waring-bg') //报警设置遮掩层
var clonse = document.getElementById("clonse") //位置设置关闭遮掩层
var WaringBaCline = document.getElementById("WaringBaCline") //报警设置遮掩层
var IpBg = document.getElementById("ip-bg") //ip遮掩层
var CloneAddIp = document.getElementById("CloneAddIp") //关闭ip添加设备
var changeIpBg = document.getElementById("changeIp-bg") //ip修改遮掩层
var CloneChangeIp = document.getElementById("CloneChangeIp") //ip关闭修改遮掩层
var EightBg = document.getElementById("eight-bg") //8052模块添加设备遮掩层
var EigAddClone = document.getElementById("eigAdd-clone") //关闭8052模块的添加遮掩层
var EigChangeBg = document.getElementById("EigChange-bg") //8052模块修改遮掩层
var EigCloneBg = document.getElementById("EigClone-bg") //关闭8052模块的修改遮掩层
var ClonseChange = document.getElementById("ClonseChange") //关闭位置设置的遮掩层



//默认选中
operations.style.borderBottom = '0.5vh solid #FFF';

window.onload = function() {
    HeaderSwitch() //切换模块
    PositionChangePage() //切换页面
    PositionFun() //显示默认页面
    clonebg() //关闭遮掩层
}

document.getElementById("position-header").addEventListener("click", function() {
    Bg.style.display = "block"; //点击页面出现遮罩层
})

document.getElementById("Eight-header").addEventListener("click", function() {
    EightBg.style.display = "block"
})

//关闭遮掩层
function clonebg() {
    const Typebg = new Map([
        [0, [ClonseChange, ChangeBg]],
        [1, [clonse, Bg]],
        [2, [CloneAddIp, IpBg]],
        [3, [WaringBaCline, WaringBg]],
        [4, [CloneChangeIp, changeIpBg]],
        [5, [EigAddClone, EightBg]],
        [6, [EigCloneBg, EigChangeBg]]
    ])
    Typebg.forEach(function(item, key, mapobj) {
        item[0].onclick = function() {
            item[1].style.display = "none"
        }
    })
}

function a() { console.log(1); }

function b() { console.log(1); }

var number = 2
    //切换
function PositionChangePage() {
    const TypePosition = new Map([
        [0, ['position-conten', PositionFun, a]],
        [1, ['positionWarring', AlarmSettingsFun, AlarmPageFun]],
        [2, ['IP', IpFun, PageFun]],
        [3, ['eight-two', EightModuleFun, PageFunss]]
    ])
    let ElectrChange = document.getElementById("right-title")
    let h = ElectrChange.getElementsByTagName("h5")
    for (let i = 0; i < h.length; i++) {
        let divChild = h[i];
        divChild.index = i;
        divChild.onclick = function() {
            number = this.index
            ElectrChange.children[this.index].style.color = "#FFFFFF"
            document.getElementById(TypePosition.get(this.index)[0]).style.display = "block"
            for (let i = 0; i < h.length; i++) {
                if (i !== this.index) {
                    ElectrChange.children[i].style.color = "#888"
                    document.getElementById(TypePosition.get(i)[0]).style.display = "none"
                }
            }
            let TypePositionPage = TypePosition.get(this.index)
                // TypePositionPage[1]()
            TypePositionPage[2]()
        }
    }
}
//运维监控中内容的列表
function PositionList(CurrentNumber, ListId, ListClass, Bg) {
    let CurrentBg = new Map([
        [0, PositionAllContentBg],
        [1, WaringContentBg],
        [2, IpAllcontentBg],
        [3, EignthAllcontentbg]
    ])
    let mainLeft = document.getElementById(ListId)
    let div = mainLeft.getElementsByClassName(ListClass)
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        divChild.index = i;
        divChild.addEventListener("click", function() {
            CurrentBg.get(CurrentNumber).call(this, ListId)
            Bg.style.display = "block"
        })
    }
}


//报警设置遮掩层中input默认值
var WaringContentBg = function(ListId) {
    let content = document.getElementById(ListId).children[this.index]
    document.getElementById("WaringBg-middle").children[0].children[0].value = content.children[0].innerHTML
    document.getElementById("WaringBg-middle").children[1].children[0].value = content.children[1].innerHTML
    document.getElementById("WaringBg-middle").children[2].children[0].value = content.children[2].innerHTML
    document.getElementById("WaringBg-middle").children[3].children[0].value = content.children[3].innerHTML
    document.getElementById("WaringBg-middle").children[4].children[0].value = content.children[6].innerHTML
}

function pagecurrent(total, id) {
    $(id).zPager({
        totalData: total,
        htmlBox: $('#wraper'),
        btnShow: true,
        ajaxSetData: false
    });
}

function currentPage(currentPage) {
    const PageFunsss = new Map([
        [0, [a, 10]],
        [1, [AlarmSettingsFun, 10]],
        [2, [IpFun, 10]],
        [3, [EightModuleFun, 0]]
    ])
    if (typeof currentPage !== "undefined") {
        console.log(number + "------------");
        PageFunsss.get(number)[0](currentPage)
    }
}
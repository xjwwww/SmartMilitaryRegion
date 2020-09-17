//新风机
function FreshAirFanFun() {

    Environmental.FreshAirFan.style.display = "block"
    AddFreshAirFanFun()
}


//动态插入新风机
function AddFreshAirFanFun() {
    let htmlstr = ""
    for (let i = 0; i < 8; i++) {
        htmlstr +=
            "<div class='FreshAirFan-details'>" +
            "<div>" + i + "号新风机</div>" +
            "<div>" +
            "<div>通道</div>" +
            "<div>状态</div>" +
            "<div>操作</div>" +
            "</div>" +
            "<div>" +
            "<div>PL1</div>" +
            "<div><div>已开</div></div>" +
            "<div><div>打开</div></div>" +
            "</div>" +
            "</div>"
    }
    document.getElementById("FreshAirFanList").innerHTML = "";
    document.getElementById("FreshAirFanList").insertAdjacentHTML('beforeEnd', htmlstr);
}
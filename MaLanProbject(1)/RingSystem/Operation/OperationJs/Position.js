function PositionFun() {
    PositionAllContent()
        // pagecurrent()
    Position()
}
// pagecurrent(13, "#PositionPager")

PositionAllContent = function() {
    let PositionData = [
        { a: '1', b: '1号监控机房' },
        { a: '2', b: '2号监控机房' },
        { a: '3', b: '1号监控机房' },
        { a: '4', b: '2号监控机房' },
        { a: '5', b: '1号监控机房' },
        { a: '6', b: '2号监控机房' },
        { a: '7', b: '1号监控机房' },
        { a: '8', b: '2号监控机房' },
        { a: '9', b: '1号监控机房' },
        { a: '10', b: '2号监控机房' },
    ]
    let htmlstr = ''
    for (let i = 0; i < PositionData.length; i++) {
        htmlstr += "<div class='position-content'>" +
            "<h5>" + PositionData[i].a + "</h5>" +
            "<h5>" + PositionData[i].b + "</h5>" +
            "<h5>" +
            "<div class='position-up'>更新</div>" +
            "</h5>" +
            "<h5>" +
            "<div>删除</div>" +
            "</h5>" +
            "</div>"
    }
    document.getElementById("position-AllContent").innerHTML = ''
    document.getElementById("position-AllContent").insertAdjacentHTML('beforeEnd', htmlstr)
}

function Position() {
    let mainLeft = document.getElementById('position-AllContent')
    let div = mainLeft.getElementsByClassName('position-up')
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        divChild.index = i;
        divChild.addEventListener("click", function() {
            let content = document.getElementById('position-AllContent').children[this.index]
            let a = document.getElementById('ChangeBgLocation').value = content.children[1].innerHTML
            ChangeBg.style.display = "block"
        })
    }

    //添加按钮
    document.getElementById("bg-add").onclick = function() {
        console.log("等接口！--1");
    }

    //修改按钮
    document.getElementById('ChangeBg-Posit').onclick = function() {
        console.log("等接口----2");
    }

}
//头部切换页面的公共方法
function HeaderSwitch() {
    let mainBox = document.getElementById("middleBox")
    let div = mainBox.getElementsByTagName("div")
    for (let i = 0; i < div.length; i++) {
        let divChild = div[i];
        divChild.index = i;
        divChild.onclick = function() {
            switch (this.index) {
                case 3:
                    window.location.href = './Operation.html'
                    break;
                case 0:
                    window.location.href = './ringSystem.html'
                    break;
                case 2:
                    window.location.href = './SecuritySystem.html'
                    break;
                default:
                    alert("暂无设计图")
            }
        }
    }
}
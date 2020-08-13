//地图系统对应的摄像头
let FourthFloorCameras = {

    //四楼视频ID
    fourthOneRoom: document.getElementById('FourthOneRoom'),
    fourthTwoRoom: document.getElementById('FourthTwoRoom'),
    fourthThreeRoom: document.getElementById('FourthThreeRoom'),
    fourthFourRoom: document.getElementById('FourthFourRoom'),
    fourthFiveRoom: document.getElementById('FourthFiveRoom'),
    fourthSixRoom: document.getElementById('FourthSixRoom'),
}

//<-------------地图系统对应的摄像头点击事件------------->
//四楼摄像头事件
FourthFloorCameras.fourthOneRoom.addEventListener("click", function() { GetVoid(4, 1) })
FourthFloorCameras.fourthTwoRoom.addEventListener("click", function() { GetVoid(4, 2) })
FourthFloorCameras.fourthThreeRoom.addEventListener("click", function() { GetVoid(4, 3) })
FourthFloorCameras.fourthFourRoom.addEventListener("click", function() { GetVoid(4, 4) })
FourthFloorCameras.fourthFiveRoom.addEventListener("click", function() { GetVoid(4, 5) })
FourthFloorCameras.fourthSixRoom.addEventListener("click", function() { GetVoid(4, 6) })

//请求视频方法
function GetVoid(floor, roomNumber) {
    AJAX('GET', "ktr-ml/sheXiangou" + "/" + floor + "/" + roomNumber, '', true, function(res) {
        console.log(res);
    })
}
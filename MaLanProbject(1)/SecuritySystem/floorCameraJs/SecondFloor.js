//地图系统对应的摄像头
let SecondFloorCameras = {

    //二楼视频ID
    secondOneRoom: document.getElementById('SecondOneRoom'),
    secondTwoRoom: document.getElementById('SecondTwoRoom'),
    secondThreeRoom: document.getElementById('SecondThreeRoom'),
    secondFourRoom: document.getElementById('SecondFourRoom'),
    secondFiveRoom: document.getElementById('SecondFiveRoom'),
    secondSixRoom: document.getElementById('SecondSixRoom'),
    secondSevenRoom: document.getElementById('SecondSevenRoom'),
    secondEightRoom: document.getElementById('SecondEightRoom'),
}

//<-------------地图系统对应的摄像头点击事件------------->
//二楼摄像头事件
SecondFloorCameras.secondOneRoom.addEventListener("click", function() { GetVoid(2, 1) })
SecondFloorCameras.secondTwoRoom.addEventListener("click", function() { GetVoid(2, 2) })
SecondFloorCameras.secondThreeRoom.addEventListener("click", function() { GetVoid(2, 3) })
SecondFloorCameras.secondFourRoom.addEventListener("click", function() { GetVoid(2, 4) })
SecondFloorCameras.secondFiveRoom.addEventListener("click", function() { GetVoid(2, 5) })
SecondFloorCameras.secondSixRoom.addEventListener("click", function() { GetVoid(2, 6) })
SecondFloorCameras.secondSevenRoom.addEventListener("click", function() { GetVoid(2, 7) })
SecondFloorCameras.secondEightRoom.addEventListener("click", function() { GetVoid(2, 8) })

//请求视频方法
function GetVoid(floor, roomNumber) {
    var data = {
        floor: floor,
        roomNumber: roomNumber
    }
    AJAX('GET', "http://192.168.1.42:8080/ktr-ml/sheXiangou" + "/" + floor + "/" + roomNumber, '', true, function(res) {
        console.log(res);
    })
}
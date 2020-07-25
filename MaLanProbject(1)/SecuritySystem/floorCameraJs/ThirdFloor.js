//地图系统对应的摄像头
let ThirdFloorCameras = {

    //三楼视频ID
    thirdOneRoom: document.getElementById('ThirdOneRoom'),
    thirdTwoRoom: document.getElementById('ThirdTwoRoom'),
    thirdThreeRoom: document.getElementById('ThirdThreeRoom'),
    thirdFourRoom: document.getElementById('ThirdFourRoom'),
    thirdFiveRoom: document.getElementById('ThirdFiveRoom'),
    thirdSixRoom: document.getElementById('ThirdSixRoom'),
    thirdSevenRoom: document.getElementById('ThirdSevenRoom'),
    thirdEightRoom: document.getElementById('ThirdEightRoom'),
    thirdNineRoom: document.getElementById('ThirdNineRoom'),
    thirdTenRoom: document.getElementById('ThirdTenRoom'),
}

//<-------------地图系统对应的摄像头点击事件------------->
//三楼摄像头事件
ThirdFloorCameras.thirdOneRoom.addEventListener("click", function() { GetVoid(3, 1) })
ThirdFloorCameras.thirdTwoRoom.addEventListener("click", function() { GetVoid(3, 2) })
ThirdFloorCameras.thirdThreeRoom.addEventListener("click", function() { GetVoid(3, 3) })
ThirdFloorCameras.thirdFourRoom.addEventListener("click", function() { GetVoid(3, 4) })
ThirdFloorCameras.thirdFiveRoom.addEventListener("click", function() { GetVoid(3, 5) })
ThirdFloorCameras.thirdSixRoom.addEventListener("click", function() { GetVoid(3, 6) })
ThirdFloorCameras.thirdSevenRoom.addEventListener("click", function() { GetVoid(3, 7) })
ThirdFloorCameras.thirdEightRoom.addEventListener("click", function() { GetVoid(3, 8) })
ThirdFloorCameras.thirdNineRoom.addEventListener("click", function() { GetVoid(3, 9) })
ThirdFloorCameras.thirdTenRoom.addEventListener("click", function() { GetVoid(3, 10) })

//请求视频方法
function GetVoid(floor, roomNumber) {
    var data = {
        floor: floor,
        roomNumber: roomNumber
    }
    console.log(data)
    AJAX('GET', "http://192.168.1.42:8080/ktr-ml/sheXiangou" + "/" + floor + "/" + roomNumber, '', true, function(res) {
        console.log(res);
    })
}
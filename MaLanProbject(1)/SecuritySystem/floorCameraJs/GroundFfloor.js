//地图系统对应的摄像头
let MapsyStemCamera = {

    //一楼视频ID
    firstOneRoom: document.getElementById('FirstOneRoom'),
    firstTwoRoom: document.getElementById('FirstTwoRoom'),
    firstThreeRoom: document.getElementById('FirstThreeRoom'),
    firstFourRoom: document.getElementById('FirstFourRoom'),
    firstFiveRoom: document.getElementById('FirstFiveRoom'),
    firstSixRoom: document.getElementById('FirstSixRoom'),
    firstSevenRoom: document.getElementById('FirstSevenRoom'),
    firstEightRoom: document.getElementById('FirstEightRoom'),
    firstNineRoom: document.getElementById('FirstNineRoom'),
    firstTenRoom: document.getElementById('FirstTenRoom'),
}

//<-------------地图系统对应的摄像头点击事件------------->
//一楼摄像头事件
MapsyStemCamera.firstOneRoom.addEventListener("click", function() { GetVoid(1, 1) })
MapsyStemCamera.firstTwoRoom.addEventListener("click", function() { GetVoid(1, 2) })
MapsyStemCamera.firstThreeRoom.addEventListener("click", function() { GetVoid(1, 3) })
MapsyStemCamera.firstFourRoom.addEventListener("click", function() { GetVoid(1, 4) })
MapsyStemCamera.firstFiveRoom.addEventListener("click", function() { GetVoid(1, 5) })
MapsyStemCamera.firstSixRoom.addEventListener("click", function() { GetVoid(1, 6) })
MapsyStemCamera.firstSevenRoom.addEventListener("click", function() { GetVoid(1, 7) })
MapsyStemCamera.firstEightRoom.addEventListener("click", function() { GetVoid(1, 8) })
MapsyStemCamera.firstNineRoom.addEventListener("click", function() { GetVoid(1, 9) })
MapsyStemCamera.firstTenRoom.addEventListener("click", function() { GetVoid(1, 10) })

//请求视频方法
function GetVoid(floor, roomNumber) {
    AJAX('GET', "ktr-ml/sheXiangou" + "/" + floor + "/" + roomNumber, '', true, function(res) {
        console.log(res);
    })
}
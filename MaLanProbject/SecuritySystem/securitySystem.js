
let DomNodeObj = {
    middleBox: document.getElementById('middleBox'),
    mapSystem: document.getElementById('mapSystem'), // 地图系统
    entranceGuard: document.getElementById('entranceGuard'), // 门禁系统
    video: document.getElementById('video'), // 视频监控
    
    // 楼层
    leftBox: document.getElementById('leftBox'),
    oneTower: document.getElementById('oneTower'),
    twoTower: document.getElementById('twoTower'),
    threeTower: document.getElementById('threeTower'),
    fourTower: document.getElementById('fourTower'),

    // 3D图
    oneMap: document.getElementById('oneMap'),
    twoMap: document.getElementById('twoMap'),
    threeMap: document.getElementById('threeMap'),
    fourMap: document.getElementById('fourMap'),

    mapbox: document.getElementById('mapbox'), // 地图系统内容
    videoBox: document.getElementById('videoBox'), // 视频监控内容

    management: document.getElementById('management'), // 管理
    notice: document.getElementById('notice') // 通知
}

var videoNum = 0;

let FuncObj = {
    // 导航栏标题 bottom 状态方法及内容切换
    bottomStateJump: function(){
        for(let i = 0; i < middleBox.children.length; i++){
            DomNodeObj.middleBox.children[i].style.borderBottom = '';
        }
        this.style.borderBottom = '0.6vh solid #FFF';

        if(this.id == 'mapSystem'){
            mapbox.style.display = 'block';
            videoBox.style.display = 'none';

        }else if(this.id == 'entranceGuard'){
            alert('门禁系统没有设计图，还没有做!')

        }else if(this.id == 'video'){
            videoNum = 1;
            console.log('47---'+videoNum)
            mapbox.style.display = 'none';
            videoBox.style.display = 'block';
            VideoPlugin();
        }
    },

    // 点击楼层切换 3D 图
    changeThreeDMap: function(){
        // 取消所有楼层的选中状态
        for(let i = 0; i < DomNodeObj.leftBox.children.length; i++){
            DomNodeObj.leftBox.children[i].style.background = '';
        }
        this.style.background = 'rgba(255, 255, 255, 0.3)';

        var num = this.id.search('Tower'); // 获取Tower 的开始位置; this.id，如: oneTower
        var temp = this.id.slice(0, num) + 'Map'; // 拼接成，如: oneMap; 

        // 隐藏所有 3D 图
        for(let i = 1; i < mapbox.children.length-1; i++){
            mapbox.children[i].style.display = 'none';
        }
        // 显示点击对应楼层的 3D 图
        DomNodeObj[temp].style.display = 'block';

    }
}

// 默认导航栏 bottom 选中状态
DomNodeObj.mapSystem.style.borderBottom = '0.6vh solid #FFF';
// 默认显示地图系统内容
DomNodeObj.mapSystem.style.display = 'block';

// 地图系统默认显示三楼选中
DomNodeObj.threeTower.style.background = 'rgba(255, 255, 255, 0.3)';
// 地图系统默认显示三楼 3D 图
DomNodeObj.threeMap.style.display = 'block';


// 地图系统和门禁系统 bottom 状态和跳转
DomNodeObj.mapSystem.addEventListener('click', FuncObj.bottomStateJump);
DomNodeObj.entranceGuard.addEventListener('click', FuncObj.bottomStateJump);
DomNodeObj.video.addEventListener('click', FuncObj.bottomStateJump);

// 选择楼层
DomNodeObj.oneTower.addEventListener('click', FuncObj.changeThreeDMap)
DomNodeObj.twoTower.addEventListener('click', FuncObj.changeThreeDMap)
DomNodeObj.threeTower.addEventListener('click', FuncObj.changeThreeDMap)
DomNodeObj.fourTower.addEventListener('click', FuncObj.changeThreeDMap)

// 管理和通知---没有设计图，还没有做
management.onclick = function(){
    alert('管理---没有设计图，还没有做')
}
notice.onclick = function(){
    alert('通知---没有设计图，还没有做')
}

// ------------------- 处理海康威视插件视频窗口 --------------------
// 查看监控视频
VideoPlugin();

// 点击停止预览
document.getElementById('stopPreview').addEventListener('click', function(){
    stopPreview();
});

// 即将离开当前页面（刷新或关闭）时，退出设备
window.onbeforeunload = function(){
    WebVideoCtrl.I_Logout('192.168.1.65_80');
    console.log('退出设备成功')
    
    // alert('退出设备成功');
}

// 一键预览全部
// function OneClickStartPreview(){}

// 一键停止预览
// function OneClickStoPreview(){}

// 停止预览
function stopPreview(){
    WebVideoCtrl.I_Stop({
        success: function(){
            console.log('停止预览成功');
        },
        error: function(){
            console.log('停止预览失败');
        }
    })
}

// 查看监控视频
function VideoPlugin(){
    // 检查插件是否安装
    var iRet = WebVideoCtrl.I_CheckPluginInstall();
    // 检查插件是否已安装（包含 Chrome 版本检查）
    if (iRet === -1) {
        alert("您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！")
        return
    }

    // 插件初始化
    WebVideoCtrl.I_InitPlugin(820, 495, {
        iWndowType: 4, //分屏类型：1- 1*1，2- 2*2，3- 3*3，4- 4*4，默认值为 1， 单画面
        bWndFull: true, //是否支持单窗口双击全屏，默I_CheckPluginInstall
        szColorProperty: 'plugin-background:575757; sub-background:303030; sub-border:575757; sub-border-select:FFFF00',
        cbSelWnd: function(xmlDov){
            // console.log('118')
            // console.log(xmlDov)
        },
        cbInitPluginComplete: function(){
            // 在 HTML DOM 元素中插入播放插件
            WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin');
            
            // 检查插件版本
            if (WebVideoCtrl.I_CheckPluginVersion() === -1) {
                alert("检测到新的插件版本，双击开发包目录里的WebComponentsKit.exe升级！")
                return
            }
        }
    });

    /*
        登录设备：
            192.168.1.65： 这个 ip 地址是海康威视的，可以在浏览器输入查看
            1 : 表示使用 http
            80: 端口号; 这里是写死用来测试的，请根据实际填写
            admin: 账号; 这里是写死用来测试的，请根据实际填写
            lain123456: 密码; 这里是写死用来测试的，请根据实际填写
    */
    WebVideoCtrl.I_Login('192.168.1.65', 1, 80, 'admin', 'lain123456', {
        success: function(xmlDoc){
            console.log('登录成功');
            
            // setTimeout(function(){

                // 获取通道
                getChannel();

                // 获取设备端口与 RTSP 端口
                getDevicePort();

            // }, 50)

        },
        error: function(status, xmlDoc){
            console.log('登录失败');
        }
    })
    console.log("开始播放视频!")
}
// 查看视频方法中登录设备中调用
// 获取设备端口与 RTSP 端口
function getDevicePort(){
    var iDevicePort = undefined;
    var iRtspPort = undefined;
    // 获取设备端口与RTSP端口; 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
    let oPort = WebVideoCtrl.I_GetDevicePort('192.168.1.65_80');
    //console.log(oPort)
    if(oPort !== null){
        iDevicePort = oPort.iDevicePort
        iRtspPort = oPort.iRtspPort
    }else{
        console.log('获取端口失败！')
    }
}

// 查看视频方法中登录设备中调用
// 获取通道
function getChannel(){
    // 获取模拟通道; 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
    WebVideoCtrl.I_GetAnalogChannelInfo('192.168.1.65_80', {
        async: false,
        success:  function(xmlDoc){
            // console.log(xmlDoc)
            console.log('获取模拟通道成功')
        },
        error: function(status, xmlDoc){
            // console.log(status, xmlDoc)
            console.log(" 获取模拟通道失败！")
        }
    })

    // 获取数字通道; 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
    WebVideoCtrl.I_GetDigitalChannelInfo('192.168.1.65_80', {
        async: false,
        success: function(digitalChannels){
            console.log('获取数字通道成功')

            // digitalChannels.childNodes[0].childNodes[【for循环 i 】]
            // console.log(digitalChannels)


            var list = document.getElementById('list');

            // 循环获取通道名字，插入到 li 
            for(let i = 0; i < digitalChannels.childNodes[0].childNodes.length; i++){
                // 创建元素
                var li = document.createElement('li');
                var img = document.createElement('img')
                var span = document.createElement('span');

                img.src = './imgs/videoImgs/monitorIcon.png';
                // 获取通道名字
                var textContent = digitalChannels.childNodes[0].childNodes[i].childNodes[1].lastChild.textContent;
                span.innerText = textContent;

                // 插入到 li
                li.appendChild(img);
                li.appendChild(span);

                li.value = i+1;
                li.onclick = function(){
                    var liVal = this.value;
                    startPreview(liVal);
                }

                // 把 li 插入到 ul 中去
                list.appendChild(li);
            }
            
        },
        error: function(status, xmlDoc){
            // console.log(status)
            console.log('获取数字通道失败')
        }
    });

    // 获取零通道; 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
    WebVideoCtrl.I_GetZeroChannelInfo('192.168.1.65_80', {
        async: false,
        success: function(){
            console.log('获取零通道成功')
        },
        error: function(status, xmlDoc){
            console.log('获取零通道失败')
        }
    });
}
// 获取通道方法中调用
// 开始预览
function startPreview(liValue){
    // console.log(liValue)

    var val = liValue;

    //获取当前窗口的状态
    var oWndInfo = WebVideoCtrl.I_GetWindowStatus();
    // console.log(oWndInfo)

    // 开始预览; 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
    WebVideoCtrl.I_StartRealPlay('192.168.1.65_80', {
        // iWndIndex: 0,
        iChannelID: val,
        success: function(){
            console.log("预览成功")
        },
        error: function(){
            console.log("预览失败")
        }
    });
    
    // 已经在播放了，先停止
    if (oWndInfo != null) { 
        console.log('已经在播放了，先停止，在播放')
        WebVideoCtrl.I_Stop({
            success: function() {
                // 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
                WebVideoCtrl.I_StartRealPlay('192.168.1.65_80', {
                    // iWndIndex: 0,
                    iChannelID: val,
                    success: function(){
                        console.log("预览成功")
                    },
                    error: function(){
                        console.log("预览失败")
                    }
                });
            }
        });
    } else {
        // 192.168.1.65_80: 这里是写死用来测试的，请根据实际填写
        WebVideoCtrl.I_StartRealPlay('192.168.1.65_80', {
            // iWndIndex: 0,
            iChannelID: val,
            success: function(){
                console.log("预览成功")
            },
            error: function(){
                console.log("预览失败")
            }
        });
    }
}
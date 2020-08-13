// EChart图标

//获取当前设备的的宽度
let nowClientWidth = window.innerWidth;
//设计自适应单位
function nowSize(val, initWidth = 1280) {
    return val * (nowClientWidth / initWidth);
}

function Echar(number) {
    var myChart = echarts.init(document.getElementById('TempAndHumiRealTime').children[number].children[0].children[1]);

    // 指定图表的配置项和数据
    var colors = ['#e58360', '#44a594', '#675bba'];


    option = {
        color: colors,

        tooltip: {
            trigger: 'none',
            axisPointer: {
                type: 'cross'
            }
        },
        grid: {
            top: nowSize(50),
            bottom: nowSize(37)
        },
        xAxis: [{
                type: 'category',
                axisTick: {
                    show: false
                },
                //坐标轴字体
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: colors[1], //更改坐标轴文字颜色
                        fontSize: nowSize(11.5) //更改坐标轴文字大小
                    }
                },
                //坐标轴
                axisLine: {
                    show: false,
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function(params) {
                            return '湿度' + params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ['38S', '40S', '42S', '44S', '46S', '48S', '50S', '53S']
            },
            {
                type: 'category',
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false,
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                //坐标轴字体
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: colors[0], //更改坐标轴文字颜色
                        fontSize: nowSize(11.5) //更改坐标轴文字大小
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function(params) {
                            return '温度  ' + params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                        }
                    }
                },
                data: ['53S', '36S', '38S', '40S', '42S', '44S', '46S', '48S']
            }
        ],
        yAxis: [{
            min: 0,
            max: 50,
            type: 'value',
            position: "left",
            yAxisIndex: 0,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            splitLine: {
                show: false
            },
            //坐标轴字体
            axisLabel: {
                show: true,
                textStyle: {
                    color: colors[0], //更改坐标轴文字颜色
                    fontSize: nowSize(11.5) //更改坐标轴文字大小
                }
            }
        }, {
            min: 0,
            max: 75,
            interval: 15, //强行分割间隔
            type: 'value',
            position: "right",
            yAxisIndex: 1,
            axisTick: {
                show: false
            },
            axisLine: {
                show: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            splitLine: {
                show: false
            },
            //坐标轴字体
            axisLabel: {
                show: true,
                textStyle: {
                    color: colors[1], //更改坐标轴文字颜色
                    fontSize: nowSize(11.5) //更改坐标轴文字大小
                }
            }
        }],
        series: [{
                type: 'line',
                xAxisIndex: 0,
                yAxisIndex: 0,
                smooth: false,
                data: [2.6, 5.9, 5.9, 5.9, 9.0, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4, 26.4]
            },
            {
                type: 'line',
                xAxisIndex: 1,
                yAxisIndex: 1,
                smooth: false,
                data: [2.6, 5.9, 5.9, 5.9, 9.0, 26.4]
            }
        ]
    };



    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
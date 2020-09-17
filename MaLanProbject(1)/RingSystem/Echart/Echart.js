// EChart图标

//获取当前设备的的宽度
let nowClientWidth = window.innerWidth;
//设计自适应单位
function nowSize(val) {
    let initWidth = 1280
    return val * (nowClientWidth / initWidth)
}

//实时数据曲线图
function Echar(number) {
    let myChart = echarts.init(document.getElementById('TempAndHumiRealTime').children[number].children[0].children[1]);

    // 指定图表的配置项和数据
    let colors = ['#e58360', '#44a594', '#675bba'];


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

//历史曲线
function HistoricalCurveEchar(data) {
    let myChart = echarts.init(document.getElementById("TempAndHumiHistorical"));
    let colors = ['#e58360', '#44a594', '#675bba'];

    var option = {
        title: {
            text: '温度/℃',
            textStyle: {
                color: colors[0],
                fontWeight: '500',
                fontSize: nowSize(11.5),
            },
            x: nowSize(75),
            y: nowSize(15)
        },
        xAxis: {
            type: 'time',
            splitLine: {
                show: false
            },
            // 坐标轴字体
            axisLabel: {
                show: true,
                textStyle: {
                    color: colors[1], //更改坐标轴文字颜色
                    fontSize: nowSize(11.5) //更改坐标轴文字大小
                }
            },
            splitLine: { //决定是否显示坐标中网格
                show: true,
                lineStyle: {
                    color: "#4b4b4b"
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#4b4b4b', //左边线的颜色  
                }
            },
        },
        yAxis: {
            min: 0,
            max: 120,
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {
                show: false
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: colors[0], //更改坐标轴文字颜色
                    fontSize: nowSize(11.5) //更改坐标轴文字大小
                },
            },
            splitLine: { //决定是否显示坐标中网格
                show: true,
                lineStyle: {
                    color: "#4b4b4b"
                }
            },
            axisLine: {
                lineStyle: {
                    type: 'solid',
                    color: '#4b4b4b', //左边线的颜色  
                }
            }
        },
        dataZoom: [{
            type: 'inside',
            show: true,
        }],
        series: [{
            data: data,
            type: 'line',
            name: '模拟数据',
            itemStyle: {
                normal: {
                    color: colors[0], // 设置最高气温线的颜色
                }
            },
        }]
    };
    myChart.setOption(option);
    myChart.resize()
}

//仪表盘
function Dashboard(id, title, data) {
    let myChart = echarts.init(id);
    // 指定图表的配置项和数据
    option = {
        tooltip: {
            formatter: '{a} <br/>{b} : {c}%'
        },
        //工具箱
        toolbox: {
            show: false
        },
        series: [{
            min: 0,
            max: 400,
            name: '业务指标',
            type: 'gauge',
            radius: "90%",
            detail: { formatter: '{value}%' },
            data: [{ value: 50, name: title }],
            axisLine: { // 坐标轴线
                lineStyle: { // 属性lineStyle控制线条样式
                    color: [
                        [0.09, 'lime'],
                        [0.82, '#1e90ff'],
                        [1, '#ff4500']
                    ],
                    width: 3,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisTick: {
                length: "10%",
            },
            splitLine: {
                length: "15%",
            },
            axisLabel: {
                distance: 2,
                fontSize: nowSize(12)
            },
            pointer: {
                length: "70%",
                width: "8%"
            },
            title: {
                fontSize: nowSize(15),
                color: "#28DAB6",
                offsetCenter: [0, '70%']
            },
            detail: {
                fontSize: nowSize(15)
            },
            tooltip: {
                textStyle: {
                    fontSize: nowSize(11)
                }
            },
        }]
    };

    function DashboardCrtl() {
        option.series[0].data[0].value = data
        myChart.setOption(option, true);
    }
    DashboardCrtl()

}
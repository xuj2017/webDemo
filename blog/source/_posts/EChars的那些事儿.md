---
title: EChars的那些事儿
date: 2018-12-13 10:08:44
tags: charts
categories: javascript
---

> 最近在做一个新项目，其中运用了大量的图表，主要有折线图、柱状图、饼图、雷达图四种;在考虑可扩展性的情况下，优先选择了`ECharts`,[ECharts](http://echarts.baidu.com/index.html)是百度开源的一款图表插件;

### 折线图 

折线图是最经常使用的图表之一，但是在样式上往往又不一样，经常需要按照设计需求定制，在本项目遇到的折线图问题主要是样式定制及双坐标轴不对齐的问题,以项目中的一个图表为例

![目标图表](https://raw.githubusercontent.com/xuj2017/markdownimage/master/images/blog/20181214-01.png)
上面的是设计图表

![基本图表](https://raw.githubusercontent.com/xuj2017/markdownimage/master/images/blog/20181214-02.png)
上面是Echart的官网基本图表

配置解析

```js
var option = {
               ......
                xAxis: [
                    {

                        type: 'category',
                        data: data.XData,//横坐标值
                        axisLine: { show: false },//隐藏坐标轴
                        axisTick: { show: false }//隐藏坐标轴上刻度线
                    }
                ],
                yAxis: [
                    //使用左右双纵坐标
                    {
                        type: 'value',
                        scale: true,
                        name: '股价/元',
                        axisLine: { show: false },//隐藏坐标轴
                        axisTick: { show: false }//隐藏坐标轴上刻度线
                    },
                    {
                        type: 'value',
                        scale: true,
                        name: '评分/分',
                        axisLine: { show: false },
                        axisTick: { show: false },
                     }
                ],
                series: [
                {
                    name: '股价',
                    type: 'line',
                    symbol: "none",//隐藏折线图上的圆点
                    connectNulls: true,//连接空坐标点
                    itemStyle: { //线的颜色
                        color: '#2fade6'
                    },
                    lineStyle: { //线的宽度
                        width: 1
                    },
                    data: data.Ydata.Price//纵坐标值

                },
                {
                    name: '评分',
                    type: 'line',
                    yAxisIndex: 1,//选择右侧纵坐标
                    symbol: "none",
                    connectNulls: true,
                    itemStyle: {
                        color: '#ed6a13'
                    },
                    lineStyle: {
                        width: 1
                    },
                    data: data.Ydata.Score//纵坐标值
                }

                ]
            }

    ```

完成上述的配置后，发现样式基本一致，但是左右两个纵坐标刻度错乱，像这样
 ![基本图表](https://raw.githubusercontent.com/xuj2017/markdownimage/master/images/blog/20181214-03.png)

查阅[官方文档](http://echarts.baidu.com/option.html#yAxis)发现，刻度值的个数及间隔需要通过四个参数配置，即：`max`、`min`、`splitNumber`、`interval`;

- `max`:坐标值刻度最大值，数据类型可以是number, string, function,默认值为null
- `min`:坐标值刻度最小值，数据类型可以是number, string, function,默认值为null
- `splitNumber`:坐标轴的分割段数，数据类型是number，默认值为5
- `interval`:坐标轴刻度标签的显示间隔

写一个通用方法`computeInterval`

```js
    /**
    *
    * @param {Array} arr 数组值
    * @param {Number} spliNum 分割段数
    * @param {Boole} isSym 是否上下对称
    */
    function computeInterval(arr, spliNum, isSym){
        //默认返回类型
        var defaultResult = {
                    "max": null,
                    "min": null,
                    "interval": 'auto',
                    "spliNum": 5
                }

        try{
            if (arr && arr.length) {
                spliNum = spliNum || 5;

                var max = Math.max.apply(null,arr); //获取最大值
                var min = Math.min.apply(null,arr); //获取最小值
               
               //取坐标轴的最大最小值，这里取最大值的1.2倍为上限
                if (isSym) {
                    if (Math.abs(max) > Math.abs(min)) {
                        max = parseFloat((Math.abs(max) * 1.2).toFixed(2));
                    } else {
                        max = parseFloat((Math.abs(min) * 1.2).toFixed(2));
                    }
                    min = -max;
                } else {
                    if (max > 0) {
                        max = Math.ceil(max) * 1.2
                    } else {
                        max = Math.floor(max) * 0.8
                    }

                    if (min > 0) {
                        min = Math.floor(min) * 0.8
                    } else {
                        min = Math.ceil(min) * 1.2
                    }

                }

                //获取分隔段数
                var interval = ((max - min) / spliNum) || 'auto';

                return {
                    "max": max,
                    "min": min,
                    "interval": interval,
                    "spliNum": spliNum
                }
            } else {
                return defaultResult;
            }
        } catch (err) {
            return defaultResult;

        }
    }

```
修改下上述配置

```js
//根据纵坐标值计算分隔线
 var res1 = calInterval(data.Ydata.Price);//左
 var res2 = calInterval(data.Ydata.Score);//右
....
yAxis: [
    //使用左右双纵坐标
    {
        type: 'value',
        scale: true,
        name: '股价/元',
        axisLine: { show: false },//隐藏坐标轴
        axisTick: { show: false },//隐藏坐标轴上刻度线
        min: res1.max,
        max: res1.min,
        splitNumber: res1.spliNum,
        interval: res1.interval,
        axisLabel: {
            formatter:function(value, index) {
                return value.toFixed(2) //坐标刻度保留两个小数点
            }
        }
    },
    {
        type: 'value',
        scale: true,
        name: '评分/分',
        axisLine: { show: false },
        axisTick: { show: false },
         min: res2.max,
            max: res2.min,
            splitNumber: res2.spliNum,
            interval: res2.interval,
            axisLabel: {
                formatter:function(value, index) {
                    return value.toFixed(2)
                }
            }
    }
]
.....

```

最终完成效果![最终效果](https://raw.githubusercontent.com/xuj2017/markdownimage/master/images/blog/20181214-04.png)



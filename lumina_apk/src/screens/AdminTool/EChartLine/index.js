import React, {useRef, useEffect, useState} from 'react';
import {View, Text, TurboModuleRegistry} from 'react-native';
import {adaptationConvert, createStyles} from 'src/helpers/style';
import {SvgChart, SVGRenderer,SkiaChart} from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import {BarChart,LineChart} from 'echarts/charts';
import {DataZoomComponent
} from 'echarts/components';
import {fontName} from 'src/constants/font';

// 注册扩展组件
echarts.use([
  SVGRenderer,
  BarChart,
  DataZoomComponent,
  LineChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = 300;

const option = {
    legend: {
        icon: "rect",
        show: true,
        right: 0,
        top: 25,
    },
    xAxis: [{
        type: 'category',
        data: ['Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1'],
        splitLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        axisLabel: {
            interval: 0, // 解决x轴名称过长问题
            rotate:45,
            color: '#999',
            fontSize: adaptationConvert(24),
          },
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#666',
            fontSize:adaptationConvert(24)
        },
        interval: 20,
        max: function (value) {
          if (value.max >= 100 || value.max > 80) {
            return 100;
          }
          if (value.max <= 80) {
            return 80;
          }
          return 100;
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#F4F4F4',
                type: 'solid' // y轴分割线类型
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
    },

    series: [{
            name: '',
            type: 'line',
            smooth: true,
            symbol:'none',
            data: [22, 100, 31, 80, 22],
            itemStyle:{
                color: new echarts.graphic.LinearGradient(
                    1,
                    0,
                    0,
                    0,
                    [{
                            offset: 0,
                            color: '#4b2423'
                        },
                               {
                            offset: 0.5,
                            color: '#dc6e2d'
                        },
                        {
                            offset: 0.8,
                            color: '#3268a1'
                        },
                        {
                            offset: 1,
                            color: '#111115'
                        },
                    ]
                )
            },
            areaStyle:{
                color: new echarts.graphic.LinearGradient(
                    1,
                    0,
                    0,
                    0,
                    [{
                            offset: 0,
                            color: '#4b2423'
                        },
                               {
                            offset: 0.5,
                            color: '#dc6e2d'
                        },
                        {
                            offset: 0.8,
                            color: '#3268a1'
                        },
                        {
                            offset: 1,
                            color: '#111115'
                        },
                    ]
                )
            }
        },
    ]
};

const EChartLine = () => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  useEffect(() => {
    let chart;
    if (chartRef.current && chartWidth > 0 && chartHeight > 0) {
      // @ts-ignore
      chart = echarts.init(chartRef.current, 'light', {
        renderer: 'svg',
        width: chartWidth,
        height: chartHeight,
      });
      chart.setOption(option);
    }
    return () => chart?.dispose();
  }, [option, chartWidth, chartHeight]);
  // 获取容器的宽高
  const handleLayout = e => {
    const {width, height} = e.nativeEvent.layout;
    setChartWidth(width);
    setChartHeight(height);
  };
  return (
    <View
      style={{flex: 1, position: 'relative', height: '100%'}}
      onLayout={handleLayout}>
      <SkiaChart ref={chartRef} />
    </View>
  );
};

const styles = createStyles({});

export default EChartLine;

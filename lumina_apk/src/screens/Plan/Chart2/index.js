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
    //color: ['#e47177', '#79d87f','#42858c'],
    legend: {
        icon: "rect",
        show: true,
        right: 0,
        top: 25,
    },
    xAxis: [{
        type: 'category',
        data: ['Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1','Jan1','Jan1','Jan1','Jan1','Jan1','Jan1','Jan1','Jan1','Jan1','Jan1','Jan1'],
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
            fontSize: adaptationConvert(18),
          },
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#666',
            fontSize:adaptationConvert(18)
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
            data: [50,4,44,45,122,76,13,4,44,45,122,76,13,4,44,45,122,76],
            itemStyle:{
                color:'#e47177'
            }
        },
        {
            name: '',
            type: 'line',
            smooth: true,
            symbol:'none',
            data: [3,54,34,144,35,53,13,54,34,144,35,53,13,41,84,44,12,7],
            itemStyle:{
                color:'#79d87f'
            }
        },
        {
            name: '',
            type: 'line',
            smooth: true,
            symbol:'none',
            data: [16,75,82,20,23,22,45,32,44,66,77,88,99,45,52,36,78,20],
            itemStyle:{
                color:'#42858c'
            }
        }
    ]
};

const Chart2 = () => {
  const chartRef = useRef(null);
  const [chartWidth, setChartWidth] = useState(0);
  const [chartHeight, setChartHeight] = useState(0);
  useEffect(() => {
    let chart;
    if (chartRef.current && chartWidth > 0 && chartHeight > 0) {
      // @ts-ignore
      console.log(chartHeight, '渲染的高度');
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

export default Chart2;
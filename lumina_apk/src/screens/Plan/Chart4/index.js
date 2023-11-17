import React, {useRef, useEffect, useState} from 'react';
import {View, Text, TurboModuleRegistry} from 'react-native';
import {adaptationConvert, createStyles} from 'src/helpers/style';
import {SvgChart, SVGRenderer,SkiaChart } from '@wuba/react-native-echarts';
import * as echarts from 'echarts/core';
import {BarChart} from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
} from 'echarts/components';
import {fontName} from 'src/constants/font';

// 注册扩展组件
echarts.use([
  SVGRenderer,
  // ...
  BarChart,
]);

const E_HEIGHT = 250;
const E_WIDTH = 300;

const option = {
  xAxis: [
    {
      interval: 2, // 设置横坐标坐标点间隔
      type: 'category',
      axisLabel: {
        interval: 0, // 解决x轴名称过长问题
        rotate: 45,
        color: '#999',
          fontSize: adaptationConvert(18),
      },
      axisLine: {
        lineStyle: {
          //y轴网格线设置
          color: '#fff',
          width: 1,
        },
      },
      data: [
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
        'Jan1',
      ],
    },
  ],
  yAxis: [
    {
      type: 'value',
      show: true,
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
      axisLabel: {
        fontSize: adaptationConvert(12),
        formatter: (value, index) => {
          return index === 0 ? '' : value + '%';
        },
      },
      splitLine: {
        lineStyle: {
          type: 'solid',
          color: '#f4f4f4',
        },
      },
    },
  ],
  series: [
    {
        data: [
            20, 20, 15, 15, 15, 12, 15, 20, 20, 15, 15, 15, 12, 15, 20, 20, 15, 15,
          ],
      type: 'bar',
      stack: 'one',
      itemStyle: {
        borderWidth: adaptationConvert(4),
        borderColor: 'rgba(255, 255, 255, 1)', //同背景色一样
        color: '#40848b',
        borderRadius: 120,
      },

      emphasis: {
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
    {
      data: [
        20, 20, 15, 15, 15, 12, 15, 20, 20, 15, 15, 15, 12, 15, 20, 20, 15, 15,
      ],
      type: 'bar',
      stack: 'one', //堆叠
      barWidth: adaptationConvert(15),
      color: '#79d87f',
      itemStyle: {
        borderWidth: adaptationConvert(4), //用border设置两个柱形图之间的间距
        borderColor: 'rgba(255, 255, 255, 1)', //同背景色一样
        borderRadius: 120,
      },
      emphasis: {
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
    {
      data: [
        20, 20, 15, 15, 15, 12, 15, 20, 20, 15, 15, 15, 12, 15, 20, 20, 15, 15,
      ],
      type: 'bar',
      stack: 'one', //堆叠
      barWidth: adaptationConvert(15),
      color: '#e47177',
      itemStyle: {
        borderWidth: adaptationConvert(4), //用border设置两个柱形图之间的间距
        borderColor: 'rgba(255, 255, 255, 1)', //同背景色一样
        borderRadius: 120,
      },
      emphasis: {
        itemStyle: {
          borderColor: 'rgba(255, 255, 255, 1)',
        },
      },
    },
  ],
};

const Chart1 = (props) => {
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

export default Chart1;

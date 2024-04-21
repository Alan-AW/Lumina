import { adaptationConvert } from "src/helpers/style";


const lineData = [
    [
        { key: '1', value: 50 },
        { key: '2', value: 50 },
        { key: '3', value: 50 },
    ],
    [
        { key: '1', value: 50 },
        { key: '2', value: 50 },
        { key: '3', value: 50 },
    ],
    [
        { key: '1', value: 50 },
        { key: '2', value: 50 },
        { key: '3', value: 50 },
    ],
]

export const lineOption = {
    //color: ['#e47177', '#79d87f','#42858c'],
    legend: {
        icon: "rect",
        show: true,
        right: 0,
        top: 25,
    },
    xAxis: [{
        type: 'category',
        data: ['Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1', 'Jan1'],
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
            rotate: 45,
            color: '#999',
            fontSize: adaptationConvert(18),
        },
    }],
    yAxis: {
        type: 'value',
        axisLabel: {
            color: '#666',
            fontSize: adaptationConvert(18)
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
        symbol: 'none',
        data: [50, 4, 44, 45, 122, 76, 13, 4, 44, 45, 122, 76, 13, 4, 44, 45, 122, 76],
        itemStyle: {
            color: '#e47177'
        }
    },
    {
        name: '',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: [3, 54, 34, 144, 35, 53, 13, 54, 34, 144, 35, 53, 13, 41, 84, 44, 12, 7],
        itemStyle: {
            color: '#79d87f'
        }
    },
    {
        name: '',
        type: 'line',
        smooth: true,
        symbol: 'none',
        data: [16, 75, 82, 20, 23, 22, 45, 32, 44, 66, 77, 88, 99, 45, 52, 36, 78, 20],
        itemStyle: {
            color: '#42858c'
        }
    }
    ]
};

export const getLineOptaion = (data: any[]) => {
    let xLabel: any[] = [];
    const series: any[] = [];
    const colors: any = {
        0: '#e47177',
        1: '#79d87f',
        2: '#42858c',
    }
    data.forEach((item, index) => {
        //每个item是一条数组
        const seriesItem = {
            name: '',
            type: 'line',
            smooth: true,
            symbol: 'none',
            data: item.map((i: any) => { return i.value }),
            itemStyle: {
                color: colors[index]
            }
        };
        series.push(seriesItem);
        //获取key
        xLabel = item.map((i: any, index: number) => {
            return index % 2 === 0 ? "" : i.key
        });
    })
    const lineOption = {
        //color: ['#e47177', '#79d87f','#42858c'],
        legend: {
            icon: "rect",
            show: true,
            right: 0,
            top: 25,
        },
        xAxis: [{
            type: 'category',
            data: xLabel,
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
                rotate: 45,
                color: '#999',
                fontSize: adaptationConvert(18),
            },
        }],
        yAxis: {
            type: 'value',
            axisLabel: {
                color: '#666',
                fontSize: adaptationConvert(18)
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


        series: series
    };
    return lineOption

}

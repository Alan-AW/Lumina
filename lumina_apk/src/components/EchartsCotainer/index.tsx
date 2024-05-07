import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import ShadowCard from "../Shadow";
import AutoView from "../AutoView/View";
import { adaptationConvert, createStyles } from 'src/helpers/style';
import { SvgChart, SVGRenderer, SkiaChart } from '@wuba/react-native-echarts';
import Start from "../FlexView/Start";
import AutoText from "../AutoView/Text";
import LocalesText from "../Text";
import { IconButton } from "../Button";
import Center from "../FlexView/Center";
import * as echarts from 'echarts/core';
import { locales } from "src/helpers/localesText";
import { IconKongshuju } from "src/iconfont";


interface EchartsCotainerPorps {
    options: any,
    children: any,
    echartWidth: number,
    echartHeight: number,
}

export default function EchartsCotainer(props: EchartsCotainerPorps) {
    const { options, children, echartWidth, echartHeight } = props;
    const chartRef = useRef(null);
    useEffect(() => {
        let chart: any = null;
        if (chartRef.current && echartWidth > 0 && echartHeight > 0) {
            // @ts-ignore
            chart = echarts.init(chartRef.current, 'light', {
                renderer: 'svg',
                width: echartWidth + 50,
                height: echartHeight + 50,
            });
            chart.setOption(options);
        }
        return () => chart?.dispose();
    }, [options, echartWidth, echartHeight]);

    return (
        <AutoView style={{ padding: 32, }}>
            <ShadowCard style={{ width: echartWidth + 32, height: echartHeight + 32, backgroundColor: '#fff', position: 'relative' }}>
                {children}
                {
                    options ? <AutoView style={{ flex: 1, flexDirection: 'column', position: 'absolute', left: 0, top: 20, width: '100%', height: '100%' }}>
                        <SkiaChart ref={chartRef} />
                    </AutoView> :
                        <Center style={{ flex: 1, flexDirection: 'column' }}>
                            <IconKongshuju size={adaptationConvert(100)} color={'#8a8a8a'} />
                            <LocalesText languageKey={locales.nullData} top={10} />
                        </Center>
                }

            </ShadowCard>
        </AutoView>

    )
}
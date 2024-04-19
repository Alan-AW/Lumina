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
                width: echartWidth,
                height: echartHeight,
            });
            chart.setOption(options);
        }
        return () => chart?.dispose();
    }, [options, echartWidth, echartHeight]);

    return (
        <AutoView style={{ padding: 32 }}>
            <ShadowCard>
            {children}
                {
                    options ? <>
                        <SkiaChart ref={chartRef} />
                    </> :
                        <Center style={{ flex: 1 }}>
                            <LocalesText languageKey={locales.nullData} />
                        </Center>
                }

            </ShadowCard>
        </AutoView>
    )
}
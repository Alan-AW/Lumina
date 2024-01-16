
import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { ScrollView, Switch } from "react-native-gesture-handler";
import { View } from 'react-native'
import { getSetting, submitAdmin } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import Loading from "src/components/Loading";
import useRequest from "src/hooks/useRequest";
import ControllerItem from "./item/Item";
import ShadowCard from "src/components/Shadow";

// import { useTranslation } from 'react-i18next';

//判断一个数组中是否已有item
function hasItem(searchData, item, key = 'cmd') {
    return searchData.map(i => i[key]).includes(item[key])
}

function getMaxHeight(height1, height2) {
    if (height1 && !height2) {
        return height1;
    }
    if (!height1 && height2) {
        return height2
    }
    if (height1 && height2) {
        return height1 > height2 ? height1 : height2
    }
}

const Controller = () => {
    // const { t,i18n } = useTranslation();
    const { loading, data, error } = useRequest(() => getSetting({ id: 1, language: 'zh' }));

    const [container, setContainer] = useState({

    })

    const dataMap = useMemo(() => {
        const _value = [];
        if (data) {
            console.log(data, '请求信息');
            for (let key in data) {
                _value.push({
                    title: key,
                    clildren: data[key]
                })
            }
            return _value;
        }
        return _value;

    }, [data])



    return (
        <ScrollView style={{ flex: 1 }}>
            <Loading loading={loading}>
                <AutoView isRow style={{ alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 0, borderRadius: 5 }}>
                    <AutoView isRow style={{ marginRight: 30 }}>
                        <AutoView style={{ width: 50, height: 30, backgroundColor: '#a5ce77' }} />
                        <AutoText style={{ paddingLeft: 10 }}>自动</AutoText>
                    </AutoView>
                    <AutoView isRow>
                        <AutoView style={{ width: 50, height: 30, backgroundColor: '#e1e1e1', borderRadius: 5 }} />
                        <AutoText style={{ paddingLeft: 10 }}>手动</AutoText>
                    </AutoView>

                </AutoView>
                <AutoView style={{ alignItems: 'flex-start', justifyContent: 'space-between', width: '100%', flexWrap: 'wrap' }} isRow>
                    {
                        dataMap.map((item, index) => {
                            return (
                                <AutoView key={index} 
                                // onLayout={(event) => {
                                //     const { height } = event.nativeEvent.layout;
                                //     console.log('容器高度' + index, height);
                                //     if (!container[index]) {
                                //         setContainer({
                                //             ...container,
                                //             [index]: height,
                                //         })
                                //     }


                                // }} 
                                style={{ width: '48%', margin: 10, padding: 20 }}>
                                    <ShadowCard style={{ height: getMaxHeight(container[index], container[index + 1]),padding:16,minHeight:500 }}>
                                        <AutoView style={{ paddingLeft: 0, paddingRight: 32, marginBottom: 20 }}>
                                            <AutoText style={{ fontWeight: '700', }}>{item.title}</AutoText>
                                        </AutoView>
                                        <AutoView>
                                            {
                                                item.clildren.map((_value, _index) => {
                                                    return (
                                                        <ControllerItem key={_index} item={_value} />
                                                    )
                                                })
                                            }

                                        </AutoView>

                                    </ShadowCard>
                                </AutoView>

                            )
                        })
                    }


                </AutoView>


            </Loading>
        </ScrollView>

    )
}


export default Controller;
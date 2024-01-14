
import Slider from "@react-native-community/slider";
import React, { useEffect, useRef, useState } from "react";
import { Switch } from "react-native-gesture-handler";
import { getSetting, submitAdmin } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import Loading from "src/components/Loading";
import useRequest from "src/hooks/useRequest";
import ControllerItem from "./item/Item";

// import { useTranslation } from 'react-i18next';

//判断一个数组中是否已有item
function hasItem(searchData, item, key = 'cmd') {
    return searchData.map(i => i[key]).includes(item[key])
}

const Controller = () => {
    // const { t,i18n } = useTranslation();
    const { loading, data, error } = useRequest(() => getSetting({ id: 1, language: 'zh' }));
    //console.log(data, '请求信息');
    const update = useRef([]);

    useEffect(() => {
        if (data && Array.isArray(data)) {
            update.current = data;

        }
    }, [data])
    function handleChange(item) {
        if (hasItem(update.current, item)) {
            update.current = update.current.filter(i => i.cmd != item.cmd)
        } else {
            update.current = [...update.current, item];
        }
      

    }
    return (
        <AutoView style={{ flex: 1 }}>
            <Loading loading={loading}>
                <AutoView>
                    {
                        data.map((item, index) => {
                            return (
                                <AutoView key={index}>
                                    <ControllerItem item={item} onChange={(v) => handleChange(v)} />
                                </AutoView>
                            )
                        })
                    }


                </AutoView>


            </Loading>
        </AutoView>

    )
}


export default Controller;
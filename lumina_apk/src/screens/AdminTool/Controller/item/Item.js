import Slider from "@react-native-community/slider";
import React, { useEffect, useState } from "react";
import { Switch } from 'react-native'
import AutoView from "src/components/AutoView/View";
import AutoText from "src/components/AutoView/Text";
import { submitAdmin } from "src/apis/home";
import ToastService from "src/helpers/toast";
import SwitchItem from "./switch";
import SliderItem from "./slder";

const SWITCH_TYPE = 'switch';
const SLIDER_TYPE = 'slide';

const ControllerItem = (props) => {
    const { item = {}, onChange } = props;
    if (item.component === SWITCH_TYPE) {
        return <SwitchItem item={item} onChange={onChange} />
    }
    if (item.component === SLIDER_TYPE) {
        return <SliderItem item={item} onChange={onChange} />
    }
    return null;

}

export default ControllerItem;


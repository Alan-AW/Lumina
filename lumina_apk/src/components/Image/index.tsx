import React from "react";
import { useState } from "react";
import { Image, View, ImageStyle } from "react-native";
import LocalesText from "../Text";
import { locales } from "src/helpers/localesText";
import { baseUrl } from "src/apis/config";

interface ImgProps {
    url?: string;
    style?: ImageStyle;
    size?: number,
    radius?:number
}

function Img(props: ImgProps) {
    const { url, style = {}, size = 100,radius=0 } = props;
    const [loadingErr, setLoadingErr] = useState(false);
    const mergeStyle: ImageStyle = {
        width: size, height: size,
        borderRadius:radius,
        ...style,
    }
    
    return (
        <>
            {
                loadingErr ? <LocalesText languageKey={locales.nullData} style={mergeStyle} /> :
                    <Image source={{ uri: baseUrl+url }} style={mergeStyle} onError={() => {
                        setLoadingErr(true)
                    }} />
            }

        </>
    )

}

export default Img;
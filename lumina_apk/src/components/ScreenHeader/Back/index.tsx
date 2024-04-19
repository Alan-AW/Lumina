import { useNavigation } from "@react-navigation/native";
import React from "react";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import { IconButton } from "src/components/Button";
import ShadowCard from "src/components/Shadow";
import colors from "src/constants/colors";
import { adaptationConvert, createStyles } from "src/helpers/style";
import { IconJiantouCopy } from "src/iconfont";

//redux 事件注册中心
//首页注册刷新事件，监听刷新状态
//添加页修改刷新状态，执行首页刷新事件

export default function Back(props: { noneText?: boolean, customPress?: Function }) {
    const { noneText, customPress } = props;
    const nav = useNavigation()

    return (
        <AutoView isRow>
            <ShadowCard style={styles.backBtn}>
                <IconButton onPress={() => {
                    if (customPress) {
                        customPress(nav);
                        return
                    }
                    nav.goBack()
                }}>
                    <IconJiantouCopy size={adaptationConvert(30)} />
                </IconButton>

            </ShadowCard>
            {
                !noneText && <AutoText>Back</AutoText>
            }


        </AutoView>

    )
}

const styles = createStyles({

    backBtn: {
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        borderColor: '#f8f8f8',
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
})

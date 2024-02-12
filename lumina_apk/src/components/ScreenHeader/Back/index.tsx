import { useNavigation } from "@react-navigation/native";
import React from "react";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import { IconButton } from "src/components/Button";
import ShadowCard from "src/components/Shadow";
import colors from "src/constants/colors";
import { adaptationConvert, createStyles } from "src/helpers/style";
import { IconJiantouCopy } from "src/iconfont";


export default function Back() {
    const nav = useNavigation()

    return (
        <AutoView isRow>
            <ShadowCard style={styles.backBtn}>

                <IconButton onPress={() => nav.goBack()}>
                    <IconJiantouCopy size={adaptationConvert(30)} />
                </IconButton>

            </ShadowCard>
            <AutoText>Back</AutoText>

        </AutoView>

    )
}

const styles = createStyles({

    backBtn: {
        backgroundColor: '#fff',
        width: 70,
        height: 70,
        borderColor: colors.borderColor,
        borderWidth: 1,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
    },
})

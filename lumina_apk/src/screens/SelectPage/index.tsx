import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { getChoices } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import Loading from "src/components/Loading";
import RadioIcon from "src/components/RadioIcon";
import Back from "src/components/ScreenHeader/Back";
import ShadowCard from "src/components/Shadow";
import colors from "src/constants/colors";
import { HEIGHT } from "src/constants/global";
import { createStyles } from "src/helpers/style";
import useRequest from "src/hooks/useRequest";
import Details from "./details";
import { useNavigation, useRoute } from "@react-navigation/native";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";


const AddPage = () => {
    const { loading, data, error } = useRequest(() => getChoices());
    const [selectItem, setSelectItem] = useState<any>('')



    const [isNext, setIsNext] = useState<boolean>(false)

    function handleClick(value: any) {
        setSelectItem(value)
    }


   
    

    return (
        <AutoView isRow style={{ alignItems: 'flex-start', padding: 30, height: HEIGHT }}>

            <AutoView style={{ width: 500, marginRight: 50, height: '100%' }}>
                <Back />
                <ShadowCard style={{ padding: 15, marginTop: 30 }}>
                    <AutoView isRow>
                        <RadioIcon size={15} color={colors.checked} />
                        <LocalesText languageKey={locales.Aisle} right={10} rightText="#001" />
                       
                    </AutoView>
                    <AutoText>
                        <LocalesText leftText="[" rightText="-A]" languageKey={locales.Zone} />
                        <LocalesText languageKey={locales.Room} rightText="#001" />
                    </AutoText>


                </ShadowCard>
            </AutoView>
            <View style={{ flex: 1, height: 800, }}>

                <Loading loading={loading}>
                    <ScrollView style={{ flex: 1, height: 800 }}>
                        <AutoView isRow style={{ flexWrap: 'wrap', paddingLeft: 15, paddingRight: 16 }}>
                            {
                                data.map((item, index) => {
                                    return <AutoView isRow onPress={() => handleClick(item.value)} key={index}
                                        style={
                                            {
                                                borderColor: selectItem === item.value ? colors.checked : 'rgba(0,0,0,0.05)',
                                                marginLeft: 60,
                                                marginTop: 60,
                                                width: '30%',
                                                justifyContent: 'space-between',
                                                borderRadius: 8,
                                                borderWidth: 1,
                                                paddingRight: 2,
                                                paddingBottom: 2,
                                            }}>
                                        <AutoView style={{ padding: 60, paddingTop: 30 }}>
                                            <AutoText>{item.label}</AutoText>

                                        </AutoView>
                                        <AutoView style={{ backgroundColor: '#f6f6f6', height: 300, width: 300, justifyContent: 'center' }} isRow>
                                            <Image source={{ uri: item.icon }} style={{ width: 100, height: 100 }} />

                                        </AutoView>
                                    </AutoView>
                                })
                            }
                        </AutoView>

                    </ScrollView>

                </Loading>


            </View>
            {<Details id={selectItem} clearSelectItem={() => setSelectItem('')} />}



        </AutoView>
    )

}
const styles = createStyles({
    itemStyle: {
        borderWidth: 1, width: '100%', height: 300, marginLeft: 30, marginTop: 30,
        alignItems: 'flex-start', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', borderRadius: 4
    },

})

export default AddPage;
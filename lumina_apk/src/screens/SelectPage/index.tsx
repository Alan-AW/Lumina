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
import Img from "src/components/Image";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import NormalText from "src/components/Text/NormalText";
import Center from "src/components/FlexView/Center";
import Wrap from "src/components/FlexView/Wrap";
import CustView from "src/components/FlexView/CustView";
import { showAddPlant } from "src/components/CsutomModal";
import { uppdateRefresh } from "src/reduxCenter/actionCreators/refreshAction";
import { useAppDispatch } from "src/reduxCenter/hooks";


const AddPage = () => {
    const { loading, data, error } = useRequest(() => getChoices());
    const [selectItem, setSelectItem] = useState<any>('')
    const navigation = useNavigation();
    console.log('选择页data', data);
    const routes: any = useRoute();
    const { roomName, devicesName,devicesId } = routes.params;
    const [isNext, setIsNext] = useState<boolean>(false)
    const dispatch = useAppDispatch()


    function handleClick(value: any) {

        showAddPlant(value,devicesId,()=>{
            dispatch(uppdateRefresh({ routeKey: 'Home', status: true }))
            navigation.goBack();
        })
        // setSelectItem(value)
    }




    return (
        <AutoView isRow style={{ alignItems: 'flex-start', padding: 30, height: HEIGHT }}>

            <AutoView style={{ width: 500, marginRight: 50, height: '100%' }}>
                <Back />
                <ShadowCard style={{ padding: 15, marginTop: 30 }}>

                    <NormalText text={roomName} />


                </ShadowCard>
            </AutoView>
            <View style={{ flex: 1, height: 800, }}>

                <Loading loading={loading}>
                    <ScrollView style={{ flex: 1, height: 800 }}>
                        <Wrap isRow horizontal={15}>
                            {
                                data.map((item, index) => {
                                    return (
                                        <SpaceBetween width={500} top={40} style={{ alignItems: 'flex-start' }} onPress={() => handleClick(item.value)} key={index}>
                                            <CustView width={200} padding={[12, 25, 0, 25]}>
                                                <NormalText left={15} text={item.label} />

                                            </CustView>
                                            <Center padding={30} bgColor="#f6f6f6">
                                                <Img url={item.icon} size={80} />

                                            </Center>
                                        </SpaceBetween>
                                    )
                                })
                            }
                        </Wrap>

                    </ScrollView>

                </Loading>


            </View>
            {/* {<Details id={selectItem} clearSelectItem={() => setSelectItem('')} />} */}



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
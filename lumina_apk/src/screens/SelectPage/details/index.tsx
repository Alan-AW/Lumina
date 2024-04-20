import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Modal, ScrollView, ToastAndroid, View } from "react-native";
import { getChoicesDetails, submitChoices } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import Loading from "src/components/Loading";
import UseModal from "src/components/Modal";
import RadioIcon from "src/components/RadioIcon";
import { HEIGHT, WIDTH } from "src/constants/global";
import { adaptationConvert } from "src/helpers/style";
import useRequest from "src/hooks/useRequest";
import CustomRadioGroup from "./radioGroup";
import colors from "src/constants/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
import { IconButton } from "src/components/Button";
import ToastService from "src/helpers/toast";
import LocalesText from "src/components/Text";
import { locales } from "src/helpers/localesText";
import { useRoute } from "@react-navigation/native";
import { useAppDispatch } from "src/reduxCenter/hooks";
import { uppdateRefresh } from "src/reduxCenter/actionCreators/refreshAction";
import Center from "src/components/FlexView/Center";

interface DetailsProps {
    id: any,
    clearSelectItem: () => void;
}

export default function Details(props: DetailsProps) {

    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<any>(true)
    const [show, setShow] = useState(false)
    const routes: any = useRoute();


    useEffect(() => {
        setShow(!!props.id)
        getChoicesDetails(props.id).then(res => {
            console.log('请求结果666', res.data);
            setData(res.data)

        }).catch(()=>{
            // ToastAndroid.show('')
        }).finally(() => {
            setLoading(false)
        })


    }, [props.id])


    const dispatch = useAppDispatch()

    const [radioSelected, setRadioSelected] = useState<any>({})

    const newData = useMemo(() => {
        if (!loading && Array.isArray(data)) {
            const raidoListData: any = [];
            //初始化选中ID
            const initId: any = {}

            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                const raidoList: any = [];

                for (let i = 0; i < element.child.length; i++) {
                    const childItem = element.child[i]
                    initId[element.child[i]['id']] = null;
                    if (element.choices_self) {
                        raidoList.push({
                            ...childItem,
                            value: childItem.id,
                            label: childItem.title,
                            choices_self: element.choices_self,
                        })
                    } else {
                        raidoList.push({
                            ...element.child[i],
                            choices_self: element.choices_self,
                        })

                    }

                }
                raidoListData.push({
                    subject: element.subject,
                    choices_self: element.choices_self,
                    raidoList,
                })
                setRadioSelected(initId)

            }
            return raidoListData;
        }
        return [];

    }, [loading, data])





    function handleShow() {

        setShow(!show)

    }
    function close() {

    }

    /**
     * 提交接口
     */
    function confirm() {
        const submitData: any = [];
        for (let key in radioSelected) {
            if (!radioSelected[key]) {
                continue;
                // Alert.alert('指令集不能为空');
                // return;
            }

            //获取choices_self
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                const isId = element.child.find((i: any) => {
                    return i.id == key;
                })
                if (isId) {
                    submitData.push({
                        id: key,
                        value: radioSelected[key],
                        choices_self: element.choices_self,
                    })
                }
            }
        }
        const params = {
            //设备id
            'unit': routes.params.devicesId,
            //蔬菜id
            'cultivar': props.id,
            //指令集
            algorithm: submitData,
        }
        submitChoices(params).then((res) => {
            props.clearSelectItem();
            ToastService.showMessage(res.errs ? JSON.stringify(res.errs) : res.info);
            dispatch(uppdateRefresh({ routeKey: 'Home', status: true }))

        }).catch(Err => {
            console.log(Err);

        })



    }




    return (
        <Modal visible={show} transparent animationType="fade" onRequestClose={
            () => handleShow()
        }>


            <AutoView isRow style={{ width: '100%', height: '100%', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)' }}>

                <AutoView style={{ backgroundColor: '#fff', width: '40%', height: '60%', padding: 60, borderRadius: 8, marginLeft: '0%' }}>
                    <Loading loading={loading}>
                        {
                            !loading && data.length === 0 ? <Center style={{flex:1}}>
                                <LocalesText languageKey={locales.nullData} />
                            </Center> :
                                <ScrollView style={{ flex: 1 }}>
                                    {
                                        newData.map((item: any, index: number) => {

                                            let selectData: any = [];
                                            let moreData: any = [];
                                            if (item.choices_self) {
                                                selectData = item.raidoList.map((i: any, key: number) => {
                                                    return {
                                                        id: key + 'chose',
                                                        value: i.id,
                                                        label: i.title,
                                                        size: 20,

                                                    }

                                                })
                                            } else {
                                                item.raidoList.forEach((_item: any) => {
                                                    const formatData = _item.choices.map((cho: any, _key: number) => {
                                                        return {
                                                            id: _key + 'child',
                                                            value: cho.value,
                                                            label: cho.label,
                                                            size: 20,

                                                        }
                                                    })
                                                    moreData.push({
                                                        title: _item.title,
                                                        id: _item.id,
                                                        formatData,
                                                    })
                                                });

                                            }



                                            return (
                                                <View key={index} style={{ marginTop: index === 0 ? 0 : 20, marginBottom: index === newData.length - 1 ? 30 : 0 }}>
                                                    <View>
                                                        <AutoText style={{ fontSize: 40, color: '#333', fontWeight: '600' }}>{item.subject}</AutoText>
                                                    </View>
                                                    <AutoView style={{ flexWrap: 'wrap',marginTop:12 }}>
                                                        {
                                                            item.choices_self ?
                                                                <CustomRadioGroup
                                                                    data={selectData}
                                                                    onChange={(v: any, row: any) => {
                                                                        setRadioSelected({
                                                                            ...radioSelected,
                                                                            v: row.value
                                                                        })

                                                                    }}
                                                                /> :
                                                                moreData.map((data: any, j: number) => {
                                                                    return (
                                                                        <AutoView key={j} style={{ marginTop: 20, marginBottom: 10 }}>
                                                                            <View>
                                                                                <AutoText style={{ fontSize: 30, color: '#666' }}>{data.title}</AutoText>
                                                                            </View>
                                                                            <CustomRadioGroup
                                                                                data={data.formatData}
                                                                                onChange={(v: any, row: any) => {

                                                                                    setRadioSelected({
                                                                                        ...radioSelected,
                                                                                        [data['id']]: row.value
                                                                                    })

                                                                                }}
                                                                            />
                                                                        </AutoView>

                                                                    )
                                                                })

                                                        }

                                                    </AutoView>

                                                </View>
                                            )
                                        })
                                    }
                                </ScrollView>
                        }

                        <AutoView style={{ justifyContent: 'flex-end', height: 100, borderTopWidth: 1, borderColor: '#f8f8f8' }} isRow>
                            <IconButton onPress={() => {

                                props.clearSelectItem()
                            }}>
                                <LocalesText languageKey={locales.cancel} color="#666" right={20} />

                            </IconButton>
                            <IconButton onPress={() => confirm()}>
                                <LocalesText languageKey={locales.confirm} color={colors.checked} />
                            </IconButton>
                        </AutoView>
                    </Loading>

                </AutoView>




            </AutoView>
        </Modal>


    )
}
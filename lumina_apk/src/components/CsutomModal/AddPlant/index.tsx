import AutoView from "src/components/AutoView/View";
import Modal from "../Modal";
import { ScrollView, View } from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getChoicesDetails, submitChoices } from "src/apis/home";
import Loading from "src/components/Loading";
import Center from "src/components/FlexView/Center";
import LocalesText from "src/components/Text";
import AutoText from "src/components/AutoView/Text";
import CustomRadioGroup from "src/screens/SelectPage/details/radioGroup";
import { arrRepeat, deepData } from "src/utils";
import ToastService from "src/helpers/toast";
import { useAppDispatch } from "src/reduxCenter/hooks";
import { uppdateRefresh } from "src/reduxCenter/actionCreators/refreshAction";
import { IconButton } from "src/components/Button";
import End from "src/components/FlexView/End";
import colors from "src/constants/colors";
import { locales } from "src/helpers/localesText";
import SelectTime from "src/screens/SelectPage/SelectTime";


interface AddPlantProps {
    onClose: Function,
    onConfim: Function,
    plantId: number,
    devicesId: number,

}

function getFormatDate(){
    const hour=new Date().getHours();
    const midium=new Date().getMinutes();
    const sec=new Date().getSeconds();
    const _hour=hour<10?'0'+hour:hour;
    const _midium=midium<10?'0'+midium:midium;
    const _sec=sec<10?'0'+sec:sec;
    return `${_hour}:${_midium}`;
}


export default (props: AddPlantProps) => {
    const { onClose, plantId, onConfim, devicesId } = props;
    const modalRef = useRef<any>(null)
    const [data, setData] = useState<any>([])
    const [loading, setLoading] = useState<any>(true)
    const [selectedTime, setSelectedTime] = useState<any>(getFormatDate())
    const paramsList = useRef<any[]>([]);


    useEffect(() => {
        getChoicesDetails(plantId).then(res => {
            setData(res.data)
        }).catch(() => {
            // ToastAndroid.show('')
        }).finally(() => {
            setLoading(false)
        })


    }, [plantId])

    function closeModal() {
        modalRef.current.closeModal();
    }

    const nullData = useCallback(() => {
        return (
            <Center style={{ flex: 1 }}>
                <LocalesText languageKey={locales.nullData} />
            </Center>
        )
    }, [])

    //设置单选复选项
    const setFormItem = (data: any[]) => {
        if (data.length > 0) {
            const arr: any[] = [];
            data.forEach(item => {
                //为多选的情况下
                if (!item.choices_self) {
                    item.child.map((i: any) => {
                        arr.push({
                            id: i.id,
                            selectValue: '',
                            selectIndex: '',
                        })
                    })
                } else {
                    arr.push({
                        id: item.subject || '123',
                        selectValue: '',
                        selectIndex: '',
                    })

                }
            });
            paramsList.current = arr;
        }
    }

    const getOtherRender = (renderData: any[]) => {
        //choices_self 为单选  false为多选
        setFormItem(renderData)
        const raidoListData: any = [];
        renderData.forEach(parentItem => {
            const raidoList: any = [];
            parentItem.child.forEach((childItem: any) => {
                if (parentItem.choices_self) {

                    raidoList.push({
                        ...childItem,
                        value: childItem.id,
                        label: childItem.title,
                        choices_self: parentItem.choices_self,
                    })
                } else {
                    raidoList.push({
                        ...childItem,
                        choices_self: parentItem.choices_self,
                    })
                }

            });
            raidoListData.push({
                subject: parentItem.subject,
                choices_self: parentItem.choices_self,
                raidoList,
            })

        });
        return raidoListData;


    }

    const renderData = useMemo(() => {
        if (!loading && Array.isArray(data)) {
            return getOtherRender(data)
        }
        return []

    }, [loading, data])

    const renderItem = (item: any) => {
        let selectData: any = [];
        let moreData: any = [];
        if (item.choices_self) {
            selectData = item.raidoList.map((i: any, key: number) => ({
                id: i.id,
                value: i.id,
                label: i.title,
                size: 20,
                choices_self: true
            }))

        } else {
            item.raidoList.forEach((_item: any) => {
                const formatData = _item.choices.map((cho: any, _key: number) => {
                    return {
                        id: cho.value,
                        value: cho.value,
                        label: cho.label,
                        size: 20,
                    }

                })
                moreData.push({
                    title: _item.title,
                    id: _item.id,
                    formatData,
                    label: 'child',
                    choices_self: _item.choices_self
                })
            });
        }
        console.log(moreData, selectData, '选项form');



        return {
            selectData,
            moreData,
        }

    }

    const handleOnChange = (row: any, index: number,subject?:string) => {

        const findIndex = paramsList.current.findIndex(i => {
            if(!subject){
                return i.id === row.value
            }
            return i.id === subject
        });

        if (findIndex >= 0) {
            paramsList.current[findIndex] = {
                ...paramsList.current[findIndex],
                selectValue: row.value,
                selectIndex: index
            }
        }
        console.log(paramsList.current, '需要提交的数据');
    }

    const submit = () => {
        const arr = paramsList.current.filter(i => {
            return typeof i.selectValue !== 'string'
        }).map(i => ({
            id: i.selectValue,
            value: typeof i.id ==='string'?'':i.selectIndex,
            choices_self: typeof i.id ==='string',
        }))
        console.log('提交的参数',arr);

        const params = {
            //设备id
            'unit': devicesId,
            //蔬菜id
            'cultivar': plantId,
            tod:selectedTime,
            //指令集
            algorithm: arr,
        }
        console.log('请求的参数',params);
        
        submitChoices(params).then((res) => {
            onConfim()
            ToastService.showMessage(res.errs ? JSON.stringify(res.errs) : res.info);
            closeModal();

        }).catch(Err => {
            ToastService.showToast(locales.operationFailed)
            console.log(Err);

        })
    }

    const isDisabled = !loading && data.length === 0;

    return (
        <Modal ref={modalRef} onClose={onClose}>
            <AutoView style={{ backgroundColor: '#fff', width: '40%', height: '60%', padding: 32, borderRadius: 8, }}>
                <Loading loading={loading}>
                    {
                        isDisabled ? nullData() :
                            <ScrollView style={{ flex: 1 }}>
                                {
                                    renderData.map((item: any, index: number) => {
                                        const { selectData, moreData } = renderItem(item);
                                        return (
                                            <View key={index} style={{ marginTop: index === 0 ? 0 : 20, marginBottom: index === renderData.length - 1 ? 30 : 0 }}>
                                                <View>
                                                    <AutoText style={{ fontSize: 40, color: '#333', fontWeight: '600' }}>{item.subject}</AutoText>
                                                </View>
                                                <AutoView style={{ flexWrap: 'wrap', marginTop: 12 }}>
                                                    {
                                                        item.choices_self ?
                                                            <CustomRadioGroup
                                                                data={selectData}
                                                                onChange={(v: any, row: any) => {
                                                                    //处理单选id事件
                                                                    console.log(v,'选择的value',row);
                                                                    
                                                                    

                                                                    handleOnChange(row, v,item.subject)
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
                                                                            onChange={(v: any, row: any) => handleOnChange({value:data.id}, v)}
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
                                <SelectTime label={'SunriseTime'} value={selectedTime} maxHour={24} onChangeSelect={(v)=>{
                                    console.log('选择的时间',v);
                                    setSelectedTime(v)
                                    
                                }} />

                            </ScrollView>
                    }
                    <End style={{ height: 120, borderTopWidth: 1, borderColor: '#f8f8f8', }}>
                        <IconButton onPress={closeModal} style={{ borderColor: '#d9d9d9', paddingHorizontal: 10, paddingVertical: 6, borderWidth: 1, borderRadius: 4, marginRight: 24 }}>
                            <LocalesText languageKey={locales.cancel} color="#666" />
                        </IconButton>
                        <IconButton disabled={isDisabled} onPress={() => submit()}
                            style={{ backgroundColor: isDisabled ? '#ccc' : colors.checked, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 4, marginRight: 0 }}>
                            <LocalesText languageKey={locales.confirm} color={'#fff'} />
                        </IconButton>
                    </End>

                </Loading>
            </AutoView>

        </Modal>
    )
}
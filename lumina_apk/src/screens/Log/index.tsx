import React, { useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { getLog } from "src/apis/home";
import AutoText from "src/components/AutoView/Text";
import AutoView from "src/components/AutoView/View";
import Center from "src/components/FlexView/Center";
import SpaceBetween from "src/components/FlexView/SpaceBetween";
import Start from "src/components/FlexView/Start";
import Loading from "src/components/Loading";
import ScreenHeader from "src/components/ScreenHeader";
import ShadowCard from "src/components/Shadow";
import LocalesText from "src/components/Text";
import { WIDTH } from "src/constants/global";
import { locales } from "src/helpers/localesText";
import { adaptationConvert } from "src/helpers/style";
import { useFetch } from "src/hooks/useFetch";
import useRequest from "src/hooks/useRequest";
import { deepData } from "src/utils";

const ceilWidth = 400;

const columns = [
    {
        key: 'create_time',
        width: 446,
        languageKey: locales.CreationTime,
        sort: 1,
    },
 
    {
        key: 'username',
        width: 300,
        languageKey: locales.Username,
        sort: 2,

    },
    {
        key: 'role',
        width: 300,
        languageKey: locales.UserRole,
        sort: 3,

    },
    {
        key: 'command_label',
        width: 300,
        languageKey: locales.OperationCommand,
        sort: 4,
    },
    {
        key: 'content',
        width: 1000,
        languageKey: locales.ModifiedContent,
        sort: 5,
    },
  
];


const pageSize = 20;

export default function Log() {

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const [data, setData] = useState([])
    const [count, setCount] = useState(0)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (count > 0) {
            setMaxPage(Math.ceil(count / pageSize))
        }

    }, [count])
    useEffect(() => {
        setLoading(true)
        getLog({ page: page, size: pageSize }).then((res: any) => {
            console.log('当前请求的data', res.data.results);

            setData(data.concat(res.data.results))
            setCount(res.data.count)

        }).finally(() => {
            setLoading(false)
        })

    }, [page])


    // console.log('获取的日志data', data);

    const tableData = useMemo(() => {

        if (data && Array.isArray(data)) {

            return data.map((item: any, index: number) => {
                // const { username, role, command_label, content, create_time } = item;
                const arr = [];
                for (let key in item) {
                    const findKey = columns.find(i => i.key === key);
                    if (findKey) {
                        arr.push({
                            width: findKey.width,
                            text: typeof item[key] === 'object' ? JSON.stringify(item[key]) : (item[key] || 'null'),
                            sort: findKey.sort,
                        })
                    }
                }
                return arr.map(item => {
                    return {
                        ...item,
                    }
                }).sort((a, b) => {
                    return a.sort - b.sort
                });
            })
        }
        return [];

    }, [data])




    return (
        <View style={{ flex: 1 }}>
            {/* <AutoView style={{ paddingLeft: 32 }}>
                <ScreenHeader title={<LocalesText size={42} languageKey={locales.OperationLog} />} subtitle="" hiddenBack />
            </AutoView> */}
            <Start style={{ flexWrap: 'wrap', paddingLeft: 0,borderBottomWidth:1,borderColor:'#f4f4f4' }}>
                {
                    columns.map((item, index) => {
                        const _style=item.key==='content'?{flex:1}:{width:item.width}
                        return (
                            <Center key={index} style={{ backgroundColor: '#f9f9f9', paddingVertical: 32,..._style }}>
                                <LocalesText languageKey={item.languageKey} color='#444' />
                            </Center>
                        )
                    })
                }
            </Start>
            <FlatList data={tableData} style={{backgroundColor:'#fff'}} keyExtractor={(i, index) => index + ''} onEndReached={() => {
                if (page < maxPage) {
                    setPage(page + 1)
                }
            }} renderItem={({ item, index }) => {
                const newItem = deepData(item);
                newItem.push({
                    width: ceilWidth,
                    text: index + 1
                })
                if (index === data.length - 1) {
                    return (
                        <>
                            <Start style={{ paddingLeft: 32 }} key={index}>
                                {
                                    item.map((item: any, index: number) => {
                                const _style=index=== data.length - 1?{flex:1}:{width:item.width}


                                        return <Center style={{ paddingVertical: 64 ,..._style}} key={index}>
                                            <AutoText style={{ fontSize: 30 }}>{item.text}</AutoText>
                                        </Center>
                                    })
                                }
                            </Start>
                            {
                                page > maxPage ? <Center style={{ height: 100 }}>
                                    <LocalesText languageKey={locales.nullData} />
                                </Center> : <Loading loading={loading} style={{ height: 100 }} />
                            }


                        </>
                    )
                }
                return (
                    <Start style={{ paddingLeft: 0 }} key={index}>
                        {
                            item.map((item: any, index: number) => {
                                const _style=index=== data.length - 1?{flex:1}:{width:item.width}

                                return <Center style={{ paddingVertical: 64,..._style }} key={index}>
                                    <AutoText style={{ fontSize: 30 }}>{item.text}</AutoText>
                                </Center>
                            })
                        }
                    </Start>
                )
            }} />

        </View>

    );
}
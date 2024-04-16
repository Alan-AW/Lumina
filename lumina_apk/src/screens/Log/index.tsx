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
import LocalesText from "src/components/Text";
import { WIDTH } from "src/constants/global";
import { locales } from "src/helpers/localesText";
import { useFetch } from "src/hooks/useFetch";
import useRequest from "src/hooks/useRequest";
import { deepData } from "src/utils";

const columns = [
    {
        key: 'index',
        width: 100,
        languageKey: locales.SerialNumber,
        sort:1,
    },
    {
        key: 'username',
        width: 100,
        languageKey: locales.Username,
        sort:2,

    },
    {
        key: 'role',
        width: 100,
        languageKey: locales.UserRole,
        sort:3,

    },
    {
        key: 'command_label',
        width: 100,
        languageKey: locales.OperationCommand,
        sort:4,
    },
    {
        key: 'content',
        width: 100,
        languageKey: locales.ModifiedContent,
        sort:5,
    },
    {
        key: 'create_time',
        width: 100,
        languageKey: locales.CreationTime,
        sort:6,
    },
].map(item => {
    return {
        ...item,
        width: 700,
    }
});


const pageSize = 10;

export default function Log() {

    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(0)
    const { data, loading, run } = useFetch(() => getLog({ page, size: pageSize }))

    useEffect(() => {
        if (data) {
            setMaxPage(Math.ceil(data.count / pageSize))
        }

    }, [data])

    useEffect(() => {
        run()
    }, [])
    // console.log('获取的日志data', data);

    const tableData = useMemo(() => {

        if (data && Array.isArray(data.results)) {

            return data.results.map((item: any, index: number) => {
                // const { username, role, command_label, content, create_time } = item;
                const arr = [{
                    width: 700,
                    text:index+1,
                    sort:1,
                }];
                for (let key in item) {
                    const findKey = columns.find(i => i.key === key);
                    if (findKey) {
                        arr.push({
                            width: findKey.width,
                            text: item[key] || 'null',
                            sort: findKey.sort,
                        })
                    }
                }
                return arr.map(item => {
                    return {
                        ...item,
                        width: 700,
                    }
                }).sort((a,b)=>{
                    return a.sort - b.sort
                });
            })
        }
        return [];

    }, [data])


    console.log(tableData, 'tableData');

    return (
        <View style={{ flex: 1 }}>

            <AutoView style={{ paddingLeft: 32 }}>
                <ScreenHeader title={<LocalesText languageKey={locales.OperationLog} />} subtitle="" hiddenBack />
            </AutoView>
            <Loading loading={loading}>
                <Start style={{ flexWrap: 'wrap', paddingLeft: 32 }}>
                    {
                        columns.map(item => {
                            return (
                                <Center style={{ width: item.width, backgroundColor: '#f8f8f8', paddingVertical: 32 }}>
                                    <LocalesText languageKey={item.languageKey} color='#444' />
                                </Center>
                            )
                        })
                    }
                </Start>
                <FlatList data={tableData} style={{ flex: 1 }} keyExtractor={(i, index) => index + ''} onEndReached={() => {
                    if (page < maxPage) {
                        setPage(page + 1)
                        run();
                    }
                }} renderItem={({ item, index }) => {
                    const newItem = deepData(item);
                    newItem.push({
                        width: 700,
                        text: index + 1
                    })
                    return (
                        <Start style={{ paddingLeft: 32 }} key={index}>
                            {
                                item.map((item: any, index: number) => {

                                    return <Center style={{ width: item.width,paddingVertical:64 }} key={index}>
                                        <AutoText>{item.text}</AutoText>
                                    </Center>
                                })
                            }
                        </Start>
                    )
                }} />

            </Loading>

        </View>

    );
}
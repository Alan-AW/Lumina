import React, { useMemo, useState } from "react";
import { View, useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { store } from "../data";
import TabScreen from "../TabScreen";
import AutoText from "src/components/AutoView/Text";




export default function UpdateTabs() {

    const instructions = store.data.instructions;

    const tabData = useMemo(() => {
        const element: any = {}
        const routeObj: any[] = [];
        if (Array.isArray(instructions) && instructions.length > 0) {
            for (let i = 0; i < instructions.length; i++) {
                const item = instructions[i];
                routeObj.push({
                    key: item.phase,
                    title: item.phase
                })
                const data: any = {
                    actions: item.actions,
                    "days_max": item.days_max,
                    "days_min": item.days_min,
                    "duration": item.duration,
                }

                // element[item.phase] =
                element[item.phase] = () => <TabScreen data={data} />;
            }
            return {
                element,
                routeObj
            };
        }
        return {
            element,
            routeObj,
        };


    }, [instructions])


    const [routes] = React.useState(tabData.routeObj);

    const renderScene = SceneMap(tabData.element);

    const [tabIndex, setTabIndex] = useState<number>(0);
    const layout = useWindowDimensions();


    return (
        <TabView
            lazy
            swipeEnabled={false}
            tabBarPosition="top"
            navigationState={{ index: tabIndex, routes }}
            renderScene={renderScene}
            onIndexChange={setTabIndex}
            renderTabBar={(props: any) => (
                <TabBar
                    {...props}
                    pressColor="transparent"
                    style={{
                        backgroundColor: '#ddd',
                        shadowOpacity: 0,
                        elevation: 0,
                    }}
                    indicatorStyle={{ backgroundColor: '#ccc' }}


                    renderLabel={({ route, focused }) => (
                        <AutoText
                        >
                            {route.title}
                        </AutoText>
                    )}
                />
            )}
            initialLayout={{ width: layout.width }}
        />
    )
}
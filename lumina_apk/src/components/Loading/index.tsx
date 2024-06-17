import React from 'react';
import { View, StyleSheet, ActivityIndicator, ViewStyle } from 'react-native';

interface LoadingType {
    loading: boolean;
    children?: React.ReactNode,
    style?: ViewStyle

}

const Loading = (props: LoadingType) => {
    const { loading, children, style } = props;

    let _styles: ViewStyle = {
        // backgroundColor: '#ccc'
    }
    if (loading) {
        _styles.justifyContent = 'center';
        _styles.alignItems = 'center';
        _styles.flexDirection = 'row';
    }
    if (style) {
        _styles = {
            ..._styles,
            ...style,
        }
    }



    return (
        <View style={{ flex: 1, ..._styles }}>
            {
                loading && <ActivityIndicator size={30}></ActivityIndicator>
            }

            {
               !loading && children
            }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position:'relative'
    },
});

export default Loading;

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
    cancelAnimation,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, Dimensions, Alert } from 'react-native';
import { adaptationConvert, useInlineStyle } from '../../helpers/style';
import colors from '../../constants/colors';
import CustomText from '../Text';
import AutoText from '../AutoView/Text';
import SpaceBetween from '../FlexView/SpaceBetween';
import AutoView from '../AutoView/View';
import { FONT_SIZE } from 'src/constants/style';
import { numberToFixed } from 'src/utils';

interface SlideProps {
    disabled?: boolean;
    step?: number;
    value?: number;
    onChange?: (v: number) => void;
    onfinish: (v: number) => void;
    minValue?: number;
    maxValue?: number;
    unit?: string;
}

const selectColor = '#559e18'

const WINDOW = Dimensions.get('window')

const SLIDER_HEIGHT = adaptationConvert(WINDOW.width * 0.02);

export default (props: SlideProps) => {
    const {
        disabled = false,
        step = 1,
        value,
        onChange,
        unit,
        onfinish,
        minValue = 0,
        maxValue = 100,
    } = props;

    const [containerWidth, setContainerWidth] = useState(0);
    const [slideValue, setSlideValue] = useState(0);
    //已滑动的距离
    const slideExtent = useSharedValue(0);
    const translationX = useSharedValue(0);
    const slideWidth = useSharedValue(0);
    const minAnimValue = useSharedValue(0);
    const maxAnimValue = useSharedValue(0);

    useEffect(()=>{
        minAnimValue.value=minValue;
    },[minValue])

    useEffect(()=>{
        maxAnimValue.value=maxValue;
    },[maxValue])

    useEffect(() => {
        if (typeof value === 'number') {
            // console.log(value, maxValue, minValue, 9999);

            if(value>=minValue && value<=maxValue){
                // slideExtent.value=10*stepValue
                const stepValue2 = maxValue - minValue;
                //拿到数据百分比
                const value2 = Number(((value / stepValue2) * 100).toFixed(2));
                let result = (containerWidth * 1) / 100;
                //拿到总宽度的步长
                slideExtent.value = value2 * result;
                setSlideValue(value)
                return;
            }
            if (value >= maxValue) {
                slideExtent.value = containerWidth;
                setSlideValue(value)
                return
            }
            if (value <= maxValue) {
                slideExtent.value = 0;
                setSlideValue(minValue)
                return
            }
            
          
            }
          
    }, [value, containerWidth]);

    const pan = Gesture.Pan()
        .onUpdate(eve => {
            const moveValue = slideExtent.value + eve.translationX + SLIDER_HEIGHT;
            if (moveValue >= slideWidth.value || moveValue <= 0) {
                return;
            }
            translationX.value = eve.translationX;
        })
        .onEnd(() => {
            slideExtent.value = slideExtent.value + translationX.value;
            translationX.value = 0;
            const touchValue = slideExtent.value + SLIDER_HEIGHT;

            const stepValue = (maxValue - minValue) / slideWidth.value;


            let callbackValue = Number((touchValue * stepValue).toFixed(2));
            if (callbackValue >= maxAnimValue.value) {
                callbackValue = maxAnimValue.value;
            }
            if (callbackValue <= minAnimValue.value) {
                callbackValue = minAnimValue.value;
            }
            ('worklet');
            runOnJS(setSlideValue)(callbackValue)
            runOnJS(onfinish)(Number(callbackValue));

            // runOnJS(onfinish)(Number(callbackValue));
            // if (typeof onfinish === 'function') {

               
            //     //   
            // }
        });

    const animatedStyles = useAnimatedStyle(() => {
        const leftValue = slideExtent.value + translationX.value;
        return {
            width: leftValue,
        };
    });
    const leftStyles = useAnimatedStyle(() => {
        const leftValue = slideExtent.value + translationX.value;
        return {
            left: leftValue,
        };
    });
    const hitShopStyles = useAnimatedStyle(() => {
        const leftValue = slideExtent.value + translationX.value;
        return {
            left: leftValue - SLIDER_HEIGHT,
        };
    });

    return (
        <AutoView>
            <AutoView
                onLayout={(v: any) =>{
                    setContainerWidth(v.nativeEvent.layout.width);
                    slideWidth.value=v.nativeEvent.layout.width;
                }}
                style={{
                    position: 'relative',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 5,
                }}>
                <View
                    style={{
                        position: 'absolute',
                        left: 0,
                        width: containerWidth,
                        backgroundColor: '#ddd',
                        borderRadius: 5,
                        height: numberToFixed(SLIDER_HEIGHT / 2, 0),
                    }}
                />
                {!disabled && (
                    <>
                        <GestureDetector gesture={pan}>
                            <Animated.View
                                style={[
                                    useInlineStyle({
                                        height: SLIDER_HEIGHT * 20,
                                        position: 'absolute',
                                        borderRadius: 50,
                                        width: SLIDER_HEIGHT * 20,
                                        zIndex: 8,
                                    }),
                                    hitShopStyles,
                                ]}
                            />
                        </GestureDetector>
                        <Animated.View
                            style={[
                                useInlineStyle({
                                    height: SLIDER_HEIGHT * 3,
                                    position: 'absolute',
                                    borderRadius: 50,
                                    width: SLIDER_HEIGHT * 3,
                                    backgroundColor: selectColor,
                                    zIndex: 7,
                                    
                                }),
                                leftStyles,
                            ]}
                        />
                    </>
                )}

                <Animated.View
                    style={[
                        useInlineStyle({
                            height: numberToFixed(SLIDER_HEIGHT / 1.5, 0),
                            position: 'absolute',
                            borderTopLeftRadius: 5,
                            borderBottomLeftRadius: 5,
                            backgroundColor: selectColor,
                        }),
                        animatedStyles,
                    ]}
                />
            </AutoView>
            <SpaceBetween style={{ width: '100%', marginTop: 32 }}>
                <AutoText style={{ fontSize: FONT_SIZE.desc, opacity: disabled ? 0.7 : 1 }}>{Number(slideValue).toFixed(2)} {unit}</AutoText>
                <AutoText style={{ fontSize: FONT_SIZE.desc, opacity: disabled ? 0.7 : 1 }}>{maxValue}</AutoText>
            </SpaceBetween>
        </AutoView>
    );
};

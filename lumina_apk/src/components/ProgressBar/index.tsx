import Svg, { Circle } from "react-native-svg";
import React, { useEffect, useState, useRef } from "react";
import { Animated, View, Dimensions, Text } from "react-native";
import { createStyles } from "src/helpers/style";

let AnimatedCircle = Animated.createAnimatedComponent(Circle);
const WINDOW = Dimensions.get("window");

const _width = WINDOW.width;
const _height = 300;
//圆的大小和位置
const data = {
  cx: _width / 2,
  cy: _height / 2,
  r: 80,
  strokeWidth: 8,
  origin: `${_width / 2},150`,
};


interface CustomProgressProps {
  value: number;
  onEnd?: () => void;
}

const CustomProgress = (props: CustomProgressProps) => {
  const [circleFillAnimation] = useState(new Animated.Value(0));
  const [progressAnimation] = useState(new Animated.Value(0));
  const [press, setPress] = useState<number>(0);

  useEffect(() => {
    Animated.spring(progressAnimation, {
      toValue: props.value, // 设置进度值，范围：0～100
      friction: 20, // 动画摩擦力
      tension: 20, // 动画张力
      useNativeDriver: true,
    }).start();
  }, [props.value]);

 

  const dasharray = [Math.PI * 2 * data.r];
  const circleAnimation = circleFillAnimation.interpolate({
    inputRange: [0, 100],
    outputRange: [dasharray[0], 0],
  });
  const { onEnd } = props;

  useEffect(() => {
    progressAnimation.addListener(event => {
      const currentValue = Math.round(event.value);
      circleFillAnimation.setValue(currentValue);
      setPress(currentValue);
    });
    return () => {
      progressAnimation.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (onEnd && press === 100) {
      onEnd();
    }
  }, [press]);

  return (
    <View style={{ ...styles.container, width: WINDOW.width }}>
      <Svg height="300" width={WINDOW.width}>
        <Circle
          cx={data.cx}
          cy={data.cy}
          r={data.r}
          stroke="#3d5875"
          strokeWidth={data.strokeWidth}
          fill="transparent"
        />
        <AnimatedCircle
          cx={data.cx}
          cy={data.cy}
          r={data.r}
          origin={data.origin}
          rotation={-90}
          // rotate="-90"
          stroke="#00e0ff"
          strokeWidth={data.strokeWidth}
          strokeLinecap="round"
          fill="transparent"
          strokeDasharray={dasharray}
          strokeDashoffset={circleAnimation}
        />
      </Svg>


      <Text style={styles.textStyle}>{press}%</Text>
    </View>
  );
};

const styles = createStyles({
  container: {
    width: "100%",
    height: 300,
    display: "flex",
    alignItems: "center",
    position: "relative",
    justifyContent: "center",
    flexDirection: "row",
  },
  textStyle: {
    position: "absolute",
    zIndex: 999,
    color: "#fff",
    fontSize: 30,
  },
});

export default CustomProgress;

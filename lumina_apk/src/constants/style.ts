import { Dimensions } from "react-native";
import type { ViewStyle, TextStyle, ImageStyle } from "react-native";
import orientation from 'react-native-orientation-locker'

// 设备尺寸
export const { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT } = Dimensions.get("window");
// 参考设计尺寸
export const REFERENCE_DESIGN_SIZE = 675;
// 比例
export const SIZE_RATIO = REFERENCE_DESIGN_SIZE / 1180;

/**
 * @remarks 使用适配转换的样式列表.
 * @other 可选，获取V为number的K，但部分属性不适用，例如border、opacity等.
 */
export type TStyle = ViewStyle | TextStyle | ImageStyle;
export const ADAPTATION_CONVERT_STYLE_KEYS: Array<keyof (ViewStyle & TextStyle & ImageStyle)> = [
  "width",
  "maxWidth",
  "minWidth",
  "height",
  "maxHeight",
  "minHeight",
  "padding",
  "paddingHorizontal",
  "paddingVertical",
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
  "margin",
  "marginHorizontal",
  "marginVertical",
  "marginTop",
  "marginBottom",
  "marginLeft",
  "marginRight",
  "borderRadius",
  "top",
  "bottom",
  "left",
  "right",
  "fontSize",
  "letterSpacing",
  "lineHeight",
];

export const PADDING: Array<keyof (ViewStyle & TextStyle & ImageStyle)> = [
  "paddingTop",
  "paddingBottom",
  "paddingLeft",
  "paddingRight",
];

export const FONT_SIZE={
  title:35,
  subTitle:30,
  desc:26,
  content:24,
  button:20,
  icon:28

}
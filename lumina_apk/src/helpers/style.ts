import { StyleSheet } from "react-native";
import { SIZE_RATIO, ADAPTATION_CONVERT_STYLE_KEYS, type TStyle } from "../constants/style";
import { jsonIsEmpty } from "./utils";
import { Dimensions } from "react-native";
import orientation from 'react-native-orientation-locker'
const { width: VIEWPORT_WIDTH, height: VIEWPORT_HEIGHT } = Dimensions.get("screen");
//是否横屏
export const isLandscapeScreen=()=>{
  return VIEWPORT_WIDTH>VIEWPORT_HEIGHT
}

/** 根据设计稿尺寸以及屏幕大小进行适配转换. */
export function adaptationConvert(size: number): number {

  // 设备尺寸

  // 参考设计尺寸
  const REFERENCE_DESIGN_SIZE = isLandscapeScreen()?575:335;
  // 比例
  const SIZE_RATIO = REFERENCE_DESIGN_SIZE / VIEWPORT_WIDTH;
 
  return Number((size * SIZE_RATIO).toFixed(1));
}

/** 拓展样式表创建，默认使其根据需求的适配样式列表去做屏幕转换 */
export function createStyles<K extends string>(styles: Record<K, TStyle>): Record<K, TStyle> {
  const styleMap = new Map(Object.entries(styles) as [K, TStyle][]);

  styleMap.forEach((itemStyles, itemKey) => {
    if (jsonIsEmpty(itemStyles)) return;

    let key: keyof TStyle;
    for (key in itemStyles) {
      if (typeof itemStyles[key] === "number" && ADAPTATION_CONVERT_STYLE_KEYS.includes(key)) {
        // FIXME 这里明明已经通过typeof确定了number类型，不知为什么方法体中还会有抛出undefined类型的错误
        // if(key=='fontSize'){
        //   itemStyles[key]=itemStyles[key]+30;
        // }
        if(key==='fontSize'){
          styles[key]=styles[key]+0
        }
        (itemStyles[key] as number) = adaptationConvert(itemStyles[key] as number);
        // TODO 后续可以在这里做
      }
    }
    styleMap.set(itemKey, itemStyles);
  });

  return StyleSheet.create(Object.fromEntries(styleMap) as Record<K, TStyle>);
}

/** 行内样式的屏幕适配转换 */
export function useInlineStyle(styles: TStyle): TStyle {
  if (jsonIsEmpty(styles)) return {};

  let key: keyof TStyle;
  for (key in styles) {
    if (typeof styles[key] === "number" && ADAPTATION_CONVERT_STYLE_KEYS.includes(key)) {
      if(key==='fontSize'){
        styles[key]=styles[key]+3
      }
      (styles[key] as number) = adaptationConvert(styles[key] as number);
    }
  }

  return styles;
}

/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
import IconKongshuju from './IconKongshuju';
import IconEye from './IconEye';
import IconEyeNone from './IconEyeNone';
import IconTianjia from './IconTianjia';
import IconSaoma from './IconSaoma';
import IconShuaxin from './IconShuaxin';
import IconIconchengzhang from './IconIconchengzhang';
import IconTaiyangtianqi from './IconTaiyangtianqi';
import IconZiyuan from './IconZiyuan';
import IconYun from './IconYun';
import IconRichu from './IconRichu';
import IconJiantouCopy from './IconJiantouCopy';
import IconZhexiantu from './IconZhexiantu';
import IconJinrujiantouxiao from './IconJinrujiantouxiao';
import IconShezhi from './IconShezhi';
import IconShizhong from './IconShizhong';
import IconZidingyicaidan from './IconZidingyicaidan';
import IconKongxinwenhao from './IconKongxinwenhao';
import IconBaogao from './IconBaogao';
import IconXiangji from './IconXiangji';
import Icon4Guanbi2 from './Icon4Guanbi2';
import IconWeixinsaoma from './IconWeixinsaoma';
export { default as IconKongshuju } from './IconKongshuju';
export { default as IconEye } from './IconEye';
export { default as IconEyeNone } from './IconEyeNone';
export { default as IconTianjia } from './IconTianjia';
export { default as IconSaoma } from './IconSaoma';
export { default as IconShuaxin } from './IconShuaxin';
export { default as IconIconchengzhang } from './IconIconchengzhang';
export { default as IconTaiyangtianqi } from './IconTaiyangtianqi';
export { default as IconZiyuan } from './IconZiyuan';
export { default as IconYun } from './IconYun';
export { default as IconRichu } from './IconRichu';
export { default as IconJiantouCopy } from './IconJiantouCopy';
export { default as IconZhexiantu } from './IconZhexiantu';
export { default as IconJinrujiantouxiao } from './IconJinrujiantouxiao';
export { default as IconShezhi } from './IconShezhi';
export { default as IconShizhong } from './IconShizhong';
export { default as IconZidingyicaidan } from './IconZidingyicaidan';
export { default as IconKongxinwenhao } from './IconKongxinwenhao';
export { default as IconBaogao } from './IconBaogao';
export { default as IconXiangji } from './IconXiangji';
export { default as Icon4Guanbi2 } from './Icon4Guanbi2';
export { default as IconWeixinsaoma } from './IconWeixinsaoma';

export type IconNames = 'kongshuju' | 'eye' | 'eye-none' | 'tianjia' | 'saoma' | 'shuaxin' | 'iconchengzhang' | 'taiyangtianqi' | 'ziyuan' | 'yun' | 'richu' | 'jiantou-copy' | 'zhexiantu' | 'jinrujiantouxiao' | 'shezhi' | 'shizhong' | 'zidingyicaidan' | 'kongxinwenhao' | 'baogao' | 'xiangji' | '4guanbi-2' | 'weixinsaoma';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'kongshuju':
      return <IconKongshuju key="1" {...rest} />;
    case 'eye':
      return <IconEye key="2" {...rest} />;
    case 'eye-none':
      return <IconEyeNone key="3" {...rest} />;
    case 'tianjia':
      return <IconTianjia key="4" {...rest} />;
    case 'saoma':
      return <IconSaoma key="5" {...rest} />;
    case 'shuaxin':
      return <IconShuaxin key="6" {...rest} />;
    case 'iconchengzhang':
      return <IconIconchengzhang key="7" {...rest} />;
    case 'taiyangtianqi':
      return <IconTaiyangtianqi key="8" {...rest} />;
    case 'ziyuan':
      return <IconZiyuan key="9" {...rest} />;
    case 'yun':
      return <IconYun key="10" {...rest} />;
    case 'richu':
      return <IconRichu key="11" {...rest} />;
    case 'jiantou-copy':
      return <IconJiantouCopy key="12" {...rest} />;
    case 'zhexiantu':
      return <IconZhexiantu key="13" {...rest} />;
    case 'jinrujiantouxiao':
      return <IconJinrujiantouxiao key="14" {...rest} />;
    case 'shezhi':
      return <IconShezhi key="15" {...rest} />;
    case 'shizhong':
      return <IconShizhong key="16" {...rest} />;
    case 'zidingyicaidan':
      return <IconZidingyicaidan key="17" {...rest} />;
    case 'kongxinwenhao':
      return <IconKongxinwenhao key="18" {...rest} />;
    case 'baogao':
      return <IconBaogao key="19" {...rest} />;
    case 'xiangji':
      return <IconXiangji key="20" {...rest} />;
    case '4guanbi-2':
      return <Icon4Guanbi2 key="21" {...rest} />;
    case 'weixinsaoma':
      return <IconWeixinsaoma key="22" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;
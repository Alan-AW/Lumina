/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { GProps } from 'react-native-svg';
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

export type IconNames = 'tianjia' | 'saoma' | 'shuaxin' | 'iconchengzhang' | 'taiyangtianqi' | 'ziyuan' | 'yun' | 'richu' | 'jiantou-copy' | 'zhexiantu' | 'jinrujiantouxiao' | 'shezhi' | 'shizhong' | 'zidingyicaidan' | 'kongxinwenhao' | 'baogao' | 'xiangji' | '4guanbi-2' | 'weixinsaoma';

interface Props extends GProps, ViewProps {
  name: IconNames;
  size?: number;
  color?: string | string[];
}

let IconFont: FunctionComponent<Props> = ({ name, ...rest }) => {
  switch (name) {
    case 'tianjia':
      return <IconTianjia key="1" {...rest} />;
    case 'saoma':
      return <IconSaoma key="2" {...rest} />;
    case 'shuaxin':
      return <IconShuaxin key="3" {...rest} />;
    case 'iconchengzhang':
      return <IconIconchengzhang key="4" {...rest} />;
    case 'taiyangtianqi':
      return <IconTaiyangtianqi key="5" {...rest} />;
    case 'ziyuan':
      return <IconZiyuan key="6" {...rest} />;
    case 'yun':
      return <IconYun key="7" {...rest} />;
    case 'richu':
      return <IconRichu key="8" {...rest} />;
    case 'jiantou-copy':
      return <IconJiantouCopy key="9" {...rest} />;
    case 'zhexiantu':
      return <IconZhexiantu key="10" {...rest} />;
    case 'jinrujiantouxiao':
      return <IconJinrujiantouxiao key="11" {...rest} />;
    case 'shezhi':
      return <IconShezhi key="12" {...rest} />;
    case 'shizhong':
      return <IconShizhong key="13" {...rest} />;
    case 'zidingyicaidan':
      return <IconZidingyicaidan key="14" {...rest} />;
    case 'kongxinwenhao':
      return <IconKongxinwenhao key="15" {...rest} />;
    case 'baogao':
      return <IconBaogao key="16" {...rest} />;
    case 'xiangji':
      return <IconXiangji key="17" {...rest} />;
    case '4guanbi-2':
      return <Icon4Guanbi2 key="18" {...rest} />;
    case 'weixinsaoma':
      return <IconWeixinsaoma key="19" {...rest} />;
  }

  return null;
};

IconFont = React.memo ? React.memo(IconFont) : IconFont;

export default IconFont;

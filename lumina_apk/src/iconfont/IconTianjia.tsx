/* tslint:disable */
/* eslint-disable */

import React, { FunctionComponent } from 'react';
import { ViewProps } from 'react-native';
import { Svg, GProps, Path } from 'react-native-svg';
import { getIconColor } from './helper';

interface Props extends GProps, ViewProps {
  size?: number;
  color?: string | string[];
}

let IconTianjia: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 64a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h768a64 64 0 0 0 64-64V128a64 64 0 0 0-64-64H128z m0-64h768a128 128 0 0 1 128 128v768a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M704 480a32 32 0 1 1 0 64H320a32 32 0 0 1 0-64h384z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M544 704a32 32 0 1 1-64 0V320a32 32 0 0 1 64 0v384z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

IconTianjia.defaultProps = {
  size: 18,
};

IconTianjia = React.memo ? React.memo(IconTianjia) : IconTianjia;

export default IconTianjia;

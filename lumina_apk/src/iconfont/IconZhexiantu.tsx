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

let IconZhexiantu: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M85.333333 128a42.666667 42.666667 0 0 0-85.333333 0v682.666667a128 128 0 0 0 128 128h853.333333a42.666667 42.666667 0 1 0 0-85.333334H128a42.666667 42.666667 0 0 1-42.666667-42.666666V128z"
        fill={getIconColor(color, 0, '#303133')}
      />
      <Path
        d="M886.485333 332.672a42.666667 42.666667 0 1 0-63.232-57.344l-255.957333 282.24-115.498667-107.776a85.333333 85.333333 0 0 0-121.941333 5.632l-154.709333 173.653333a42.666667 42.666667 0 0 0 63.744 56.746667l154.709333-173.653333 115.498667 107.776a85.333333 85.333333 0 0 0 121.429333-5.077334l255.957333-282.197333z"
        fill={getIconColor(color, 1, '#303133')}
      />
    </Svg>
  );
};

IconZhexiantu.defaultProps = {
  size: 18,
};

IconZhexiantu = React.memo ? React.memo(IconZhexiantu) : IconZhexiantu;

export default IconZhexiantu;

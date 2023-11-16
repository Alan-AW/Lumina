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

let IconYun: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M532 593.4c-1.9 0-3.9-0.2-5.8-0.5-18.2-3.2-30.3-20.6-27.1-38.8C519.6 437.5 620.5 353 739 353c18.5 0 33.5 15 33.5 33.5S757.5 420 739 420c-85.9 0-159.2 61.3-174.1 145.8-2.8 16.1-17 27.6-32.9 27.6z"
        fill={getIconColor(color, 0, '#666666')}
      />
      <Path
        d="M503.3 275.1c77.3 0 149.2 42.7 187.6 111.5 11.8 21.2 34.2 34.3 58.4 34.3h1c2 0 3.9-0.1 5.9-0.3 77.5 1.7 140.1 65.3 140.1 143.3 0 79-64.3 143.3-143.3 143.3H232.3c-57.7 0-104.6-46.9-104.6-104.6 0-56.5 44.5-102.2 101.3-104.1 30.7-1 56.8-22.8 63.3-52.9 21.2-98.8 109.9-170.5 211-170.5M761 420h0.2-0.2M503.3 208.2c-135.8 0-249 95.8-276.4 223.4-92.1 3-166 78.1-166 171 0 94.7 76.8 171.5 171.5 171.5h520.7c116.1 0 210.2-94.1 210.2-210.2S869.1 353.6 753 353.6c-1.3 0-2.4 0.3-3.7 0.4-48.4-86.6-139.8-145.8-246-145.8z"
        fill={getIconColor(color, 1, '#666666')}
      />
    </Svg>
  );
};

IconYun.defaultProps = {
  size: 18,
};

IconYun = React.memo ? React.memo(IconYun) : IconYun;

export default IconYun;

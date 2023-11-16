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

let Icon4Guanbi2: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M109.9 935.8c-19.5-19.5-19.5-51.2 0-70.7l759.3-759.3c19.5-19.5 51.2-19.5 70.7 0s19.5 51.2 0 70.7L180.6 935.8c-19.6 19.6-51.2 19.6-70.7 0z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M869.1 935.8L109.9 176.5c-19.5-19.5-19.5-51.2 0-70.7s51.2-19.5 70.7 0l759.3 759.3c19.5 19.5 19.5 51.2 0 70.7-19.6 19.6-51.2 19.6-70.8 0z"
        fill={getIconColor(color, 1, '#333333')}
      />
    </Svg>
  );
};

Icon4Guanbi2.defaultProps = {
  size: 18,
};

Icon4Guanbi2 = React.memo ? React.memo(Icon4Guanbi2) : Icon4Guanbi2;

export default Icon4Guanbi2;

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

let IconXiangji: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M379.97 181h-0.571c-18.855 0.27-34.999 13.69-38.668 32.238l-11.227 56.755H152c-22.091 0-40 17.91-40 40V803c0 22.091 17.909 40 40 40h720c22.091 0 40-17.909 40-40V309.332c-0.359-21.786-18.13-39.338-40-39.338l-177.505-0.001-11.226-56.755c-3.706-18.736-20.14-32.238-39.24-32.238H379.971z m231.196 80l11.228 56.756 0.115 0.56c3.92 18.444 20.216 31.678 39.124 31.678L832 349.993V763H192V349.993h170.367l0.572-0.003c18.854-0.267 34.998-13.686 38.667-32.234L412.833 261h198.333z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M511.001 382c-90.216 0-163.328 73.214-163.328 163.5S420.785 709 511 709c90.217 0 163.33-73.214 163.33-163.5S601.217 382 511 382z m0 80c46.01 0 83.33 37.372 83.33 83.5S557.01 629 511 629c-46.008 0-83.328-37.372-83.328-83.5S464.993 462 511 462z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconXiangji.defaultProps = {
  size: 18,
};

IconXiangji = React.memo ? React.memo(IconXiangji) : IconXiangji;

export default IconXiangji;

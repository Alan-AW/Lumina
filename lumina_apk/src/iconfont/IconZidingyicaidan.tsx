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

let IconZidingyicaidan: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M576 1024 576 576 1024 576 1024 1024 576 1024ZM576 0 1024 0 1024 448 576 448 576 0ZM0 576 448 576 448 1024 0 1024 0 576ZM0 0 448 0 448 448 0 448 0 0Z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconZidingyicaidan.defaultProps = {
  size: 18,
};

IconZidingyicaidan = React.memo ? React.memo(IconZidingyicaidan) : IconZidingyicaidan;

export default IconZidingyicaidan;

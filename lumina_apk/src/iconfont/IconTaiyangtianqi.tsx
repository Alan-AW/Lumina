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

let IconTaiyangtianqi: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.3 276.6c-130.1 0-235.9 105.8-235.9 235.9s105.8 235.9 235.9 235.9 235.9-105.8 235.9-235.9-105.8-235.9-235.9-235.9z m0 418.2C410.8 694.8 329 613 329 512.5s81.8-182.3 182.3-182.3c100.5 0 182.3 81.8 182.3 182.3s-81.7 182.3-182.3 182.3zM511.3 217c14.8 0 26.8-12 26.8-26.8v-98c0-14.8-12-26.8-26.8-26.8s-26.8 12-26.8 26.8v98c0.1 14.8 12 26.8 26.8 26.8zM264.5 303.6c5.2 5.2 12.1 7.8 18.9 7.8 6.9 0 13.7-2.6 18.9-7.8 10.5-10.5 10.5-27.4 0-37.9L233 196.4a26.738 26.738 0 0 0-37.9 0 26.738 26.738 0 0 0 0 37.9l69.4 69.3zM215.9 512.5c0-14.8-12-26.8-26.8-26.8h-98c-14.8 0-26.8 12-26.8 26.8s12 26.8 26.8 26.8h98c14.8 0 26.8-12 26.8-26.8zM264.5 721.4l-69.3 69.3a26.738 26.738 0 0 0 0 37.9c5.2 5.2 12.1 7.8 18.9 7.8 6.9 0 13.7-2.6 18.9-7.8l69.3-69.3c10.5-10.5 10.5-27.4 0-37.9-10.4-10.4-27.3-10.4-37.8 0zM511.3 808c-14.8 0-26.8 12-26.8 26.8v98c0 14.8 12 26.8 26.8 26.8s26.8-12 26.8-26.8v-98c0-14.8-12-26.8-26.8-26.8zM758.1 721.4a26.738 26.738 0 0 0-37.9 0 26.738 26.738 0 0 0 0 37.9l69.3 69.3c5.2 5.2 12.1 7.8 18.9 7.8 6.9 0 13.7-2.6 18.9-7.8 10.5-10.5 10.5-27.4 0-37.9l-69.2-69.3zM931.6 485.7h-98c-14.8 0-26.8 12-26.8 26.8s12 26.8 26.8 26.8h98c14.8 0 26.8-12 26.8-26.8s-12-26.8-26.8-26.8zM739.2 311.4c6.9 0 13.7-2.6 18.9-7.8l69.3-69.3c10.5-10.5 10.5-27.4 0-37.9a26.738 26.738 0 0 0-37.9 0l-69.3 69.3a26.738 26.738 0 0 0 0 37.9c5.3 5.2 12.1 7.8 19 7.8z"
        fill={getIconColor(color, 0, '#4D4D4D')}
      />
    </Svg>
  );
};

IconTaiyangtianqi.defaultProps = {
  size: 18,
};

IconTaiyangtianqi = React.memo ? React.memo(IconTaiyangtianqi) : IconTaiyangtianqi;

export default IconTaiyangtianqi;

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

let IconBaogao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M728.3 928.2H297.9c-84.2 0-152.8-68.5-152.8-152.8V329.1c0-84.2 68.5-152.8 152.8-152.8H365v60h-67.1c-51.2 0-92.8 41.6-92.8 92.8v446.3c0 51.2 41.6 92.8 92.8 92.8h430.4c51.2 0 92.8-41.6 92.8-92.8V329.1c0-51.2-41.6-92.8-92.8-92.8H661v-60h67.3c84.2 0 152.8 68.5 152.8 152.8v446.3c0 84.3-68.6 152.8-152.8 152.8z"
        fill={getIconColor(color, 0, '#515151')}
      />
      <Path
        d="M593.6 308.1h-161c-49.3 0-89.4-40.1-89.4-89.4v-31.4c0-49.3 40.1-89.4 89.4-89.4h161c49.3 0 89.4 40.1 89.4 89.4v31.4c0 49.3-40.1 89.4-89.4 89.4zM432.6 158c-16.2 0-29.4 13.2-29.4 29.4v31.4c0 16.2 13.2 29.4 29.4 29.4h161c16.2 0 29.4-13.2 29.4-29.4v-31.4c0-16.2-13.2-29.4-29.4-29.4h-161z"
        fill={getIconColor(color, 1, '#515151')}
      />
      <Path
        d="M511.3 477.1H320.1c-16.6 0-30-13.4-30-30s13.4-30 30-30h191.3c16.6 0 30 13.4 30 30s-13.5 30-30.1 30zM576.1 604.1h-256c-16.6 0-30-13.4-30-30s13.4-30 30-30h256.1c16.6 0 30 13.4 30 30s-13.5 30-30.1 30zM640.1 732.1h-320c-16.6 0-30-13.4-30-30s13.4-30 30-30h320.1c16.6 0 30 13.4 30 30s-13.5 30-30.1 30z"
        fill={getIconColor(color, 2, '#515151')}
      />
    </Svg>
  );
};

IconBaogao.defaultProps = {
  size: 18,
};

IconBaogao = React.memo ? React.memo(IconBaogao) : IconBaogao;

export default IconBaogao;

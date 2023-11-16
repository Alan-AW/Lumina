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

let IconKongxinwenhao: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 992C246.912 992 32 777.088 32 512 32 246.912 246.912 32 512 32c265.088 0 480 214.912 480 480 0 265.088-214.912 480-480 480z m0-64c229.76 0 416-186.24 416-416S741.76 96 512 96 96 282.24 96 512s186.24 416 416 416z"
        fill={getIconColor(color, 0, '#000000')}
      />
      <Path
        d="M552 601.696v22.432h-80v-22.432c0-51.296 24.192-99.808 58.816-136.704 26.464-28.224 25.728-27.424 33.28-36.384 19.968-23.776 27.904-40.768 27.904-60.608a80 80 0 1 0-160 0H352a160 160 0 0 1 320 0c0 41.664-15.68 75.2-46.656 112.064-5.216 6.208-10.88 12.576-17.856 20.096-2.688 2.88-5.44 5.888-9.152 9.792l-9.152 9.76c-21.952 23.36-37.184 53.92-37.184 81.984zM545.856 717.984c9.44 9.312 14.144 20.672 14.144 34.016 0 13.6-4.704 24.992-14.144 34.208A46.784 46.784 0 0 1 512 800c-13.12 0-24.448-4.608-33.856-13.792A45.856 45.856 0 0 1 464 752c0-13.344 4.704-24.704 14.144-34.016A46.464 46.464 0 0 1 512 704c13.12 0 24.448 4.672 33.856 13.984z"
        fill={getIconColor(color, 1, '#000000')}
      />
    </Svg>
  );
};

IconKongxinwenhao.defaultProps = {
  size: 18,
};

IconKongxinwenhao = React.memo ? React.memo(IconKongxinwenhao) : IconKongxinwenhao;

export default IconKongxinwenhao;

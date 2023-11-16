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

let IconIconchengzhang: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M993.886041 94.895453l-10.927591 86.128605c-16.952306 143.025029-135.072621 253.346631-283.113249 253.346631l-93.428855 0 0-48.310246 102.321226 0c86.12101 0.997724 231.472462-106.109658 231.472462-237.38965l-172.357542 0c-117.014664 0-231.471462 93.84937-231.471462 226.462259l-0.875007 561.952796-53.774141 0L481.731882 572.039749c0-132.607692-109.219349-237.384453-226.457062-237.384453l-178.150814-5.463696c0 131.248014 151.073372 249.315964 237.38965 248.311845l97.0506-5.463696 0 53.773941L317.942931 625.81369c-123.360961-1.472602-266.713568-104.889885-283.664875-247.883935l-5.463696-102.514295 219.280528 5.463696c82.520451 3.018953 193.578354 66.190123 239.238996 130.499122 0.129112-38.736137 0.204861-54.85201 0.86961-68.599689 16.495816-144.288572 132.579911-242.420239 281.364435-242.420239l224.323709-5.463696L993.886041 94.895453z"
        fill={getIconColor(color, 0, '#272636')}
      />
    </Svg>
  );
};

IconIconchengzhang.defaultProps = {
  size: 18,
};

IconIconchengzhang = React.memo ? React.memo(IconIconchengzhang) : IconIconchengzhang;

export default IconIconchengzhang;

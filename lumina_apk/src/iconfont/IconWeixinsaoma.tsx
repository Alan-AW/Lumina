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

let IconWeixinsaoma: FunctionComponent<Props> = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M128 64H64v192h64V128.1h128.1v-64H128V64zM960.1 63.9h-64v0.2H768v64h128.1v127.8h64v-192zM128 767.6H64v192h64v-0.2h128.1v-64H128V767.6zM960.1 767.6h-64v127.8H768v64h128.1v0.2h64v-192z"
        fill={getIconColor(color, 0, '#080103')}
      />
      <Path
        d="M768.2 255.8v64h-64v-64h64m-448.1 0v64h-64v-64h64m127.7 192h0.3v0.3h-0.3v-0.3m320.4 256v64h-64v-64h64m-448.5 0v64h-64v-64h64m512.5-512h-192v128h-32v-64h-64v64h-32v-128h-64V320h31.5v63.8h-95.5v-192h-192v192H384v64.3h-63.8v-0.1h-128v128h64v63.8h-64.3v192h192V738H449v93.6h64v-64.2h64v-24.9h63.2v89.2h192v-192h-64V576h64V448h-64v-64.3h64V191.8z m-256.3 192h128.2v64.3h-128v64h64v63.7h-64.8v-63.7l-63.2-0.1v-63.9h64v-64.3h-0.2z m-127.8 160v-31.7H481v31.7h-32.9z m-128 32v-63.7h64v64h31.7v31.8H481v31.7h-32v34.5h-65.3v-34.2h-31.6v-64h-32v-0.1zM577 678.6v-38.8h63.2v-63.7h64v-32h64v31.7h-64v64h-64v38.8H577z"
        fill={getIconColor(color, 1, '#080103')}
      />
    </Svg>
  );
};

IconWeixinsaoma.defaultProps = {
  size: 18,
};

IconWeixinsaoma = React.memo ? React.memo(IconWeixinsaoma) : IconWeixinsaoma;

export default IconWeixinsaoma;

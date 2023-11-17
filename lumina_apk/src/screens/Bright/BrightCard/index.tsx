import React from 'react';
import AutoText from 'src/components/AutoView/Text';
import AutoView from 'src/components/AutoView/View';
import {IconButton} from 'src/components/Button';
import { ViewProps } from 'react-native';
import ShadowCard from 'src/components/Shadow';
import { IconIconchengzhang, IconRichu, IconTaiyangtianqi, IconYun, IconZiyuan } from 'src/iconfont';
import { adaptationConvert, useInlineStyle } from 'src/helpers/style';

type BrightCardProps={
  index:number
  item:any,
}

const children:any={
  0:<IconTaiyangtianqi size={adaptationConvert(26)} color={'#b7a02e'} />,
  1:<IconZiyuan size={adaptationConvert(26)} color={'#129e8a'}  />,
  2:<IconRichu  size={adaptationConvert(26)} color={'#fd8112'}  />,
  3:<IconYun size={adaptationConvert(26)} color={'#177fa1'}  />,
  4:<IconIconchengzhang size={adaptationConvert(26)} color={'#559f19'} />,
}
const btnColor:any={
  0:'#fef7c6',
  1:'#e1f5f2',
  2:'#fee5c6',
  3:'#e1f0f5',
  4:'#daebc6',
}

const BrightCard = (props:ViewProps & BrightCardProps) => {
  let value=37;
  const {index}=props;
  if(index>1){
    value=42
  }
  if(index===4){
    value=0
  }
  
  return (
    <ShadowCard style={useInlineStyle({backgroundColor: '#fff', padding: 32,borderRadius:10,marginRight:value,width:350})}>
      <AutoView isRow>
        <IconButton style={useInlineStyle({backgroundColor:btnColor[props.index],width:50,height:50,justifyContent:'center',alignItems:'center',borderRadius:10,})}>{children[props.index]}</IconButton>
        <AutoText style={{paddingLeft:15,color:'#000'}} type='medium'>{props.item.name}</AutoText>
      </AutoView>
      <AutoView style={{marginTop:32}}>
        <AutoText size={26} style={{color:'#000'}}>{props.item.label1}</AutoText>
        <AutoText size={24} style={{paddingTop:10}}>Water Level</AutoText>
      </AutoView>
      <AutoView style={{marginTop:32}}>
        <AutoText size={26} style={{color:'#000'}}>{props.item.label2}</AutoText>
        <AutoText size={24} style={{paddingTop:10}}>EC</AutoText>
      </AutoView>
      <AutoView style={{marginTop:32}}>
        <AutoText size={26} style={{color:'#000'}}>{props.item.label3}</AutoText>
        <AutoText size={24} style={{paddingTop:10}}>Water Level</AutoText>
      </AutoView>
    </ShadowCard>
  );
};

export default BrightCard;

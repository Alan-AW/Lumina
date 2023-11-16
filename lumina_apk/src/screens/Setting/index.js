import React from 'react';
import AutoView from 'src/components/AutoView/View';
import SelectLanguage from './SelectLanganug';

const Setting = () => {
  return (
    <AutoView style={{flex: 1}}>
      <AutoView isRow>
        <SelectLanguage />
      </AutoView>
    </AutoView>
  );
};

export default Setting;

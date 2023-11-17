import React from 'react';
import AutoView from 'src/components/AutoView/View';
import SelectLanguage from './SelectLanganug';
import ViewContainer from 'src/components/ViewContainer';

const Setting = () => {
  return (
    <ViewContainer style={{flex: 1}}>
      <AutoView isRow>
        <SelectLanguage />
      </AutoView>
    </ViewContainer>
  );
};

export default Setting;

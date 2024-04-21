import React, { useState } from 'react'
import { RadioGroup } from "react-native-radio-buttons-group";


export default function CustomRadioGroup(props) {
    const [selected, setSelected] = useState('');
    return (
        <RadioGroup
            containerStyle={{ flexDirection: 'row' }}
            radioButtons={props.data}
            labelStyle={{color:'#444'}}
            onPress={(v,row) => {
                setSelected(v);
                props.onChange(v,row);
            }}
            selectedId={selected}
        />
    )
}
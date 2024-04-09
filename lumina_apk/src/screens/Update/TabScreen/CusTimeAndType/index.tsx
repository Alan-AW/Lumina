
import React, { useEffect, useRef, useState } from 'react';
import AutoText from 'src/components/AutoView/Text';
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import colors from 'src/constants/colors';
import CusOption from '../CusOption';
import CusTime from '../CusTime';
import { updateArr } from '../../data';

interface CusTimeAndTypeProps{
    actions:any,
    optionKey:string,
    timeKey:string,
    

}

export default function CusTimeAndType(props:CusTimeAndTypeProps) {
    const { actions, optionKey, timeKey } = props


    const [selectOption,setSelectOption]=useState(actions[optionKey])

  

    return (
        <>
            <CusOption label="fade_curve_type" value={actions[optionKey]} data={['linear', 'exponential', 'none']} updateKey={optionKey} onChange={(v)=>{
                if(v==='none'){
                    updateArr({
                        [timeKey]:'00:00:00',
                    })
                }
                setSelectOption(v)
            }} />
            <CusTime disabled={selectOption==='none'} label='fade_curve_duration' value={actions[timeKey]} updateKey={timeKey} maxHour={3} isSpan={true}/>

           
        </>
    )
}
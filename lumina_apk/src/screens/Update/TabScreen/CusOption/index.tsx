
import React, { useRef, useState } from 'react';
import AutoText from 'src/components/AutoView/Text';
import SpaceBetween from 'src/components/FlexView/SpaceBetween';
import PickModal from 'src/components/PickModal';
import colors from 'src/constants/colors';
import { updateArr } from '../../data';

interface CusOptionProps {
    label: string;
    value: string;
    data: any[];
    updateKey: string;
    onChange?:(value: string) => void;

}

export default function CusOption(props: CusOptionProps) {
    const { value, data, label, updateKey,onChange } = props;

    const [currentType, setCurrentType] = useState(value)
    const openSelectRef = useRef<any>(null)

    const handleCallback = (value: string) => {
        setCurrentType(value)
        onChange?.(value)
        updateArr({ [updateKey]: value })
    }


    return (
        <>
            <SpaceBetween style={{ width: '100%', paddingVertical: 32 }} onPress={() => openSelectRef.current.open()}>
                <AutoText>{label}</AutoText>
                <AutoText style={{ color: colors.checked }}>{currentType}</AutoText>
            </SpaceBetween>
            <PickModal ref={openSelectRef} data={data} onChange={handleCallback} />

        </>
    )
}
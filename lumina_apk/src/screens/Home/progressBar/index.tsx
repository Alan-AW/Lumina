import React from "react";
import CustView from "src/components/FlexView/CustView";

interface BarProps{
    value:number | string;
}

const MyCustomProgressBar = (props:BarProps) => {
    return (
      <CustView
        style={{
          width: '100%',
          height: 8,
          backgroundColor: '#f4f4f4',
          borderRadius: 100,
          position: 'relative',
        }}>
        <CustView
          style={{
            width: `${props.value}%`,
            backgroundColor: '#559e18',
            height: '100%',
            position: 'absolute',
            left: 0,
            borderRadius: 100,
          }}
        />
      </CustView>
    );
  };

  export default MyCustomProgressBar;
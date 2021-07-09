import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Image from 'next/image'




const SpeedUpWrapper = styled.div`
   width: 100px;
   height: 100px;
   position: absolute;
   bottom: 100px;
   left: 50px;
   border-radius: 50%;
   display: flex;
   align-items: center;
   background: rgba(203,203,203,0.7);
   justify-content: center;
   transform: rotate(90deg);
   &:active{
       background: rgba(123,124,123);
   }
`;

interface Props {
    changeSpeed: (v: number) => void;
}
const SpeedUp = ({ changeSpeed }: Props) => {


    return (
        <SpeedUpWrapper
            onTouchStart={() => {
                changeSpeed(100)
            }}
            onTouchEnd={() => {
                changeSpeed(200)
            }}
        >
            <Image {...{ src: `/speedUp.svg`, alt: '', width: 38, height: 78 }} />
        </SpeedUpWrapper>
    )
}

export default SpeedUp
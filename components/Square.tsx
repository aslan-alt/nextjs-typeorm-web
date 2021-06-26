import React from 'react'
import styled from 'styled-components'
const SquareBox = styled.div`
    @keyframes flash {
        0%{ transform: rotateY(0) rotateX(0); }
        100%{ transform: rotateY(360deg) rotateX(360deg); }
    }
    width: 14px;
    height: 14px;
    top:-12px;
    left:-26px;
    position: absolute;
    margin: 14px auto 0;
    transform-style: preserve-3d;
    animation: flash 4s linear infinite;
    &:hover{
        div{
            background: #046D02;
        }
    }
    div {
      border:1px solid white;
      position: absolute;
      width: 14px;
      height: 14px;
      transition: all 1s;
      display: flex;
      justify-content: center;
      align-items: center;      
    }
    div:nth-of-type(1){ transform: translateZ(-7px); }
    div:nth-of-type(2){  transform: rotateX(90deg) translateZ(7px); }
    div:nth-of-type(3){  transform: rotateX(90deg) translateZ(-7px); }
    div:nth-of-type(4){  transform: rotateY(90deg) translateZ(7px);}
    div:nth-of-type(5){  transform: rotateY(90deg) translateZ(-7px);}
    div:nth-of-type(6){  transform: translateZ(7px);  }
  
`

export default function Square() {
    return (
        <SquareBox>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </SquareBox>
    )
}

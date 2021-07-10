import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

type E = React.TouchEvent<HTMLDivElement>
type PositionXY = { left: number, top: number }

const ControllerWrapper = styled.div`
    position:absolute;
    top: 100px;
    left: 100px;
    .rockerBackground{
        width: 200px;
        height: 200px;
        background: rgba(123,124,123,0.3);
        border-radius: 50%; 
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top:-100px ;
    }
    .rocker{
        width: 100px;
        height: 100px;
        background: rgba(186,187,186,0.9);
        border-radius: 50%;
        position: absolute;
        top:50%;
        left: 50%;
        margin-left:-50px;
        margin-top:-50px ;
    }
    .rockerBase{
        width: 200px;
        height: 200px;
        border-radius: 50%;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -100px;
        margin-top: -100px;
    }
`;

interface Props {
    changeDirection: (newDirection: setDirectionOptions) => void;
    direction: Direction;
}
const Controller = (props: Props) => {
    const { changeDirection, direction } = props
    let r = 50, r2 = 100;//摇杆的半径 底盘的半径
    const refDiv1 = useRef<HTMLDivElement>(null)
    const [startPosition, setStartPosition] = useState({ x: 0, y: 0 })
    const [rockerCenter, setRockerCenter] = useState({ x: 0, y: 0 })
    let rocker = refDiv1.current as HTMLDivElement;

    const onTouchStart = (e: E) => {
        const { clientX, clientY } = e.changedTouches[0]
        setStartPosition({ x: clientX, y: clientY })
    }
    const onTouchEnd = (e: E) => {
        rocker.style.left = 0 + 'px'
        rocker.style.top = 0 + 'px'
    }
    const onTouchMove = (e: E) => {
        const { clientX, clientY } = e.changedTouches[0]
        const distanceY = startPosition.y - clientY
        const distanceX = startPosition.x - clientX

        if (Math.abs(distanceY) > Math.abs(distanceX)) {
            if (distanceY < 0) {
                changeDirection({ oldDirection: direction, newDirection: 'ArrowDown' })
            } else {
                changeDirection({ oldDirection: direction, newDirection: 'ArrowUp' })
            }
        } else {
            if (distanceX > 0) {
                changeDirection({ oldDirection: direction, newDirection: 'ArrowLeft' })
            } else {
                changeDirection({ oldDirection: direction, newDirection: 'ArrowRight' })
            }
        }
        const { x, y } = rockerCenter

        let d = Math.sqrt(Math.pow(clientX - x, 2) + Math.pow(clientY - y, 2))
        d = d > r2 - r ? r2 - r : d;
        let radin = Math.atan2(clientY - y, clientX - x)
        let vx = x + Math.cos(radin) * d;
        let vy = y + Math.sin(radin) * d;

        rocker.style.left = vx + 'px'
        rocker.style.top = vy + 'px'

    }

    useEffect(() => {
        let rocker = refDiv1.current as HTMLDivElement;
        setRockerCenter({ x: rocker.offsetLeft + r, y: rocker.offsetTop + r })
    }, [rocker])
    return (
        <ControllerWrapper>
            <div className="rockerBackground"></div>
            <div className="rocker" ref={refDiv1} style={{ left: rockerCenter.x, top: rockerCenter.y }}></div>
            <div className="rockerBase" {...{ onTouchStart, onTouchMove, onTouchEnd }}></div>
        </ControllerWrapper>
    )
}

export default Controller
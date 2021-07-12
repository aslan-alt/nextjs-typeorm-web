import React from 'react'
import styled from 'styled-components'

const StartWrapper = styled.div`
    width: 100vw;
    height: 100vw;
    background: radial-gradient(200% 100% at bottom center,#f7f7b6,#e96f92,#1b2947);
    background: radial-gradient(220% 105% at top center,#1b2947 10%,#75517d 40%,#e96f92 65%,#f7f7b6);
    background-attachment: fixed;
    overflow: hidden;
    display: flex;
    justify-content: center;
    @keyframes rotate {
        0% {
            transform: perspective(400px) rotateZ(20deg) rotateX(-400deg) rotateY(0);
        }
        100% {
            transform: perspective(400px) rotateZ(20deg) rotateX(-400deg)
            rotateY(-360deg);
        }
    }
    .stars {
        transform: perspective(500px);
        transform-style: preserve-3d;
        position: absolute;
        perspective-origin: 50% 100%;
        left: 50%;
        animation: rotate 90s infinite linear;
        bottom: 0;
    }
    .star {
        width: 4px;
        height: 4px;
        background: #f7f7b8;
        position: absolute;
        top: 0;
        left: 0;
        backface-visibility: hidden;
    }
    
`;


const createStart = () => {
    const startList = []
    for (let i = 0; i < 800; i++) {
        startList.push(i)
    }
    return startList
}
interface Props {
    children: React.ReactNode
}

export default function Stars(props: Props) {
    const { children } = props
    return (
        <StartWrapper>
            {
                <div className="stars">
                    <div className="start"></div>
                    {
                        createStart().map(item => {
                            const speed = 0.2 + Math.random() * 1;
                            var thisDistance = 800 + Math.random() * 300;
                            const style = {
                                transformOrigin: `0 0 ${thisDistance}px`,
                                transform: `translate3d(0,0,-${thisDistance}px) rotateY(${Math.random() * 360}deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`
                            }
                            return <div className="star" key={item} style={style}></div>
                        })
                    }
                </div>
            }
            {children}
        </StartWrapper>
    )
}

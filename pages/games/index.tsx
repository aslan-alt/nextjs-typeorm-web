
import Link from 'next/link';
import { useEffect, useState } from 'react';
import cs from 'classnames'
import styled from 'styled-components'
const GamesPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    background: #9293FE;
    @keyframes jump {
        0% {
            bottom: 114px;
        }
        33%{
            bottom: auto;
            top: calc(50% + 100px);
        }
        100% {
            top:auto;
            bottom: 114px;
        }
    }
    .cloud1{
        height: 130px;
        position: absolute;
        left: 25%;
    }
    .cloud2{
        height: 180px;
        position: absolute;
        top: 10%;
        left: 52%;
    }
    .ground{
        height: 120px;
        width: 100vw;
        position: absolute;
        left: 0;
        bottom: 0;
        background-image:url('/ground.png')
    }
    .mountain{
        height: 120px;
        position: absolute;
        left: 0;
        bottom: 120px;
    }
    .pipe{
        position: absolute;
        width: 188px;
        right: 25%;
        bottom: 118px;
    }
    .noun{
        position: absolute;
        width: 100px;
        left: 38%;
        top:16%;
    }
    .noun2{
        position: absolute;
        width: 100px;
        left: 10%;
        top: 50%;
    }
    .mario{
        height: 100px;
        position: absolute;
        left: 31.5%;
        bottom: 114px;
   
       
    }
   .game-wrapper{
       position: absolute;
       height: 160px;
       left: 32%;
       display: flex;
       width: 410px;
       justify-content: space-around;
       top: 50%;
       .game-snack{
            position: absolute;
            left: 0;
            img{
                height: 100px;
                border-radius: 4px;
            }
            &:active{
                
            }
        }
        .wall{
            position: absolute;
            left: 100px;
            height: 100px;
        }
        .wall2{
            position: absolute;
            left: 300px;
            height: 100px;
        }
        .game-item{
            position: absolute;
            left: 200px;
            img{
                height: 100px;
                border-radius: 4px;
            }
        }
       
   }    
   
   
   
`

const Games = () => {
    const [jump, setJump] = useState(false)

    useEffect(() => {
        const w = document.documentElement.clientWidth;
        console.log(w);
        window.oncontextmenu = function (e) {
            e.preventDefault();
        }
        document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
            var e = event || window.event || arguments.callee.caller.arguments[0];
            if (e && e.keyCode == 123) {
                e.returnValue = false;
                return (false);
            }
        }
    }, [])
    // const  = 
    return (
        <GamesPage>
            <img className="cloud1" src="/cloud1.png" />
            <img className="cloud2" src="/cloud2.png" />
            <img className="noun" src="/noun.png" />
            <img className="noun2" src="/noun.png" />
            <div className="game-wrapper">
                <div className="game-snack">
                    <img src="/snack.png" alt="snack" />
                </div>
                <img src="/wall.png" alt="wall" className="wall" />
                <div className="game-item">
                    <Link href="/games/snack">
                        <a>
                            <img src="/snack.png" alt="snack" />
                        </a>
                    </Link>
                </div>
                <img src="/wall.png" alt="wall" className="wall2" />
            </div>
            <img src="/pipe.png" alt="pipe" className="pipe" />
            <img src="/mario.png" alt="mario" className="mario" />
            <img src="/mountain.png" alt="mountain" className="mountain" />
            <div className="ground"></div>
        </GamesPage>
    );
};
export default Games;


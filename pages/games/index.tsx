import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { message } from 'antd';
import cs from 'classnames'
import { NextPage } from 'next';



const GamesPage = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    background: #9293FE;
    @keyframes jump {
        from{
            bottom: 114px;
        }
        to{
            bottom: auto;
            top: calc(50% + 100px);
        }
    }
    @keyframes shake { /* 水平抖动，核心代码 */
        10%, 90% { transform: translate3d(0, -2px, 0); }
        20%, 80% { transform: translate3d(0, +4px, 0); }
        30%, 70% { transform: translate3d(0, -8px, 0); }
        40%, 60% { transform: translate3d(0, +8px, 0); }
        50% { transform: translate3d(0, -8px, 0); }
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
        &.jump{
            animation: jump .1s linear;
        }
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
            height: 100px;
            border-radius: 4px;
            &.jump{
                animation: shake .8s linear;
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
        .game-fruit{
            position: absolute;
            left: 200px;
            height: 100px;
            border-radius: 4px;
        }
   }    
   
   
   
`

const Games = () => {

    const [jump, setJump] = useState(false)
    const router = useRouter()
    const goToSnack = () => {
        setJump(!jump)
        setTimeout(() => {
            router.push('/games/snack')
        }, 1000)
    }
    const goToOther = () => {
        message.info('敬请期待，先玩玩贪吃蛇吧', 3);
    }
    useEffect(() => {
        document.onkeyup = (e) => {
            console.log(e.code)
            if (e.code === 'Space') {
                goToSnack()
            }
        }
        message.info('点击图标，或者输入空格选择游戏哈!', 3);
    }, [])

    return (
        <GamesPage>
            <img className="cloud1" src="/cloud1.png" />
            <img className="cloud2" src="/cloud2.png" />
            <img className="noun" src="/noun.png" />
            <img className="noun2" src="/noun.png" />
            <div className="game-wrapper">
                <img className={cs("game-snack", jump && 'jump')} src="/snack.png" alt="snack" onClick={goToSnack} />
                <img src="/wall.png" alt="wall" className="wall" />
                <img className="game-fruit" src="/fruit.jpg" alt="fruit" onClick={goToOther} />
                <img src="/wall.png" alt="wall" className="wall2" />
            </div>
            <img src="/pipe.png" alt="pipe" className="pipe" />
            <img src="/mario.png" alt="mario" className={cs("mario", jump && 'jump')} onClick={goToSnack} />
            <img src="/mountain.png" alt="mountain" className="mountain" />
            <div className="ground"></div>
        </GamesPage>
    );
};
export default Games;




import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import GamesPageWrapper from './style'
import { notification, message, Modal } from 'antd';
import cs from 'classnames'
import { inputSpaceToSnack } from './methods';


const Games = () => {
    const router = useRouter()
    const [jump, setJump] = useState(false)
    const [isPhone, setIsPhone] = useState<'phone'>(null)
    const [modal, contextHolder] = Modal.useModal();

    const goToSnack = () => {
        setJump(!jump)
        setTimeout(() => {
            router.push('/games/snack')
        }, 1000)
    }

    const goToOther = () => {
        if (isPhone) {
            notification.open({
                message: 'tips:',
                style: { transform: `rotate(90deg)`, top: 110, left: 170 },
                description: '敬请期待，先玩玩贪吃蛇吧',
            });
        } else {
            message.info('敬请期待，先玩玩贪吃蛇吧', 3);
        }
    }
    useEffect(() => {
        const w = document.documentElement.clientWidth;
        if (w < 750) {
            modal.confirm({ onOk: () => { setIsPhone('phone') }, title: '通知', content: '将为您切换到竖屏' })
        } else {
            message.info('点击图标，或者输入空格选择游戏哈!', 3);
        }
        const leaveCallback = inputSpaceToSnack(goToSnack)
        return leaveCallback
    }, [])


    return (
        <GamesPageWrapper className={isPhone}>
            <img className="cloud1" src="/cloud1.png" />
            <img className="cloud2" src="/cloud2.png" />
            <img className="noun" src="/noun.png" />
            <img className="noun2" src="/noun.png" />
            <img src="/pipe.png" alt="pipe" className="pipe" />
            <img src="/mountain.png" alt="mountain" className="mountain" />
            <div className="game-wrapper">
                <img className={cs("game-snack", jump && 'jump')} src="/snack.png" alt="snack" onClick={goToSnack} />
                <img src="/wall.png" alt="wall" className="wall" />
                <img className="game-fruit" src="/fruit.jpg" alt="fruit" onClick={goToOther} />
                <img src="/wall.png" alt="wall" className="wall2" />
            </div>

            <img src="/mario.png" alt="mario" className={cs("mario", jump && 'jump')} onClick={goToSnack} />

            <div className="ground"></div>
            {contextHolder}
        </GamesPageWrapper>

    );
};
export default Games;

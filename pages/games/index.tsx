import {useEffect, useRef, useState} from 'react';
import {notification, message, Modal} from 'antd';
import cs from 'classnames';
import Image from 'next/image';
import {useRouter} from 'next/router';
import {alertByWidth, inputSpaceToSnack} from 'lib/game';
import {GamesPage} from '../../styles/gameStyle';

const Games = () => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>();
  const [jump, setJump] = useState(false);

  const [isPhone, setIsPhone] = useState<'phone'>(null);
  const [imgList, setImgList] = useState<string[]>([
    'cloud1',
    ,
    'cloud2',
    'noun',
    'pipe',
    'mountain',
  ]);
  const [modal, contextHolder] = Modal.useModal();

  const goToSnack = () => {
    setJump(!jump);
    const {width, height} = getWidthAndHeight();
    setTimeout(() => {
      router.push({pathname: '/games/snack', query: {width, height}});
    }, 1000);
  };
  const getWidthAndHeight = () => {
    const width = ref.current?.clientWidth;
    const height = ref.current?.clientHeight;
    return {width, height};
  };

  const goToOther = () => {
    if (isPhone) {
      notification.open({
        message: 'tips:',
        style: {transform: `rotate(90deg)`, top: 110, left: 170},
        description: '敬请期待，先玩玩贪吃蛇吧',
      });
    } else {
      message.info('敬请期待，先玩玩贪吃蛇吧', 3);
    }
  };

  useEffect(() => {
    const {width} = getWidthAndHeight();
    alertByWidth({
      width,
      modal,
      onOk: () => {
        setIsPhone('phone');
      },
      onCancel: () => {
        setImgList(['cloud1']);
      },
    });
    return inputSpaceToSnack(goToSnack);
  }, []);

  return (
    <GamesPage className={isPhone} ref={ref}>
      {imgList.map((imgName, index) => (
        <Image key={index} className={imgName} src={`/${imgName}.png`} alt={imgName} />
      ))}
      <Image src="/noun.png" alt="noun" className="noun2" />
      <div className="game-wrapper">
        <Image
          className={cs('game-snack', jump && 'jump')}
          src="/snack.png"
          alt="snack"
          onClick={goToSnack}
        />
        <Image src="/wall.png" alt="wall" className="wall" />
        <Image className="game-fruit" src="/fruit.jpg" alt="fruit" onClick={goToOther} />
        <Image src="/wall.png" alt="wall" className="wall2" />
      </div>
      <Image
        src="/mario.png"
        alt="mario"
        className={cs('mario', jump && 'jump')}
        onClick={goToSnack}
      />
      <div className="ground"></div>
      {contextHolder}
    </GamesPage>
  );
};
export default Games;

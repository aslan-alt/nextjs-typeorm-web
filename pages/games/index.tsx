import {useEffect, useRef} from 'react';
import {notification, message, Modal} from 'antd';
import gsap from 'gsap';
import {GetServerSideProps} from 'next';
import {useRouter} from 'next/router';
import styled from 'styled-components';
import {UAParser} from 'ua-parser-js';
import {BasicBackground} from '@components/BasicBackground';
import {getImageFullUrl} from '@lib/index';
import {withMobile} from '@styles/styleHelper';
import {inputSpaceToSnack} from 'lib/game';

const Games = ({isPhone}: {isPhone: boolean}) => {
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const [modal, contextHolder] = Modal.useModal();

  const goToSnack = () => {
    const {width, height} = getWidthAndHeight();

    gsap.to('#game-snack', {
      duration: 0.6,
      ease: 'none',
      keyframes: [
        {transform: 'translate3d(0, -2px, 0)', time: 0.1},
        {transform: 'translate3d(0, 4px, 0)', time: 0.2},
        {transform: 'translate3d(0, -8px, 0)', time: 0.3},
        {transform: 'translate3d(0, 8px, 0)', time: 0.4},
        {transform: 'translate3d(0, -8px, 0)', time: 0.5},
        {transform: 'translate3d(0, 8px, 0)', time: 0.6},
        {transform: 'translate3d(0, -8px, 0)', time: 0.7},
        {transform: 'translate3d(0, 4px, 0)', time: 0.8},
        {transform: 'translate3d(0, -2px, 0)', time: 0.9},
        {transform: 'translate3d(0, 4px, 0)', time: 0.8},
        {transform: 'translate3d(0, 0, 0)', time: 1},
      ],
    });
    gsap.to('#mario', {
      duration: 0.06,
      ease: 'none',
      bottom: window.innerHeight / 2 - 114 * 2,
      yoyo: true,
      repeat: 1,
    });
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
    if (isPhone) {
      modal.confirm({
        title: '通知',
        content: (
          <div>
            <p>将为您切换到竖屏</p>
            <p>点击您要玩的游戏或者马里奥，都可以开始哦</p>
          </div>
        ),
      });
    } else {
      message.info('点击图标，或者输入空格选择游戏哈!', 10);
    }
    return inputSpaceToSnack(goToSnack);
  }, []);

  return (
    <GamesPage ref={ref}>
      <Cloud1 src={getImageFullUrl('cloud1')} alt="cloud1" />
      <Cloud2 src={getImageFullUrl('cloud2')} alt="cloud2" />
      <Noun src={getImageFullUrl('noun')} alt="noun" />
      <Pipe src={getImageFullUrl('pipe')} alt="pipe" />
      <Mountain src={getImageFullUrl('mountain')} alt="mountain" />
      <Noun2 src={getImageFullUrl('noun')} alt="noun2" />
      <GameWrapper>
        <SnackImg id="game-snack" src={getImageFullUrl('snack')} alt="snack" onClick={goToSnack} />
        <StyledWall src={getImageFullUrl('wall')} alt="wall" />
        <FruitImg src={getImageFullUrl('fruit')} alt="fruit" onClick={goToOther} />
        <StyledWall2 src={getImageFullUrl('wall')} alt="wall" />
      </GameWrapper>
      <Mario id="mario" src={getImageFullUrl('mario')} alt="mario" onClick={goToSnack} />
      <Background height="120px" width="100vw" image={getImageFullUrl('ground')} />
      {contextHolder}
    </GamesPage>
  );
};

const StyledWall = styled.img`
  position: absolute;
  left: 100px;
  height: 100px;
  ${withMobile(`
    transform: rotate(360deg);
    left: 45px;
    height: 45px;
  `)};
`;

const StyledWall2 = styled(StyledWall)`
  position: absolute;
  left: 300px;

  ${withMobile(`
    height: 45px;
  `)};
`;

const GameWrapper = styled.div`
  position: absolute;
  height: 160px;
  left: 32%;
  display: flex;
  width: 410px;
  justify-content: space-around;
  top: 50%;
  ${withMobile(`
      transform: rotate(90deg);
      width: 200px;
      top: 38%;
      left: 5%;
  `)};
`;

const Background = styled(BasicBackground)`
  position: absolute;
  left: 0;
  bottom: 0;
  ${withMobile(`bottom: auto;
      top: 0;
      height: 100vh;
      width: 20px;
      background: #9a4900;
      border-right: 2px solid black;`)}
`;

const Mario = styled.img`
  height: 100px;
  position: absolute;
  left: 31.5%;
  bottom: 114px;
  ${withMobile(`transform: rotate(90deg);
      height: 60px;
      top: 34.5%;
      left: 2%;`)};
`;

const SnackImg = styled.img`
  position: absolute;
  left: 0;
  height: 100px;
  border-radius: 4px;
  ${withMobile(`
   transform: rotate(360deg);
   left: 0;
   height: 45px;
   border-radius: 4px;
  `)};
`;

const FruitImg = styled.img`
  position: absolute;
  left: 200px;
  height: 100px;
  border-radius: 4px;
  ${withMobile(`
    transform: rotate(360deg);
    left: 90px;
    height: 45px;
    border-radius: 4px;
  `)};
`;

const Cloud1 = styled.img`
  position: absolute;
  height: 130px;
  left: 25%;
  ${withMobile(`
      height: 80px;
      transform: rotate(90deg);
      left: 68%;
      top: 12%;
  `)};
`;

const Cloud2 = styled.img`
  position: absolute;
  height: 180px;
  top: 10%;
  left: 52%;
  ${withMobile(`
    height: 100px;
    transform: rotate(90deg);
    top: 58%;
    left: 52%;
  `)};
`;

const Noun = styled.img`
  position: absolute;
  width: 100px;
  left: 38%;
  top: 16%;
  ${withMobile(`
    transform: rotate(90deg);
    width: 50px;
    left: 38%;
    top: 16%;
  `)};
`;

const Pipe = styled.img`
  position: absolute;
  width: 188px;
  right: 25%;
  bottom: 118px;
  ${withMobile(`
    transform: rotate(90deg);
    width: 90px;
    left: 3%;
  `)};
`;

const Mountain = styled.img`
  height: 120px;
  position: absolute;
  left: 0;
  bottom: 120px;
  ${withMobile(`
    height: 80px;
    transform: rotate(90deg);
    left: -55px;
    top: 8%;
  `)};
`;

const Noun2 = styled.img`
  position: absolute;
  width: 100px;
  left: 10%;
  top: 50%;
  ${withMobile(`
    transform: rotate(90deg);
    width: 50px;
    left: 70%;
    top: 35%;
  `)};
`;

const GamesPage = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  background: #9293fe;
  ${withMobile(`
    position: fixed;
    right: 0;
    top: 0;
  `)};
`;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAgentString = context.req.headers['user-agent'];
  const result = new UAParser(userAgentString).getResult();
  const deviceType = result.device.type;
  const osName = result.os.name;
  const browserName = result.browser.name;

  // 判断设备类型
  const isPhone = (() => {
    const notIsPC = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      userAgentString ?? ''
    );
    return (
      deviceType === 'mobile' ||
      notIsPC ||
      osName === 'iOS' ||
      (osName === 'Android' && browserName === 'Chrome Mobile')
    );
  })();

  // 进一步根据操作系统和浏览器信息判断

  return {
    props: {
      isPhone,
    },
  };
};
export default Games;

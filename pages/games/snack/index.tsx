import React, {useEffect, useRef} from 'react';
import {Modal} from 'antd';
import styled from 'styled-components';
import {getDeviceByContext} from '@lib/getDeviceByContext';
import Controller from 'components/Controller';
import SpeedUp from 'components/SpeedUp';
import useDialog from 'hooks/Snack/useDialog';
import useDirection from 'hooks/Snack/useDirection';
import useSnackBody from 'hooks/Snack/useSnackBody';
import useSnackFood from 'hooks/Snack/useSnackFood';
import useSnackHead from 'hooks/Snack/useSnackHead';
import {getHeadAndBody} from 'lib/game/snack';

const Snack = ({isPhone}: {isPhone: boolean}) => {
  const {current} = useRef({count: 0});

  const [modal, contextHolder] = Modal.useModal();
  const {DialogNode, mobileModal} = useDialog();

  const {initBody, initHead} = getHeadAndBody(isPhone);

  const {
    direction,
    currentRule,
    isRun,
    speed,
    setDirection,
    changeDirection,
    setIsRun,
    changeSpeed,
  } = useDirection();

  const {foodList, foodsView, deleteEatenFoodAndCreateNewFood} = useSnackFood(isPhone);

  const {
    snackHead,
    snackHeadView,
    lastHead,
    findCurrentEatenFood,
    checkingStatusAndFeedback,
    setSnackHead,
  } = useSnackHead({initHead, direction, isRun, speed, currentRule, mobileModal, isPhone});
  const {changeSnackBody, snackBody, snackBodyView, setsNackBody} = useSnackBody({initBody});

  const initHeadAndBody = () => {
    setsNackBody(initBody);
    setSnackHead(initHead);
    setDirection('arrowDown');
  };

  useEffect(() => {
    if (isPhone) {
      mobileModal({
        title: '开始游戏',
        onOk: () => {
          setIsRun(true);
        },
        onCancel: () => {
          location.href = '/';
        },
      });
    } else {
      modal.confirm({
        title: 'PC端按键提示',
        content: (
          <div>
            <p>方向键：上 ｜ 下 ｜ 左 ｜ 右</p>
            <p>开始：空格键</p>
            <p>暂停：空格键</p>
            <p>加速键：Q</p>
          </div>
        ),
        onOk: () => {},
      });
    }
  }, [isPhone]);

  useEffect(() => {
    if (isRun) {
      if (current.count === 0) {
        current.count += 1;
      } else {
        const eatFood = findCurrentEatenFood(foodList);
        if (eatFood) {
          deleteEatenFoodAndCreateNewFood(eatFood);
          changeSnackBody(lastHead, 'add');
        } else {
          changeSnackBody(lastHead);
        }
      }
    }
  }, [isRun, lastHead, foodList]);

  useEffect(() => {
    checkingStatusAndFeedback({snackBody, initHeadAndBody});
  }, [isRun, snackHead]);

  return (
    <Map>
      {snackHeadView}
      {snackBodyView}
      {foodsView}

      {isPhone && (
        <>
          <Controller {...{changeDirection, direction}} />
          <SpeedUp {...{changeSpeed}} />
        </>
      )}
      {contextHolder}
      {DialogNode}
    </Map>
  );
};

const Map = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #fefffe;
`;

export const getServerSideProps = getDeviceByContext;

export default Snack;

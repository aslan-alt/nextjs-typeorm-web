import {useState} from 'react';
import {Modal} from 'antd';
import styled from 'styled-components';
import {sleep} from 'lib';
import {SnackBodyItem} from './useSnackBody';

interface Props {
  direction: Direction;
  isRun: boolean;
  speed: number;
  initHead: {
    x: number;
    y: number;
  };
  currentRule: {
    key: string;
    value: number;
    constraint: boolean;
  };
  confirm: (options: DialogOptions) => void;
}
interface CheckStatus {
  snackBody: BodyItem[];

  initHeadAndBody: () => void;
}

const useSnackHead = (props: Props) => {
  const {direction, isRun, speed, currentRule, initHead, confirm} = props;
  const [modal, contextHolder] = Modal.useModal();

  const [snackHead, setSnackHead] = useState(initHead);
  const [lastHead, setLastHead] = useState({x: 0, y: 0});

  const changeSnackHead = () => {
    if (isRun) {
      const {key, value} = currentRule;
      sleep(speed).then(() => {
        setLastHead(snackHead);
        setSnackHead((state) => ({...state, [key]: state[key as 'x' | 'y'] + value}));
      });
    }
  };
  const findCurrentEatenFood = (foodList: FoodItem[]) => {
    return foodList.find((food) => {
      const d = Math.sqrt(
        (snackHead.x - food.x) * (snackHead.x - food.x) +
          (snackHead.y - food.y) * (snackHead.y - food.y)
      );
      return d <= 16 && food;
    });
  };
  const alertGameOver = (callBack: () => void, text: string) => {
    if (window.innerWidth > 750) {
      modal.confirm({
        title: text,
        content: '再来一局？',
        onOk: callBack,
        onCancel: () => {
          location.href = '/';
        },
      });
      return;
    }
    confirm({
      title: text + ',再来一局？',
      ok: callBack,
      cancel: () => {
        location.href = '/';
      },
    });
  };

  const checkingStatusAndFeedback = (options: CheckStatus) => {
    const {snackBody, initHeadAndBody} = options;

    const biteYourself = snackBody.find((item) => item.x === snackHead.x && item.y === snackHead.y);
    const outOfRange =
      snackHead.x < 0 ||
      snackHead.x > window.innerWidth - 10 ||
      snackHead.y < 0 ||
      snackHead.y > window.innerHeight - 10;
    if (biteYourself) {
      alertGameOver(initHeadAndBody, '咬到自己啦');
    } else if (outOfRange) {
      alertGameOver(initHeadAndBody, '撞墙啦');
    } else {
      changeSnackHead();
    }
  };

  const snackHeadView = (
    <SnackHead
      style={{
        left: snackHead.x,
        top: snackHead.y,
        ...(['ArrowDown', 'ArrowUp'].includes(direction) && {
          transform: 'rotate(90deg)',
          transition: 'all 0.3s ease 3ms',
        }),
      }}
    >
      <LeftEye />
      <RightEye />
      {contextHolder}
    </SnackHead>
  );
  return {
    snackHead,
    setSnackHead,
    snackHeadView,
    changeSnackHead,
    lastHead,
    findCurrentEatenFood,
    checkingStatusAndFeedback,
  };
};

const SnackHead = styled(SnackBodyItem)`
  z-index: 10;
`;

const EyeBasicStyle = `
  position: absolute;
  width: 8px;
  height: 8px;
  background: white;
  border-radius: 50%;
  &::before {
    content: '';
    display: block;
    width: 2px;
    height: 2px;
    background: black;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
  }
`;

const LeftEye = styled.div`
  ${EyeBasicStyle};
  left: 50%;
  margin-left: -4px;
  bottom: -1px;

  &.eye-right {
    top: -1px;
    right: 50%;
    margin-right: -4px;
  }
`;

const RightEye = styled.div`
  ${EyeBasicStyle};
  top: -1px;
  right: 50%;
  margin-right: -4px;
`;

export default useSnackHead;

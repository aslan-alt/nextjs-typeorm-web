import {useEffect, useState} from 'react';
import {createRuleHash} from 'lib/game/snack';

export const directionList: Direction[] = ['arrowUp', 'arrowLeft', 'arrowRight', 'arrowDown'];
const useDirection = () => {
  const [isRun, setIsRun] = useState<boolean>(false);
  const [direction, setDirection] = useState<Direction>('arrowDown');
  const [speed, setSpeed] = useState<number>(200);
  const rules = createRuleHash(direction);
  const currentRule = rules[direction];

  const changeDirection = (newDirection: Direction) => {
    if (direction !== newDirection) {
      if (rules[newDirection].constraint) {
        setDirection(newDirection);
      }
    }
  };

  const changeSpeed = (speed: number) => {
    setSpeed(speed);
  };
  useEffect(() => {
    document.body.onkeydown = (e) => {
      if (e.code === 'KeyQ') {
        setSpeed(80);
      }
      if (e.code === 'Space') {
        setIsRun(!isRun);
      }
      const d = (e.code.charAt(0).toLowerCase() + e.code.slice(1)) as Direction;
      if (directionList.includes(d)) {
        changeDirection(d);
      }
    };
    document.body.onkeyup = (e) => {
      if (e.code === 'KeyQ') {
        setSpeed(200);
      }
    };
  }, [isRun, direction]);

  return {
    direction,
    setIsRun,
    changeDirection,
    rules,
    currentRule,
    isRun,
    speed,
    changeSpeed,
    setDirection,
  };
};
export default useDirection;

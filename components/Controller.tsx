import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import {directionList} from '../hooks/Snack/useDirection';

const ControllerWrapper = styled.div`
  top: 60px;
  left: 40px;
  position: absolute;
  width: 150px;
  height: 150px;
  display: flex;
  flex-wrap: wrap;

  div {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface Props {
  changeDirection: (newDirection: Direction) => void;
}

const Controller = (props: Props) => {
  const {changeDirection} = props;
  return (
    <ControllerWrapper>
      {directionList.map((direction) => {
        return (
          <React.Fragment key={direction}>
            <div></div>
            <DirectionButton
              onTouchStart={() => {
                changeDirection(direction);
              }}
            >
              <Image src={`/${direction}.svg`} alt={direction} width={18} height={38} />
            </DirectionButton>
          </React.Fragment>
        );
      })}

      <div></div>
    </ControllerWrapper>
  );
};

const DirectionButton = styled.div`
  border-radius: 50%;
  background: rgba(203, 203, 203, 0.7);
  color: white;

  &:active {
    background: rgba(123, 124, 123);
  }
`;

export default Controller;

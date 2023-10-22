import {useState} from 'react';
import styled from 'styled-components';

interface Props {
  initBody: {
    x: number;
    y: number;
  }[];
}

const useSnackBody = (props: Props) => {
  const {initBody} = props;
  const [snackBody, setsNackBody] = useState<BodyItem[]>(initBody);

  const changeSnackBody = (lastHead: BodyItem, type?: 'add') => {
    if (type === 'add') {
      setsNackBody((state) => [lastHead, ...state]);
    } else {
      setsNackBody((state) => [lastHead, ...state.slice(0, state.length - 1)]);
    }
  };

  const snackBodyView = (
    <>
      {snackBody.map((item, index) => {
        return <SnackBodyItem key={index} style={{left: item.x, top: item.y}}></SnackBodyItem>;
      })}
    </>
  );

  return {snackBodyView, changeSnackBody, snackBody, setsNackBody};
};

export const SnackBodyItem = styled.div`
  width: 20px;
  height: 20px;
  position: absolute;
  border-radius: 50%;
  background: red;
  transition: all 0.3s;
`;

export default useSnackBody;

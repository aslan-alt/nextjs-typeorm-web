import {useEffect, useReducer, useRef} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import CommandRow from 'components/CommandRow';
import OptionsItem from 'components/OptionsItem';
import Square from 'components/Square';
import {Context} from 'createStore';
import deepClone from 'lib/deepClone';
import {arrowDownOrArrowUp, createIconsList} from 'lib/game';
import reducer, {initialValue} from 'reducer';
import Home from 'styles/indexStyled';

type Props = {
  userInfo: UAParser.IResult;
};

const keyEventHash: KeyUpEventHash = arrowDownOrArrowUp();
const Index: NextPage<Props> = (props) => {
  const {userInfo} = props;
  const [state, dispatch] = useReducer(reducer, initialValue);

  const focusRef = useRef(null);
  const focusTextInput = () => {
    focusRef?.current?.focus();
  };

  const Icons = createIconsList({
    selectIndex: state?.selectIndex,
    changeIndex: () => {
      dispatch({type: 'setSelectIndex', payload: state?.selectIndex});
    },
  });

  useEffect(() => {
    focusTextInput();
  }, []);

  useEffect(() => {
    if (state.showOptions) {
      document.onkeyup = (e) => {
        if (e.code === 'Enter') {
          if (state.enterTimes === 1) {
            dispatch({type: 'setEnterTimes', payload: 2});
          } else {
            const path = Icons.find((item) => item.id === state.selectIndex);
            location.href = path.href;
          }
        }
        keyEventHash[e.code] &&
          dispatch({type: 'setSelectIndex', payload: keyEventHash[e.code](state.selectIndex)});
      };
    }
    return () => {
      document.onkeyup = null;
    };
  }, [state.showOptions, state.selectIndex, state.enterTimes]);

  return (
    <Context.Provider value={{state, dispatch}}>
      <Home onClick={focusTextInput}>
        <h5 className="home-head">
          <span className="head-front">TERMINAL</span>
          <span className="shell">
            <Square />
            bash
          </span>
        </h5>
        <CommandRow {...{userInfo, inputValue: state.inputValue, ref: focusRef}} />
        {state.showOptions && (
          <div className="select-list-mobile">
            <div className="welcome">
              Welcome to my website, thanks
              <img {...{src: `/grimace.svg`, alt: 'grimace', width: 48, height: 22}} />
            </div>
            {Icons.map((iconProps) => (
              <OptionsItem {...iconProps} key={iconProps.id} />
            ))}
          </div>
        )}
      </Home>
    </Context.Provider>
  );
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  deepClone(result);
  return {
    props: {
      userInfo: deepClone(result),
    },
  };
};

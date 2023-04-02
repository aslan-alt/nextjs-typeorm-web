import {useEffect, useReducer, useRef} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import styled from 'styled-components';
import {UAParser} from 'ua-parser-js';
import CommandRow from 'components/CommandRow';
import OptionsItem from 'components/OptionsItem';
import Square from 'components/Square';
import {Context} from 'createStore';
import deepClone from 'lib/deepClone';
import {arrowDownOrArrowUp, createIconsList} from 'lib/game';
import reducer, {initialValue} from 'reducer';

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
        <Content>
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
        </Content>
        <Footer>
          <a href="https://beian.miit.gov.cn/">陕ICP备2023001571号-1</a>
        </Footer>
      </Home>
    </Context.Provider>
  );
};
export default Index;
const Footer = styled.div`
  color: white;
  text-align: center;
`;

const Content = styled.div`
  flex-grow: 1;
  background: transparent;
`;

const Home = styled.div`
  background: #272c33;
  padding: 16px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  .home-head {
    padding-bottom: 10px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #e6e7e6;
    .head-front {
      border-bottom: 1px solid #e6e7e6;
    }
    .shell {
      position: relative;
    }
  }
  .select-list-mobile {
    color: #8bc264;
    padding-left: 2px;
    .welcome {
      display: flex;
      align-items: center;
    }
  }
`;

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

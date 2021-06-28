import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { useEffect, useReducer, useState } from 'react';
import { createKeyEventHash, createIconsList } from 'lib/pageMethods'
import depClone from '../lib/depClone';
import Square from 'components/Square'
import CommandRow from 'components/CommandRow'
import OptionsItem from 'components/OptionsItem'
import Home from 'styles/indexStyled'
import { Context } from 'createStore'
import reducer, { initialValue } from 'reducer'

type Props = {
  userInfo: IUAParser.IResult
}

const Index: NextPage<Props> = (props) => {
  const { userInfo } = props;
  const [state, dispatch] = useReducer(reducer, initialValue)
  const { showOptions, selectIndex, inputValue } = state

  const Icons = createIconsList({
    selectIndex, changeIndex: () => {
      dispatch({ type: 'setSelectIndex', payload: selectIndex })
    }
  })

  const keyEventHash: KeyUpEventHash = createKeyEventHash(Icons)
  //目前没有用，将来可能会用到  可以拿到用户输入的指令

  const parentKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'setShowOptions', payload: true })
    }
  }

  useEffect(() => {
    if (showOptions) {
      document.onkeyup = (e) => {
        const x = keyEventHash[e.code] && keyEventHash[e.code](selectIndex)
        console.log(x)
        keyEventHash[e.code] && dispatch({ type: 'setSelectIndex', payload: x })
      }
    } else {
      //TODO
    }

  }, [showOptions, selectIndex])

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Home>
        <h5 className="home-head">
          <span className="head-front">TERMINAL</span>
          <span className="shell"><Square />bash</span>
        </h5>
        <CommandRow {...{ userInfo, parentKeyUp, inputValue }} />
        {
          showOptions &&
          <div className="select-list-mobile">
            <div>Welcome to my website, Have fun</div>
            {Icons.map(iconProps => <OptionsItem {...iconProps} key={iconProps.id} />)}
          </div>}
      </Home>
    </Context.Provider>

  );
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  console.log(result)
  depClone(result)
  return {
    props: {
      userInfo: depClone(result)
    }
  };
};
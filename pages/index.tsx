import Image from 'next/image'
import { UAParser } from 'ua-parser-js';
import { GetServerSideProps, NextPage } from 'next';
import { useEffect, useReducer, useRef } from 'react';
import { createKeyEventHash, createIconsList } from 'lib/game'
import deepClone from 'lib/deepClone';
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

  const focusRef = useRef(null)
  const focusTextInput = () => { focusRef?.current?.focus() }

  const Icons = createIconsList({
    selectIndex, changeIndex: () => {
      dispatch({ type: 'setSelectIndex', payload: selectIndex })
    }
  })

  const keyEventHash: KeyUpEventHash = createKeyEventHash(Icons)

  useEffect(() => {
    focusTextInput()
  }, [])

  useEffect(() => {
    if (showOptions) {
      document.onkeyup = (e) => {
        keyEventHash[e.code] && dispatch({ type: 'setSelectIndex', payload: keyEventHash[e.code](selectIndex) })
      }
    }
    return () => {
      document.onkeyup = null
    }
  }, [showOptions, selectIndex])

  return (
    <Context.Provider value={{ state, dispatch }}>
      <Home onClick={focusTextInput}>
        <h5 className="home-head">
          <span className="head-front">TERMINAL</span>
          <span className="shell"><Square />bash</span>
        </h5>
        <CommandRow {...{ userInfo, inputValue, ref: focusRef }} />
        {
          showOptions &&
          <div className="select-list-mobile">
            <div className="welcome">Welcome to my website, thanks<Image {...{ src: `/grimace.svg`, alt: 'grimace', width: 48, height: 22 }} /></div>
            {Icons.map(iconProps => <OptionsItem {...iconProps} key={iconProps.id} />)}
          </div>
        }
      </Home>
    </Context.Provider >

  );
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  deepClone(result)
  return {
    props: {
      userInfo: deepClone(result)
    }
  };
};
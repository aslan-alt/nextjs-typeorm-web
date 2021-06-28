import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { useEffect, useReducer, useRef } from 'react';
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

  const focusRef = useRef(null)
  const focusTextInput = () => { focusRef?.current?.focus() }

  const Icons = createIconsList({
    selectIndex, changeIndex: () => {
      dispatch({ type: 'setSelectIndex', payload: selectIndex })
    }
  })

  const keyEventHash: KeyUpEventHash = createKeyEventHash(Icons)
  //目前没有用，将来可能会用到  可以拿到用户输入的指

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
            <div>Welcome to my website, Have fun</div>
            {Icons.map(iconProps => <OptionsItem {...iconProps} key={iconProps.id} />)}
          </div>}
      </Home>
    </Context.Provider >

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
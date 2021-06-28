import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { ChangeEvent, useEffect, useState } from 'react';
import { createKeyEventHash, createIconsList } from 'lib/pageMethods'
import depClone from '../lib/depClone';
import Square from 'components/Square'
import CommandRow from 'components/CommandRow'
import OptionsItem from 'components/OptionsItem'
import Home from 'styles/indexStyled'


type Props = {
  userInfo: IUAParser.IResult
}

const Index: NextPage<Props> = (props) => {
  const { userInfo } = props;

  const [showOptionsAndDisable, setShowOptionsAndDisable] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [value, setValue] = useState<string>('')

  const changeIndex = (newIndex: number) => { setCurrentIndex(newIndex) }
  const Icons = createIconsList({ changeIndex, currentIndex })
  const keyEventHash: KeyUpEventHash = createKeyEventHash(Icons)
  //目前没有用，将来可能会用到  可以拿到用户输入的指令
  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const parentKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setShowOptionsAndDisable(true)
    }
  }

  useEffect(() => {
    if (showOptionsAndDisable) {

      document.onkeyup = (e) => {

        keyEventHash[e.code] && setCurrentIndex(keyEventHash[e.code](currentIndex))
      }
    } else {


      //TODO
    }

  }, [showOptionsAndDisable, currentIndex])



  return (
    <Home>
      <h5 className="home-head">
        <span className="head-front">TERMINAL</span>
        <span className="shell"><Square />bash</span>
      </h5>
      <CommandRow {...{ userInfo, onValueChange, parentKeyUp, showOptionsAndDisable, setShowOptionsAndDisable, value }} />
      {
        showOptionsAndDisable &&
        <div className="select-list-mobile">
          <div>Welcome to my website, Have fun</div>
          {Icons.map(iconProps => <OptionsItem {...iconProps} key={iconProps.id} />)}
        </div>}
    </Home>
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
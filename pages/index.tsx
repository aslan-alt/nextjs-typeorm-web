import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { useRouter } from 'next/router'
import { ChangeEvent, MouseEvent, useEffect, useState } from 'react';
import depClone from '../lib/depClone';
import Square from 'components/Square'
import CommandRow from 'components/CommandRow'
import OptionsItem from 'components/OptionsItem'
import styled from 'styled-components'


const Home = styled.div`
  background: #272C33;
  padding: 16px;
  height: 100vh;
  .home-head{
    padding-bottom: 10px;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#E6E7E6;
    .head-front{
      border-bottom: 1px solid #E6E7E6;;
    }
    .shell{
      position: relative;
    }
  }
  .select-list-mobile{
    color:#8BC264;
    padding-left:2px;
  }
`

type Props = {
  userInfo: IUAParser.IResult
}
const Index: NextPage<Props> = (props) => {
  const { userInfo: { browser, os, device } } = props;
  const router = useRouter()
  const [showOptionsAndDisable, setShowOptionsAndDisable] = useState(false)
  const [currentIndex, setCurrentIndex] = useState<number>(0)

  const changeIndex = (newIndex: number) => { setCurrentIndex(newIndex) }

  const Icons = [
    { id: 0, name: 'game', href: '/games', alt: 'gameIcon', text: '玩游戏', height: 30, width: 48, currentIndex, changeIndex },
    { id: 1, href: '/games', name: 'curriculumVitae', alt: 'gameIcon', text: '看简历', currentIndex, changeIndex },
    { id: 2, href: '/games', name: 'messageBoard2', alt: 'gameIcon', text: '留言板', currentIndex, changeIndex },
    { id: 3, href: '/games', alt: 'messageBoard', text: '退出', height: 30, width: 48, currentIndex, changeIndex }
  ]

  const onCommander = (e: ChangeEvent<HTMLInputElement>) => { }
  const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setShowOptionsAndDisable(true)
    }
  }

  useEffect(() => {
    let id = currentIndex
    if (showOptionsAndDisable) {
      document.onkeyup = (e) => {
        console.log(showOptionsAndDisable)
        if (e.code === 'ArrowDown') {
          if (id !== 3) {
            id += 1
          } else {
            id = 0
          }
          setCurrentIndex(id)
        }
        if (e.code === 'ArrowUp') {
          if (id !== 0) {
            id -= 1
          } else {
            id = 3
          }
          setCurrentIndex(id)
        }
        if (e.code === 'Enter') {
          const path = Icons.find(item => item.id === currentIndex)
          path && router.push(path.href)
        }
      }
    } else {

    }
    console.log(showOptionsAndDisable)
  }, [showOptionsAndDisable])

  return (
    <Home>
      <h5 className="home-head">
        <span className="head-front">TERMINAL</span>
        <span className="shell"><Square />bash</span>
      </h5>
      <CommandRow {...{ browser, os, onCommander, device, keyUp, disabled: showOptionsAndDisable }} />
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
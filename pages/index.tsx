import { GetServerSideProps, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { ChangeEvent, useEffect, useState } from 'react';
import depClone from '../lib/depClone';
import Square from 'components/Square'
import CommandRow from 'components/CommandRow'
import styled from 'styled-components'

const Home = styled.div`
  background: #272C33;
  padding: 16px;
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
    div{
      margin-bottom: 8px;
      a{
        border-bottom: 1px solid #8BC264;
      }
    }
  }

  
`

type Props = {
  userInfo: IUAParser.IResult
}
const Index: NextPage<Props> = (props) => {
  const { userInfo: { browser, os, device } } = props;
  const [show, setShow] = useState(false)
  const onCommander = (e: ChangeEvent<HTMLInputElement>) => { }
  const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      setShow(true)
    }
  }
  return (
    <Home>
      <h5 className="home-head">
        <span className="head-front">TERMINAL</span>
        <span className="shell"><Square />bash</span>
      </h5>
      <CommandRow {...{ browser, os, onCommander, device, keyUp, disabled: show }} />
      {
        show &&
        <div className="select-list-mobile">
          <div>Welcome to my website, Have fun</div>
          <div><a>玩游戏</a>
            <svg className="icon" aria-hidden="true">

              <use xlink:href="#icon-xxx"></use>
            </svg>
          </div>
          <div><a>看简历</a></div>
          <div><a>留言板</a></div>
          <div><a>退出</a></div>
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
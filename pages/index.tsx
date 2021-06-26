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

  
`

type Props = {
  userInfo: IUAParser.IResult
}
const Index: NextPage<Props> = (props) => {
  const { userInfo: { browser, os } } = props;
  const [show, setShow] = useState(false)
  const onCommander = (e: ChangeEvent<HTMLInputElement>) => {
    setShow(true)
  }
  return (
    <Home>
      <h5 className="home-head">
        <span className="head-front">TERMINAL</span>
        <span className="shell"><Square />bash</span>
      </h5>
      <CommandRow {...{ browser, os, onCommander }} />


    </Home>
  );
};
export default Index;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];

  const result = new UAParser(ua).getResult();
  // console.log(result)
  depClone(result)
  return {
    props: {
      userInfo: depClone(result)
    }
  };
};
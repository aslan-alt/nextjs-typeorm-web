import {useEffect, useRef, useState} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import {UAParser} from 'ua-parser-js';
import CommandInput from 'components/CommandRow';
import Square from 'components/Square';
import deepClone from 'lib/deepClone';
import {arrowDownOrArrowUp} from 'lib/game';

type Props = {
  userInfo: UAParser.IResult;
};

type OptionsItem = {
  name?: string;
  id: number;

  href: string;
  text: string;
  height?: number;
  width?: number;
};

const allPages: OptionsItem[] = [
  {
    id: 0,
    name: 'game',
    href: '/games',
    text: '玩游戏',
    height: 30,
    width: 48,
  },
  {
    id: 1,
    name: 'curriculumVitae',
    href: 'http://xiong-jingsong.gitee.io/cv-website',
    text: '看简历',
    height: 25,
    width: 48,
  },
  {
    id: 2,
    name: 'messageBoard',
    href: '/messageBoard',
    text: '留言板',
    height: 23,
    width: 48,
  },
  {
    id: 3,
    href: '/esc',
    text: '退出',
    height: 30,
    width: 48,
  },
];

const keyEventHash: KeyUpEventHash = arrowDownOrArrowUp();
const Index: NextPage<Props> = (props) => {
  const {userInfo} = props;
  const [showOptions, setShowOptions] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [enterTimes, setEnterTimes] = useState(0);

  const focusRef = useRef<HTMLInputElement>(null);
  const focusTextInput = () => {
    focusRef?.current?.focus();
  };

  const onCommandInputChange = (value?: string) => {
    setInputValue(value ?? '');
    setShowButton(true);
  };

  const hideButtonShowOptions = () => {
    setShowButton(false);
    setShowOptions(true);
  };

  useEffect(() => {
    focusTextInput();
  }, []);

  useEffect(() => {
    if (showOptions) {
      document.onkeyup = (e) => {
        if (e.code === 'Enter') {
          if (enterTimes === 1) {
            setEnterTimes(2);
          } else {
            const selectedPage = allPages.find((item) => item.id === selectIndex);
            if (selectedPage) {
              location.href = selectedPage.href;
            }
          }
        }
        keyEventHash[e.code] && setSelectIndex(keyEventHash[e.code](selectIndex));
      };
    }
    return () => {
      document.onkeyup = null;
    };
  }, [showOptions, selectIndex, enterTimes]);

  return (
    <>
      <Home onClick={focusTextInput}>
        <HomeHead>
          <HeadFront>TERMINAL</HeadFront>
          <Shell>
            <Square />
            bash
          </Shell>
        </HomeHead>
        <Content>
          <CommandInput
            ref={focusRef}
            inputValue={inputValue}
            userInfo={userInfo}
            showOptions={showOptions}
            onCommandInputChange={onCommandInputChange}
            hideButtonShowOptions={hideButtonShowOptions}
            showButton={showButton}
            setEnterTimes={setEnterTimes}
          />
          {showOptions && (
            <SelectListMobile>
              <Welcome>
                Welcome to my website, thanks
                <Image width={48} height={22} src="/grimace.svg" alt="grimace" />
              </Welcome>
              {allPages.map((item) => (
                <SelectorWrapper
                  key={item.id}
                  onClick={() => {
                    setSelectIndex(item.id);
                  }}
                >
                  <IconContainer>
                    {selectIndex === item.id && (
                      <Image src="/index.svg" width={20} height={18} alt={item?.name ?? ''} />
                    )}
                  </IconContainer>
                  <Link href={item.href} legacyBehavior>
                    <a>{item.text}</a>
                  </Link>
                  {item.name && (
                    <Image
                      src={`/${item.name}.svg`}
                      alt={item.name}
                      width={item?.width ?? 0}
                      height={item?.height ?? 0}
                    />
                  )}
                </SelectorWrapper>
              ))}
            </SelectListMobile>
          )}
        </Content>
        <Footer>
          <a href="https://beian.miit.gov.cn/">陕ICP备2023001571号-1</a>
        </Footer>
      </Home>
    </>
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

const HomeHead = styled.h5`
  padding-bottom: 10px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #e6e7e6;
`;

const HeadFront = styled.span`
  border-bottom: 1px solid #e6e7e6;
`;

const Shell = styled.span`
  position: relative;
`;

const Welcome = styled.div`
  display: flex;
  align-items: center;
`;

const SelectListMobile = styled.div`
  color: #8bc264;
  padding-left: 2px;
`;

const Home = styled.div`
  background: #272c33;
  padding: 16px;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();

  return {
    props: {
      userInfo: deepClone(result),
    },
  };
};

const SelectorWrapper = styled.label`
  display: flex;
  align-items: center;
  margin-bottom: 8px;

  a {
    border-bottom: 1px solid #8bc264;
    margin-left: 5px;
  }
`;

const IconContainer = styled.div`
  width: 28px;
`;

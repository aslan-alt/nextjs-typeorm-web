import {useEffect, useRef, useState} from 'react';
import {GetServerSideProps, NextPage} from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import {UAParser} from 'ua-parser-js';
import {allPages} from '@helpers/index';
import CommandInput from 'components/CommandRow';
import Square from 'components/Square';
import deepClone from 'lib/deepClone';

type Props = {
  userInfo: UAParser.IResult;
};

const Index: NextPage<Props> = (props) => {
  const {userInfo} = props;
  const [showOptions, setShowOptions] = useState(false);
  const [selectIndex, setSelectIndex] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [showButton, setShowButton] = useState(false);
  const [enterTimes, setEnterTimes] = useState(0);
  const lastIndex = allPages.length - 1;
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
        } else if (e.code === 'ArrowDown') {
          setSelectIndex(selectIndex !== lastIndex ? selectIndex + 1 : 0);
        } else if (e.code === 'ArrowUp') {
          setSelectIndex(selectIndex === 0 ? lastIndex : selectIndex - 1);
        }
      };
    }
    return () => {
      document.onkeyup = null;
    };
  }, [showOptions, selectIndex, enterTimes]);

  return (
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
                {item.iconName && (
                  <Image
                    src={`/${item.iconName}.svg`}
                    alt={item.iconName}
                    width={item?.width}
                    height={item?.height}
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

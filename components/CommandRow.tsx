import React, {ChangeEvent, useContext, forwardRef, MutableRefObject} from 'react';
import styled from 'styled-components';
import {Context} from 'createStore';

interface Props {
  userInfo: UAParser.IResult;
}

const CommandRow = (props: Props, ref: MutableRefObject<any>) => {
  const {
    userInfo: {device, browser, os},
  } = props;
  const {
    state: {showOptions, inputValue, showButton},
    dispatch,
  } = useContext(Context);

  const isVisibleButton = device?.type === 'mobile' && showButton;

  const keyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter') {
      dispatch({type: 'setShowButton', payload: false});
      dispatch({type: 'setShowOptions', payload: true});
      dispatch({type: 'setEnterTimes', payload: 1});
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e?.target?.value;
    dispatch({type: 'setShowButton', payload: !!value.length});
    dispatch({type: 'setInputValue', payload: value});
  };

  return (
    <Container>
      <p>{`${browser?.name}/${browser.version}/${os.name} User$ `}</p>
      <CommanderInputAndButton>
        {!(inputValue.length > 0) && <div className="cursor"></div>}
        <CommandInput
          type="text"
          placeholder="Please enter the command"
          value={inputValue}
          onChange={onChange}
          onKeyUp={keyUp}
          ref={ref}
          disabled={showOptions}
        />

        {isVisibleButton && (
          <button
            onClick={() => {
              dispatch({type: 'setShowButton', payload: false});
              dispatch({type: 'setShowOptions', payload: true});
            }}
          >
            执行
          </button>
        )}
      </CommanderInputAndButton>
    </Container>
  );
};

const Container = styled.label`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  @keyframes changeCursor {
    0% {
      background: rgb(255, 0, 0);
    }
    14% {
      background: rgb(255, 165, 0);
    }
    28% {
      background: rgb(255, 255, 0);
    }
    42% {
      background: rgb(0, 255, 0);
    }
    56% {
      background: rgb(0, 127, 255);
    }
    70% {
      background: rgb(0, 0, 255);
    }
    84% {
      background: rgb(139, 0, 255);
    }
    100% {
      background: #e6e7e6;
    }
  }
  p {
    display: flex;
    color: #e6e7e6;
    font-size: 12px;
    padding: 0 0 0 6px;
    margin: 0;
  }
`;

const CommanderInputAndButton = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1;
  .cursor {
    color: white;
    margin-left: 6px;
    width: 4px;
    height: 14px;
    background: #e6e7e6;
    border-radius: 4px;
    animation: changeCursor 3s linear infinite;
  }
  button {
    padding: 2px 6px;
    border: none;
    border-radius: 4px;
    font-size: 12px;
    &:active {
      background: gray;
      color: white;
    }
  }
`;

const CommandInput = styled.input`
  flex-grow: 1;
  border: none;
  min-width: 170px;
  caret-color: transparent;
  background: transparent;
  outline: none;
  color: white;
  padding: 6px 0 6px 6px;
`;

export default forwardRef(CommandRow);

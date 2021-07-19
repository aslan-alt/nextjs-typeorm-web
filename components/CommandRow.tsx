import { Context } from 'createStore'
import React, { ChangeEvent, useContext, useEffect, useRef, forwardRef, MutableRefObject } from 'react'
import styled from 'styled-components'

const CommandRowWrapper = styled.label`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    @keyframes changeCursor{
        0%{background:rgb(255, 0, 0) }
        14%{background:rgb(255, 165, 0) }
        28%{background:rgb(255, 255, 0) }
        42%{background:rgb(0, 255, 0 ) }
        56%{background:rgb(0, 127, 255 ) }
        70%{background:rgb(0, 0, 255) }
        84%{background:rgb(139, 0, 255) }
        100%{background:#E6E7E6}
    }
    p{
      display: flex;
      color:#E6E7E6;
      font-size: 12px;
      padding:10px 0 0 6px;
    }
    .commander-end{
        display: flex;
        align-items: center;
        .cursor{
            color:white;
            margin-left: 6px;;
            width: 4px;
            height: 14px;
            background: #E6E7E6;
            border-radius: 4px;
            animation: changeCursor 3s linear infinite;
        }
        input{
            flex-grow:1;
            border:none;
            min-width: 170px;
            caret-color: transparent;
            background: transparent;
            outline:none;
            color:white;
            padding:6px 0 6px 6px;
        }
        button{
            padding: 2px 6px;
            border: none;
            border-radius:4px;
            font-size: 12px;
            &:active{
                background:gray ;
                color: white;
            }
        }
    }
`
interface Props {
    userInfo: IUAParser.IResult
}

const CommandRow = (props: Props, ref: MutableRefObject<any>) => {
    const { userInfo: { device, browser, os } } = props
    const { state: { showOptions, inputValue, showButton }, dispatch } = useContext(Context)

    const isVisibleButton = device?.model && showButton

    const KeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.keyCode === 13) {
            dispatch({ type: 'setShowButton', payload: false })
            dispatch({ type: 'setShowOptions', payload: true })
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e?.target?.value
        dispatch({ type: 'setShowButton', payload: !!value.length })
        dispatch({ type: 'setInputValue', payload: value })
    }

    return (
        <CommandRowWrapper className={"commander-row"} >
            <p>{`${browser?.name}/${browser.version}/${os.name} User$ `}</p>
            <div className="commander-end">
                {!(inputValue.length > 0) && <div className="cursor"></div>}
                <input
                    type="text"
                    placeholder="Please enter the command"
                    value={inputValue}
                    onChange={onChange}
                    onKeyUp={KeyUp}
                    ref={ref}
                    disabled={showOptions}
                />

                {isVisibleButton && <button onClick={() => {
                    dispatch({ type: 'setShowButton', payload: false })
                    dispatch({ type: 'setShowOptions', payload: true })
                }}>执行</button>}
            </div>
        </CommandRowWrapper>
    )
}

export default forwardRef(CommandRow)

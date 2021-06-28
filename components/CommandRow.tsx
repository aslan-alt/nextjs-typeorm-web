import React, { ChangeEvent, SetStateAction, useEffect, useRef, useState } from 'react'
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
      padding:6px 0 6px 6px;
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
            padding:8px 0 6px 6px;
        }
        button{
            padding: 0px 3px;
            font-size: 12px;
        }
    }
`
interface Props {
    userInfo: IUAParser.IResult,
    showOptionsAndDisable: boolean;
    value: string;
    parentKeyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void,
    onValueChange: (e: ChangeEvent<HTMLInputElement>) => void;
    setShowOptionsAndDisable: (value: SetStateAction<boolean>) => void
}

const CommandRow = (props: Props) => {
    const { userInfo: { device, browser, os }, onValueChange, value, showOptionsAndDisable, setShowOptionsAndDisable, parentKeyUp } = props

    const [visibleButton, setVisibleButton] = useState(false)
    const showButton = device?.model && visibleButton
    const inputRef = useRef<HTMLInputElement>(null);

    const focusTextInput = () => {
        inputRef?.current?.focus();
    }

    const childrenKeyUp: typeof parentKeyUp = (e) => {
        if (e.keyCode === 13) {
            setVisibleButton(false)
        }
        parentKeyUp(e)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const onInput = !(e?.target?.value?.length > 0)
        setVisibleButton(!onInput)
        onValueChange(e)
    }

    useEffect(() => {
        focusTextInput()
    }, [])


    return (
        <CommandRowWrapper className={"commander-row"} >
            <p>{`${browser?.name}/${browser.version}/${os.name} User$ `}</p>
            <div className="commander-end">
                {!(value.length > 0) && <div className="cursor"></div>}

                <input
                    type="text"
                    placeholder="Please enter the command"
                    value={value}
                    onChange={onChange}
                    onKeyUp={childrenKeyUp}
                    ref={inputRef}
                    disabled={showOptionsAndDisable}
                />

                {showButton && <button onClick={() => {
                    setVisibleButton(false)
                    setShowOptionsAndDisable(true)
                }}>执行</button>}
            </div>
        </CommandRowWrapper>
    )
}

export default CommandRow

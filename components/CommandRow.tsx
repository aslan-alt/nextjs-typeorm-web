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
    browser: { name: string; version: string; }
    os: { name: string; },
    disabled: boolean;
    keyUp: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    device: { vendor: string | null; model: string | null; type: string | null }
    onCommander: (e: ChangeEvent<HTMLInputElement>) => void;
    setShowOptionsAndDisable: (value: SetStateAction<boolean>) => void
}

const CommandRow = (props: Props) => {
    const { browser, os, onCommander, device, keyUp, disabled, setShowOptionsAndDisable } = props
    const [isDisabled, setIsDisabled] = useState(disabled)
    const [showCursor, setShowCursor] = useState(false)
    const [visible, setVisible] = useState(false)

    const showButton = device?.model && visible
    const inputRef = useRef<HTMLInputElement>(null);

    const focusTextInput = () => {
        if (inputRef.current) {
            inputRef.current.focus();
            setShowCursor(true)
        }
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const onInput = !(e?.target?.value?.length > 0)
        setShowCursor(onInput)
        setVisible(!onInput)
        onCommander(e)
    }

    useEffect(() => {
        focusTextInput()
    }, [])
    useEffect(() => {
        setIsDisabled(disabled)
    }, [disabled])
    return (
        <CommandRowWrapper className={"commander-row"} >
            <p>{`${browser?.name}/${browser.version}/${os.name} User$ `}</p>
            <div className="commander-end">
                {showCursor && <div className="cursor"></div>}

                <input
                    type="text"
                    placeholder="Please enter the command"
                    onChange={onChange}
                    ref={inputRef}
                    onKeyUp={keyUp}
                    disabled={isDisabled}
                />

                {showButton && <button onClick={() => {
                    setVisible(true)
                    setShowOptionsAndDisable(true)
                }}>执行</button>}
            </div>
        </CommandRowWrapper>
    )
}

export default CommandRow

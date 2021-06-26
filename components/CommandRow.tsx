import React, { ChangeEvent } from 'react'
import styled from 'styled-components'

const CommandRowWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    p{
      display: flex;
      color:#E6E7E6;
      font-size: 12px;
      padding-right:6px;
      margin-bottom: 6px;
    }
    input{
      flex-grow:1;
      border:none;
      background: transparent;
      outline:none;
      color:white;
      margin-bottom: 6px;
      :focus{
        outline:none;
      }
    }
  
`
interface Props {
    browser: {
        name: string;
        version: string;
    }
    os: {
        name: string;
    }
    onCommander: (e: ChangeEvent<HTMLInputElement>) => void;
}
const CommandRow = (props: Props) => {
    const { browser, os, onCommander } = props
    return (
        <CommandRowWrapper className={"commander-row"}>
            <p>{`${browser?.name}/${browser.version}/${os.name} User$ `}</p>
            <input type="text" placeholder="Please enter the command" onChange={onCommander} />
        </CommandRowWrapper>
    )
}

export default CommandRow

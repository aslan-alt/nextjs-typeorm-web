import cs from 'classnames'
import { getHeadAndBody } from 'pages/games/snack/methods'
import { sleep } from 'lib'
import { useState } from 'react'

interface Props {
    direction: Direction;
    width: number;
    height: number;
    isRun: boolean;
    speed: number;
    currentRule: {
        key: string;
        value: number;
        constraint: boolean;
    }
}

const useSnackHead = (props: Props) => {
    const { direction, width, height, isRun, speed, currentRule } = props


    const { initHead } = getHeadAndBody({ width, height })

    const [snackHead, setSnackHead] = useState(initHead)
    const [lastHead, setLastHead] = useState({ x: 0, y: 0 })


    const changeSnackHead = () => {
        if (isRun) {
            const { key, value } = currentRule
            sleep(speed).then(() => {
                setLastHead(snackHead)
                setSnackHead(state => ({ ...state, [key]: state[key as 'x' | 'y'] + value }))
            })
        }
    }

    const headClass = cs("body-item", 'snack-head', ["ArrowDown", "ArrowUp"].includes(direction) && 'rotate')

    const snackHeadView = (
        <div className={headClass} style={{ left: snackHead.x, top: snackHead.y }}>
            <div className="eye-left"></div>
            <div className="eye-right"></div>
        </div>
    )
    return { snackHead, setSnackHead, snackHeadView, changeSnackHead, lastHead }
}
export default useSnackHead
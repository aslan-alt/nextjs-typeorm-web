import cs from 'classnames'
import { sleep } from 'lib'
import { useEffect, useState } from 'react'

interface Props {
    direction: Direction;
    isRun: boolean;
    speed: number;
    initHead: {
        x: number;
        y: number;
    };
    currentRule: {
        key: string;
        value: number;
        constraint: boolean;
    }
}
interface CheckStatus {
    snackBody: BodyItem[];
    width: number;
    height: number;
}


const useSnackHead = (props: Props) => {
    const { direction, isRun, speed, currentRule, initHead } = props
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
    const findCurrentEatenFood = (foodList: FoodItem[]) => {
        const eatFood = foodList.find(food => {
            const d = Math.sqrt((snackHead.x - food.x) * (snackHead.x - food.x) + (snackHead.y - food.y) * (snackHead.y - food.y));
            return d <= 15 && food
        })
        return eatFood
    }

    const checkingStatusAndFeedback = (options: CheckStatus) => {
        const { snackBody, width, height } = options
        const biteYourself = snackBody.find(item => item.x === snackHead.x && item.y === snackHead.y)
        const outOfRange = (snackHead.x < 0 || snackHead.x > width - 10 || snackHead.y < 0 || snackHead.y > height - 10)
        if (biteYourself) {
            alert('niteYourSelf')
        } else if (outOfRange) {
            alert('outOfRange')
        } else {
            changeSnackHead()
        }
    }



    const headClass = cs("body-item", 'snack-head', ["ArrowDown", "ArrowUp"].includes(direction) && 'rotate')

    const snackHeadView = (
        <div className={headClass} style={{ left: snackHead.x, top: snackHead.y }}>
            <div className="eye-left"></div>
            <div className="eye-right"></div>
        </div>
    )
    return { snackHead, setSnackHead, snackHeadView, changeSnackHead, lastHead, findCurrentEatenFood, checkingStatusAndFeedback }
}
export default useSnackHead
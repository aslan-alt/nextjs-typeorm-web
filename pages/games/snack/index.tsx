import React, { useState, useEffect, useRef } from 'react'

import { SnackWrapper } from '../style'
import useSnackFood from 'hooks/Snack/useSnackFood';
import useSnackHead from 'hooks/Snack/useSnackHead';
import useDirection from 'hooks/Snack/useDirection';
import { getHeadAndBody, getWidthAndHeightByRouter } from './methods';

const Snack = () => {
    let { current } = useRef({ count: 0 })
    const { width, height } = getWidthAndHeightByRouter()
    const { initBody } = getHeadAndBody({ width, height })
    const { direction, currentRule, isRun } = useDirection()

    const { foodList, foodsView, deleteEatenFoodAndCreateNewFood } = useSnackFood({ width, height })

    const [state, setState] = useState({
        snackBody: initBody,
        speed: 200,
    })
    const { snackBody, speed } = state

    const { snackHead, snackHeadView, changeSnackHead, lastHead } = useSnackHead({ width, height, direction, isRun, speed, currentRule })


    useEffect(() => {
        if (current.count !== 0) {
            const eatFood = foodList.find(food => {
                const d = Math.sqrt((snackHead.x - food.x) * (snackHead.x - food.x) + (snackHead.y - food.y) * (snackHead.y - food.y));
                if (d <= 15) {
                    return food
                }
                // if (d > 15) {//15是食物的半径加蛇头的半径
                //     console.log("没有交集\n");
                // }
                // else if (d <= 15) {
                //     return food
                // }
            })
            if (eatFood) {
                deleteEatenFoodAndCreateNewFood(eatFood)
                setState(state => ({ ...state, snackBody: [lastHead, ...state.snackBody] }))
            } else {
                setState(state => ({ ...state, snackBody: [lastHead, ...state.snackBody.slice(0, state.snackBody.length - 1)] }))
            }
        } else {
            current.count += 1
        }
    }, [lastHead, foodList])



    useEffect(() => {
        const biteYourself = snackBody.find(item => item.x === snackHead.x && item.y === snackHead.y)
        const outOfRange = (snackHead.x < 0 || snackHead.x > width - 10 || snackHead.y < 0 || snackHead.y > height - 10)
        if (biteYourself) {
            alert('niteYourSelf')
        } else if (outOfRange) {
            alert('outOfRange')
        } else {
            changeSnackHead()
        }
    }, [isRun, snackHead])


    return (
        <SnackWrapper>
            <div className="map">
                {snackHeadView}
                {snackBody.map((item, index) => {
                    return <div className="body-item" key={index} style={{ left: item.x, top: item.y }}></div>
                })}
                {foodsView}
            </div>
        </SnackWrapper>
    )
}


export default Snack
import React, { useState, useEffect, useRef } from 'react'

import { SnackWrapper } from '../style'
import useSnackFood from 'hooks/Snack/useSnackFood';
import useSnackHead from 'hooks/Snack/useSnackHead';
import useDirection from 'hooks/Snack/useDirection';
import useSnackBody from 'hooks/Snack/useSnackBody';
import { getHeadAndBody, getWidthAndHeightByRouter } from './methods';

const Snack = () => {
    let { current } = useRef({ count: 0 })
    const { width, height } = getWidthAndHeightByRouter()
    const { initBody, initHead } = getHeadAndBody({ width, height })
    const { direction, currentRule, isRun } = useDirection()

    const { foodList, foodsView, deleteEatenFoodAndCreateNewFood } = useSnackFood({ width, height })
    const speed = 200

    const { snackHead, snackHeadView, lastHead, findCurrentEatenFood, checkingStatusAndFeedback } = useSnackHead({ initHead, direction, isRun, speed, currentRule })
    const { changeSnackBody, snackBody, snackBodyView } = useSnackBody({ initBody })

    useEffect(() => {
        if (current.count !== 0) {
            const eatFood = findCurrentEatenFood(foodList)
            if (eatFood) {
                deleteEatenFoodAndCreateNewFood(eatFood)
                changeSnackBody(lastHead, 'add')
            } else {
                changeSnackBody(lastHead)
            }
        } else {
            current.count += 1
        }
    }, [lastHead, foodList])


    useEffect(() => {
        checkingStatusAndFeedback({ snackBody, width, height })
    }, [isRun, snackHead])


    return (
        <SnackWrapper>
            <div className="map">
                {snackHeadView}
                {snackBodyView}
                {foodsView}
            </div>
        </SnackWrapper>
    )
}


export default Snack
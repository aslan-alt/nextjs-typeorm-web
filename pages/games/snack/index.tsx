import React, { useEffect, useRef } from 'react'
import { Modal } from 'antd';
import { SnackWrapper } from '../style'
import useSnackFood from 'hooks/Snack/useSnackFood';
import useSnackHead from 'hooks/Snack/useSnackHead';
import useDirection from 'hooks/Snack/useDirection';
import useSnackBody from 'hooks/Snack/useSnackBody';
import { getHeadAndBody, getWidthAndHeightByRouter } from './methods';
import Controller from 'components/Controller';
import SpeedUp from 'components/SpeedUp';



const Snack = () => {
    let { current } = useRef({ count: 0 })
    const [modal, contextHolder] = Modal.useModal();
    const { width, height } = getWidthAndHeightByRouter()
    const { initBody, initHead } = getHeadAndBody({ width, height })
    const { direction, currentRule, isRun, speed, changeDirection, setIsRun, changeSpeed } = useDirection()

    const { foodList, foodsView, deleteEatenFoodAndCreateNewFood } = useSnackFood({ width, height })


    const { snackHead, snackHeadView, lastHead, findCurrentEatenFood, checkingStatusAndFeedback, setSnackHead } = useSnackHead({ initHead, direction, isRun, speed, currentRule })
    const { changeSnackBody, snackBody, snackBodyView, setsNackBody } = useSnackBody({ initBody })

    const initHeadAndBody = () => {
        setSnackHead(initHead)
        setsNackBody(initBody)
        setIsRun(false)
        changeDirection({ oldDirection: direction, newDirection: 'ArrowDown' })
    }

    useEffect(() => {
        if (width >= 750) {
            modal.confirm({
                title: 'PC端按键提示',
                content: (
                    <div>
                        <p>方向键：上 ｜ 下 ｜ 左 ｜ 右</p>
                        <p>开始｜暂停：空格键</p>
                        <p>加速键：Q</p>
                    </div>
                ),
                onOk: () => { },
            })
        }

    }, [])

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
        checkingStatusAndFeedback({ snackBody, width, height, initHeadAndBody })
    }, [isRun, snackHead])


    return (
        <SnackWrapper>
            <div className="map">
                {snackHeadView}
                {snackBodyView}
                {foodsView}
                {contextHolder}
                {
                    width < 650 &&
                    <>
                        <Controller {...{ changeDirection, direction }} />
                        <SpeedUp  {...{ changeSpeed }} />
                    </>
                }
            </div>
        </SnackWrapper>
    )
}


export default Snack
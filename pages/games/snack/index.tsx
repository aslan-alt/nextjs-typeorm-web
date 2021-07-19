import React, { useEffect, useRef, useState } from 'react'
import { Modal } from 'antd';
import { SnackWrapper } from '../../../styles/gameStyle'
import useSnackFood from 'hooks/Snack/useSnackFood';
import useSnackHead from 'hooks/Snack/useSnackHead';
import useDirection from 'hooks/Snack/useDirection';
import useSnackBody from 'hooks/Snack/useSnackBody';
import { getHeadAndBody, getWidthAndHeightByRouter } from 'lib/game/snack';
import Controller from 'components/Controller';
import SpeedUp from 'components/SpeedUp';
import useDialog from 'hooks/Snack/useDialog';



const Snack = () => {
    let { current } = useRef({ count: 0 })
    const ref2 = useRef<HTMLDivElement>(null)

    const [modal, contextHolder] = Modal.useModal();
    const { DialogNode, confirm } = useDialog()
    const { width, height } = getWidthAndHeightByRouter()
    const { initBody, initHead } = getHeadAndBody({ width, height })
    const { direction, currentRule, isRun, speed, setDirection, changeDirection, setIsRun, changeSpeed } = useDirection()

    const { foodList, foodsView, deleteEatenFoodAndCreateNewFood } = useSnackFood({ width, height })


    const { snackHead, snackHeadView, lastHead, findCurrentEatenFood, checkingStatusAndFeedback, setSnackHead } = useSnackHead({ initHead, direction, isRun, speed, currentRule, confirm })
    const { changeSnackBody, snackBody, snackBodyView, setsNackBody } = useSnackBody({ initBody })

    const initHeadAndBody = () => {
        setsNackBody(initBody)
        setSnackHead(initHead)
        setDirection('ArrowDown')
    }

    useEffect(() => {
        if (width >= 750) {
            modal.confirm({
                title: 'PC端按键提示',
                content: (
                    <div>
                        <p>方向键：上 ｜ 下 ｜ 左 ｜ 右</p>
                        <p>开始：空格键</p>
                        <p>暂停：空格键</p>
                        <p>加速键：Q</p>
                    </div>
                ),
                onOk: () => { },
            })
        } else {
            confirm({ title: '开始游戏', ok: () => { setIsRun(true) }, cancel: () => { location.href = '/' } })
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
        checkingStatusAndFeedback({ snackBody, width, height, initHeadAndBody, setIsRun })
    }, [isRun, snackHead])

    useEffect(() => {
        setTimeout(() => {
            ref2.current.scrollTo(0, 1000)
        })
    }, [])

    return (
        <SnackWrapper style={{ height, width }}>
            <div className="map" ref={ref2}>
                {snackHeadView}
                {snackBodyView}
                {foodsView}

                {
                    width < 650 &&
                    <>
                        <Controller {...{ changeDirection, direction }} />
                        <SpeedUp  {...{ changeSpeed }} />
                    </>
                }
                {contextHolder}
                {DialogNode}
            </div>
        </SnackWrapper>
    )
}


export default Snack
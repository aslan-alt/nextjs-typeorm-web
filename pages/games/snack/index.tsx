import React, { useState, useEffect, useRef } from 'react'
import { sleep } from 'lib'
import { SnackWrapper } from '../style'
import { createRuleHash, creatPlace, getHeadAndBody, getWidthAndHeightByRouter } from './methods';
import cs from 'classnames'
const Food = (options: PlaceOptions) => {
    return (
        <div className="food" style={{ left: options.x, top: options.y, background: options.background }}></div>
    )
}

const Snack = () => {
    const { width, height } = getWidthAndHeightByRouter()
    const { initHead, initBody } = getHeadAndBody({ width, height })
    let { current } = useRef({ count: 0 })

    const [state, setState] = useState({
        direction: 'ArrowDown' as Direction,
        snackBody: initBody,
        snackHead: initHead,
        foodList: creatPlace({ number: 10, width, height }),
        lastHead: { x: 0, y: 0 },
        runState: false,
        speed: 200,
    })
    const { direction, snackBody, snackHead, foodList, lastHead, runState, speed } = state

    const rules = createRuleHash(direction)

    const run = () => {
        if (runState) {
            const { key, value } = rules[direction]
            sleep(speed).then(() => {
                setState(state => ({ ...state, lastHead: state.snackHead }))
                setState(state => ({ ...state, snackHead: { ...state.snackHead, [key]: state.snackHead[key as 'x' | 'y'] + value } }))
            })
        }
    }

    const changeDirection = (newDirection: Direction) => {
        if (rules[direction].constraint) {
            setState(state => ({ ...state, direction: newDirection }))
        }
    }

    useEffect(() => {
        if (current.count !== 0) {
            const eatFood = foodList.find(food => {
                const d = Math.sqrt((snackHead.x - food.x) * (snackHead.x - food.x) + (snackHead.y - food.y) * (snackHead.y - food.y));
                if (d > 15) {
                    console.log("没有交集\n");
                }
                else if (d <= 15) {
                    return food
                }
            })
            if (eatFood) {
                setState(state => ({ ...state, foodList: state.foodList.filter(food => food !== eatFood).concat(creatPlace({ number: 1, width, height })) }))
                setState(state => ({ ...state, snackBody: [state.lastHead, ...state.snackBody] }))
            } else {
                setState(state => ({ ...state, snackBody: [state.lastHead, ...state.snackBody.slice(0, state.snackBody.length - 1)] }))
            }
        } else {
            current.count += 1
        }
    }, [lastHead, foodList])

    useEffect(() => {
        document.body.onkeydown = e => {
            if (e.code === 'Space') {
                setState(state => ({ ...state, runState: !state.runState }))
            }
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                const newDirection = e.code as Direction
                if (rules[newDirection].constraint) {
                    setState(state => ({ ...state, direction: newDirection }))
                }
            }
        }
    }, [rules])

    useEffect(() => {
        const biteYourself = snackBody.find(item => item.x === snackHead.x && item.y === snackHead.y)
        const outOfRange = (snackHead.x < 0 || snackHead.x > width - 10 || snackHead.y < 0 || snackHead.y > height - 10)
        if (biteYourself) {
            alert('niteYourSelf')
        } else if (outOfRange) {
            alert('outOfRange')
        } else {
            run()
        }
    }, [runState, snackHead])


    const headClass = cs("body-item", 'snack-head', ["ArrowDown", "ArrowUp"].includes(direction) && 'rotate')

    return (
        <SnackWrapper>
            <div className="map">
                <div className={headClass} style={{ left: snackHead.x, top: snackHead.y }}>
                    <div className="eye-left"></div>
                    <div className="eye-right"></div>
                </div>
                {snackBody.map((item, index) => {
                    return <div className="body-item" key={index} style={{ left: item.x, top: item.y }}></div>
                })}
                {foodList.map((foodProps, index) => <Food key={index} {...foodProps} />)}
            </div>
        </SnackWrapper>
    )
}


export default Snack
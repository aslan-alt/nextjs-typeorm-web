import React, { useState, useEffect, useRef } from 'react'
import { sleep } from 'lib'
import { SnackWrapper } from '../style'
import { useRouter } from 'next/router';
import { createRuleHash, creatPlace, getHeadAndBody } from './methods';

const Food = (options: PlaceOptions) => {
    return <div className="food" style={{ left: options.x, top: options.y }}>x</div>
}



const Snack = () => {
    const router = useRouter()
    const { query } = router
    const width = parseInt(query.width as string)
    const height = parseInt(query.height as string)
    const { initHead, initBody } = getHeadAndBody({ width, height })
    let { current } = useRef({ count: 0 })
    const [state, setState] = useState({
        snackBody: initBody,
        snackHead: initHead
    })

    const [snackBody, setSnackBody] = useState<BodyItem[]>(initBody)
    const [snackHead, setSnackHead] = useState<BodyItem>(initHead)
    const [foodList, setFoodList] = useState<PlaceOptions[]>(creatPlace({ number: 3, width, height }))

    const [lastHead, setLastHead] = useState<BodyItem>({ x: 0, y: 0 })
    const [runState, setRunState] = useState(false)
    const [speed, setSpeed] = useState(200)
    const [direction, setDirection] = useState<Direction>('ArrowDown')
    const rules = createRuleHash(direction)

    const run = () => {
        if (runState) {
            const { key, value } = rules[direction]
            sleep(speed).then(() => {
                setLastHead(snackHead)
                setSnackHead(state => ({ ...state, [key]: state[key as 'x' | 'y'] + value }))
            })
        }
    }

    const changeDirection = (newDirection: Direction) => {
        if (rules[direction].constraint) {
            setDirection(newDirection)
        }
    }

    useEffect(() => {
        if (current.count !== 0) {
            const eatFood = foodList.find(food => food.x === snackHead.x && food.y === snackHead.y)
            if (eatFood) {
                setFoodList(oldFoodList => {
                    return oldFoodList.filter(food => food !== eatFood).concat(creatPlace({ number: 1, width, height }))
                })
                setSnackBody(oldBody => [lastHead, ...oldBody])
            } else {
                setSnackBody(oldBody => [lastHead, ...oldBody.slice(0, oldBody.length - 1)])
            }
        } else {
            current.count += 1
        }
    }, [lastHead, foodList])

    useEffect(() => {
        document.body.onkeydown = e => {
            if (e.code === 'Space') {
                setRunState(state => {
                    console.log(!state)
                    return !state
                })
            }
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                const newDirection = e.code as Direction
                if (rules[newDirection].constraint) {
                    setDirection(newDirection)
                }
            }
        }
    }, [rules])

    useEffect(() => {
        const biteYourself = snackBody.find(item => item.x === snackHead.x && item.y === snackHead.y)
        const outOfRange = (snackHead.x < 0 || snackHead.x > width - 20 || snackHead.y < 0 || snackHead.y > height - 20)
        if (biteYourself) {
            alert('niteYourSelf')
        } else if (outOfRange) {
            alert('outOfRange')
        } else {
            run()
        }
    }, [runState, snackHead])


    return (
        <SnackWrapper>
            <div className="map">
                {[snackHead, ...snackBody].map((item, index) => {
                    return <div className="body-item" key={index} style={{ left: item.x, top: item.y }}></div>
                })}
                {foodList.map((foodProps, index) => <Food key={index} {...foodProps} />)}
            </div>
        </SnackWrapper>
    )
}


export default Snack
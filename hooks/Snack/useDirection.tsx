import { throttle } from "lib"
import { createRuleHash } from "pages/games/snack/methods"
import { useCallback, useEffect, useState } from "react"


type ChangeDirection = (options: setDirectionOptions) => void;

const useDirection = () => {
    const [isRun, setIsRun] = useState<boolean>(false)
    const [direction, setDirection] = useState<Direction>('ArrowDown')
    const [speed, setSpeed] = useState<number>(200)
    const rules = createRuleHash(direction)
    const currentRule = rules[direction]

    const changeDirection: ChangeDirection = throttle((options: setDirectionOptions) => {
        const { oldDirection, newDirection } = options
        console.log('direction-----------')
        console.log(oldDirection)
        console.log(newDirection)
        if (oldDirection !== newDirection) {
            console.log('xxxx')
            if (rules[newDirection].constraint) {
                setDirection(newDirection)
            }
        }
    }, 300)


    const changeSpeed = (speed: number) => {
        setSpeed(speed)
    }
    useEffect(() => {
        document.body.onkeydown = e => {
            if (e.code === 'KeyQ') {
                setSpeed(80)
            }
            if (e.code === 'Space') {
                setIsRun(!isRun)
            }
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {

                const newDirection = e.code as Direction
                console.log('newDirection-------')
                console.log(newDirection)
                changeDirection({ oldDirection: direction, newDirection })
            }
        }
        document.body.onkeyup = e => {
            if (e.code === 'KeyQ') {
                setSpeed(200)
            }
        }
    }, [isRun, direction])

    return { direction, setIsRun, changeDirection, rules, currentRule, isRun, speed, changeSpeed }
}
export default useDirection
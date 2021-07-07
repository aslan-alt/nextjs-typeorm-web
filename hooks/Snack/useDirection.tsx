import { createRuleHash } from "pages/games/snack/methods"
import { useEffect, useState } from "react"

const useDirection = () => {
    const [isRun, setIsRun] = useState<boolean>(false)
    const [direction, setDirection] = useState<Direction>('ArrowDown')

    const rules = createRuleHash(direction)
    const currentRule = rules[direction]

    const changeDirection = (newDirection: Direction) => {
        if (rules[direction].constraint) {
            setDirection(newDirection)
        }
    }
    useEffect(() => {
        document.body.onkeydown = e => {
            if (e.code === 'Space') {
                setIsRun(!isRun)
            }
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.code)) {
                const newDirection = e.code as Direction
                changeDirection(newDirection)
            }
        }
    }, [isRun])

    return { direction, changeDirection, rules, currentRule, isRun }
}
export default useDirection
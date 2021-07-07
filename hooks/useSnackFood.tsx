import { creatPlace } from "pages/games/snack/methods"
import { useState } from "react"

interface Props {
    width: number;
    height: number;
}


const useSnackFood = ({ width, height }: Props) => {
    const [foodList, setFoodList] = useState(creatPlace({ number: 10, width, height }))

    const foodsView = foodList.map((food, index) => <div key={index} className="food" style={{ left: food.x, top: food.y, background: food.background }}></div>)

    return { foodsView, foodList, setFoodList }
}

export default useSnackFood
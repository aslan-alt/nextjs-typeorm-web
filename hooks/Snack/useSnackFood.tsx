import {useEffect, useState} from 'react';
import {creatPlace} from 'lib/game/snack';

const useSnackFood = () => {
  const [foodList, setFoodList] = useState<FoodItem[]>([]);

  const deleteEatenFoodAndCreateNewFood = (eatFood: FoodItem) => {
    setFoodList(foodList.filter((food) => food !== eatFood).concat(creatPlace({number: 1})));
  };
  useEffect(() => {
    setFoodList(creatPlace({number: 30}));
  }, []);

  const foodsView = foodList.map((food, index) => (
    <div
      key={index}
      className="food"
      style={{left: food.x, top: food.y, background: food.background}}
    ></div>
  ));

  return {foodsView, foodList, setFoodList, deleteEatenFoodAndCreateNewFood};
};

export default useSnackFood;

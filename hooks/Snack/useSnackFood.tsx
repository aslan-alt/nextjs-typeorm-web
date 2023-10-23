import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {creatPlace} from 'lib/game/snack';

const useSnackFood = (isPhone: boolean) => {
  const [foodList, setFoodList] = useState<FoodItem[]>([]);

  const deleteEatenFoodAndCreateNewFood = (eatFood: FoodItem) => {
    setFoodList(foodList.filter((food) => food !== eatFood).concat(creatPlace({number: 1})));
  };
  useEffect(() => {
    setFoodList(creatPlace({number: isPhone ? 30 : 50}));
  }, []);

  const foodsView = foodList.map((food, index) => (
    <FoodNode key={index} style={{left: food.x, top: food.y, background: food.background}} />
  ));

  return {foodsView, foodList, setFoodList, deleteEatenFoodAndCreateNewFood};
};

const FoodNode = styled.div`
  width: 10px;
  height: 10px;
  position: absolute;
  border-radius: 50%;
  background: red;
`;

export default useSnackFood;

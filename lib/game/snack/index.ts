const createRuleHash = (currentDirection: Direction) => {
  return {
    ArrowLeft: {key: 'x', value: -15, constraint: currentDirection !== 'ArrowRight'},
    ArrowRight: {key: 'x', value: 15, constraint: currentDirection !== 'ArrowLeft'},
    ArrowDown: {key: 'y', value: 15, constraint: currentDirection !== 'ArrowUp'},
    ArrowUp: {key: 'y', value: -15, constraint: currentDirection !== 'ArrowDown'},
  };
};
const creatPlace = (options: CreatePlace) => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const {number} = options;
  const placeList = [];
  while (placeList.length !== number) {
    placeList.push({
      x: Math.floor(Math.random() * Math.floor((width - 20) / 100)) * 100,
      y: Math.floor(Math.random() * Math.floor((height - 20) / 100)) * 100,
      background: '#' + Math.floor(Math.random() * (2 << 23)).toString(16),
    });
  }

  return placeList;
};
const getHeadAndBody = (isPhone: boolean) => {
  return isPhone
    ? {
        initHead: {x: 200, y: 40},
        initBody: [
          {x: 200, y: 25},
          {x: 200, y: 10},
        ],
      }
    : {
        initHead: {x: 50, y: 20},
        initBody: [
          {x: 35, y: 20},
          {x: 20, y: 20},
        ],
      };
};

export {createRuleHash, creatPlace, getHeadAndBody};

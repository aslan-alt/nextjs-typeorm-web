const createRuleHash = (currentDirection: Direction) => {
    return {
        ArrowLeft: { key: 'x', value: -20, constraint: currentDirection !== 'ArrowRight' },
        ArrowRight: { key: 'x', value: 20, constraint: currentDirection !== 'ArrowLeft' },
        ArrowDown: { key: 'y', value: 20, constraint: currentDirection !== 'ArrowUp' },
        ArrowUp: { key: 'y', value: -20, constraint: currentDirection !== 'ArrowDown' },
    }
}
const creatPlace = (options: CreatePlace) => {
    const { number, width, height } = options
    const placeList = []
    while (placeList.length !== number) {
        placeList.push({
            x: Math.floor(Math.random() * Math.floor((width - 20) / 100)) * 100,
            y: Math.floor(Math.random() * Math.floor((height - 20) / 100)) * 100
        })
    }
    return placeList
}
const getHeadAndBody = ({ width, height }: GetHeadAndBody) => {
    let headAndBody = {
        initHead: { x: 40, y: 0 },
        initBody: [
            { x: 20, y: 0 },
            { x: 0, y: 0 }
        ]
    }
    if (width <= 700) {
        const phoneX = width - 20
        headAndBody = {
            initHead: { x: phoneX, y: 40 },
            initBody: [
                { x: phoneX, y: 20 },
                { x: phoneX, y: 0 }
            ]
        }
    }
    return headAndBody
}

export {
    createRuleHash,
    creatPlace,
    getHeadAndBody
}
import { useRouter } from 'next/router'

const createKeyEventHash = (Icons: IconItem) => {
    const router = useRouter()

    return {
        ArrowDown: (id: number) => { return id !== 3 ? id + 1 : 0 },
        ArrowUp: (id: number) => { return id !== 0 ? id - 1 : 3 },
        Enter: (id: number) => {
            const path = Icons.find(item => item.id === id)
            path && router.push(path.href)
            return id
        }
    }
}
interface CreateIcon {
    currentIndex: number;
    changeIndex: (newIndex: number) => void
}
const createIconsList = ({ currentIndex, changeIndex }: CreateIcon) => {
    return [
        { id: 0, name: 'game', href: '/games', alt: 'gameIcon', text: '玩游戏', height: 30, width: 48, currentIndex, changeIndex },
        { id: 1, href: '/games', name: 'curriculumVitae', alt: 'gameIcon', text: '看简历', currentIndex, changeIndex },
        { id: 2, href: '/games', name: 'messageBoard2', alt: 'gameIcon', text: '留言板', currentIndex, changeIndex },
        { id: 3, href: '/games', alt: 'messageBoard', text: '退出', height: 30, width: 48, currentIndex, changeIndex }
    ]
}

export {
    createKeyEventHash,
    createIconsList
}
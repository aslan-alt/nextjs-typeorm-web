import { useRouter } from 'next/router'

const createKeyEventHash = (Icons: IconItem[]) => {
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
    selectIndex: number;
    changeIndex: (newIndex: number) => void
}
const createIconsList = ({ selectIndex, changeIndex }: CreateIcon) => {
    return [
        { id: 0, name: 'game', href: '/games', text: '玩游戏', height: 30, width: 48, selectIndex, changeIndex },
        { id: 1, name: 'curriculumVitae', href: '/curriculumVitae', text: '看简历', selectIndex, changeIndex },
        { id: 2, name: 'messageBoard', href: '/messageBoard', text: '留言板', selectIndex, changeIndex },
        { id: 3, href: '/esc', text: '退出', height: 30, width: 48, selectIndex, changeIndex }
    ]
}
const disableF12 = () => {
    window.oncontextmenu = function (e) {
        e.preventDefault();
    }
    document.onkeydown = document.onkeyup = document.onkeypress = function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 123) {
            e.returnValue = false;
            return (false);
        }
    }
}

export {
    createKeyEventHash,
    createIconsList,
    disableF12
}
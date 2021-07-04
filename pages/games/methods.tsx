import { ModalStaticFunctions } from "antd/lib/modal/confirm"
import { message } from 'antd';

const inputSpaceToSnack = (goToSnack: () => void) => {
    document.onkeyup = (e) => {
        if (e.code === 'Space') {
            goToSnack()
        }
    }
    return () => {
        document.onkeyup = null
    }
}
interface AlertByWidth {
    width: number;
    modal: Omit<ModalStaticFunctions, "warn">
    onOk: () => void;
    onCancel: () => void
}
const alertByWidth = (options: AlertByWidth) => {
    const { width, modal, onOk, onCancel } = options
    if (width < 750) {
        modal.confirm({
            title: '通知',
            content: '将为您切换到竖屏',
            onOk,
            onCancel
        })
    } else {
        message.info('点击图标，或者输入空格选择游戏哈!', 3);
    }
}

export {
    inputSpaceToSnack,
    alertByWidth
}
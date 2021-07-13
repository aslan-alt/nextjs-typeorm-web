function sleep(time: number) {
    return new Promise((resolve) => {
        let timerId = setTimeout(() => {
            resolve(time)
            window.clearTimeout(timerId)
        }, time)
    });
}

const debounce = (fn: Function, delay: number) => {
    let timerId: NodeJS.Timeout = null
    return function (...args: any[]) {
        if (timerId) {
            return window.clearTimeout(timerId)
        }
        timerId = setTimeout(() => {
            fn.call(undefined, ...args)
        }, delay)
    }
}

const throttle = (fn: Function, delay: number) => {
    let toggle = true
    return function (...args: any[]) {
        if (toggle) {
            toggle = false
            fn.call(undefined, ...args)
            const timerId = setTimeout(() => {
                window.clearTimeout(timerId)
                toggle = true
            }, delay)
        }
    }
}
function friendlyDate(dateStr: string) {
    let dateObj = typeof dateStr === 'object' ? dateStr : new Date(dateStr)
    let space = Date.now() - dateObj.getTime()
    let str = ''
    switch (true) {
        case space < 60000:
            str = '刚刚'
            break
        case space < 1000 * 3600:
            str = Math.floor(space / 60000) + '分钟前'
            break
        case space < 1000 * 3600 * 24:
            str = Math.floor(space / (1000 * 3600)) + '小时前'
            break
        default:
            str = Math.floor(space / (1000 * 3600 * 24)) + '天前'
    }
    return str
}




export {
    sleep,
    debounce,
    throttle,
    friendlyDate
}
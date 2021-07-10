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





export {
    sleep,
    debounce,
    throttle
}
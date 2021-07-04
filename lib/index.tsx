function sleep(time: number) {

    return new Promise((resolve) => {
        let timerId = setTimeout(() => {
            resolve(time)
            window.clearTimeout(timerId)
        }, time)
    });
}
export {
    sleep
}
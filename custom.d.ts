type IconItem = {
    id: number;
    href: string;
    name?: string;
    currentIndex: number;
    text: string;
    width?: number;
    height?: number;
    changeIndex: (e: number) => void
}
type KeyUpEventHash = { [key: string]: (id: number) => number }
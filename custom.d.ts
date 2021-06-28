type IconItem = {
    id: number;
    href: string;
    name?: string;
    selectIndex: number;
    text: string;
    width?: number;
    height?: number;
    changeIndex: (e: number) => void
}
type KeyUpEventHash = { [key: string]: (id: number) => number }
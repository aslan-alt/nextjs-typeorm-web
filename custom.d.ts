type IconItem = {
    id: number;
    href: string;
    name?: string;
    currentIndex: number;
    alt: string;
    text: string;
    width?: number;
    height?: number;
    changeIndex: (e: number) => void
}[]
type KeyUpEventHash = { [key: string]: (id: number) => number }
type Direction = "ArrowUp" | "ArrowDown" | "ArrowLeft" | "ArrowRight"
type ButtonItem = {
    text: string;
    direction: Direction;
}
interface BodyItem {
    x: number;
    y: number;
}
interface PlaceOptions {
    x: number;
    y: number;
}
interface CreatePlace {
    number: number,
    width: number,
    height: number
}
interface GetHeadAndBody {
    width: number,
    height: number;
}
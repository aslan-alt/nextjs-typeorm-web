type IconItem = {
  id: number;
  href: string;
  name?: string;
  selectIndex: number;
  text: string;
  width?: number;
  height?: number;
  changeIndex: (e: number) => void;
};
type FoodItem = {
  x: number;
  y: number;
  background: string;
};

interface DialogOptions {
  title: string;
  ok: () => void;
  cancel: () => void;
}

type Direction = 'arrowUp' | 'arrowDown' | 'arrowLeft' | 'arrowRight';

interface BodyItem {
  x: number;
  y: number;
}

interface CreatePlace {
  number: number;
}

type StarList = {
  id: number;
  transformOrigin: string;
  transform: string;
}[];
type CommentItem = {
  id: number;
  userId: number;
  postId: number;
  content: string;
  user: string;
  post: string;
  createdAt: string;
  updateAt: string;
  nickname: string;
};
type KeyUpEventHash = {[key: string]: (id: number) => number};

type OptionsItem = {
  name?: string;
  id: number;

  href: string;
  text: string;
  height?: number;
  width?: number;
};

export const allPages: OptionsItem[] = [
  {
    id: 0,
    name: 'game',
    href: '/games',
    text: '玩游戏',
    height: 30,
    width: 48,
  },
  {
    id: 1,
    name: 'curriculumVitae',
    href: 'http://xiong-jingsong.gitee.io/cv-website',
    text: '看简历',
    height: 25,
    width: 48,
  },
  {
    id: 2,
    name: 'messageBoard',
    href: '/messageBoard',
    text: '留言板',
    height: 23,
    width: 48,
  },
  {
    id: 3,
    href: '/esc',
    text: '退出',
    height: 30,
    width: 48,
  },
];

export const keyEventHash: KeyUpEventHash = {
  ArrowDown: (id: number) => {
    return id !== 3 ? id + 1 : 0;
  },
  ArrowUp: (id: number) => {
    return id !== 0 ? id - 1 : 3;
  },
};

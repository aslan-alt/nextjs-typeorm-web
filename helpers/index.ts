type OptionsItem = {
  iconName?: string;
  id: number;

  href: string;
  text: string;
  height?: number;
  width?: number;
};

export const allPages: OptionsItem[] = [
  {
    id: 0,
    iconName: 'game',
    href: '/games',
    text: '玩游戏',
    height: 30,
    width: 48,
  },
  {
    id: 1,
    iconName: 'curriculumVitae',
    href: 'http://xiong-jingsong.gitee.io/cv-website',
    text: '看简历',
    height: 25,
    width: 48,
  },
  {
    id: 2,
    iconName: 'messageBoard',
    href: '/messageBoard',
    text: '留言板',
    height: 23,
    width: 48,
  },
  {
    id: 3,
    href: '/chatBot',
    text: 'chatBot',
    height: 30,
    width: 48,
  },
  {
    id: 4,
    href: '/esc',
    text: '退出',
    height: 30,
    width: 48,
  },
];

import {message} from 'antd';
import {ModalStaticFunctions} from 'antd/lib/modal/confirm';

const inputSpaceToSnack = (goToSnack: () => void) => {
  document.onkeyup = (e) => {
    if (e.code === 'Space') {
      goToSnack();
    }
  };
  return () => {
    document.onkeyup = null;
  };
};
interface AlertByWidth {
  width: number;
  modal: Omit<ModalStaticFunctions, 'warn'>;
  onOk: () => void;
  onCancel: () => void;
}
const alertByWidth = (options: AlertByWidth) => {
  const {width, modal, onOk, onCancel} = options;
  if (width < 750) {
    modal.confirm({
      title: '通知',
      content: (
        <div>
          <p>将为您切换到竖屏</p>
          <p>点击您要玩的游戏或者马里奥，都可以开始哦</p>
        </div>
      ),
      onOk,
      onCancel,
    });
  } else {
    message.info('点击图标，或者输入空格选择游戏哈!', 3);
  }
};

const createKeyEventHash = (Icons: IconItem[]) => {
  return {
    ArrowDown: (id: number) => {
      return id !== 3 ? id + 1 : 0;
    },
    ArrowUp: (id: number) => {
      return id !== 0 ? id - 1 : 3;
    },
    Enter: (id: number) => {
      const path = Icons.find((item) => item.id === id);
      location.href = path.href;
      return id;
    },
  };
};
interface CreateIcon {
  selectIndex: number;
  changeIndex: (newIndex: number) => void;
}
const createIconsList = ({selectIndex, changeIndex}: CreateIcon) => {
  return [
    {
      id: 0,
      name: 'game',
      href: '/games',
      text: '玩游戏',
      height: 30,
      width: 48,
      selectIndex,
      changeIndex,
    },
    {
      id: 1,
      name: 'curriculumVitae',
      href: 'http://xiong-jingsong.gitee.io/cv-website',
      text: '看简历',
      selectIndex,
      changeIndex,
    },
    {id: 2, name: 'messageBoard', href: '/messageBoard', text: '留言板', selectIndex, changeIndex},
    {id: 3, href: '/esc', text: '退出', height: 30, width: 48, selectIndex, changeIndex},
  ];
};
const disableF12 = () => {
  window.oncontextmenu = function (e: MouseEvent) {
    e.preventDefault();
  };
  document.onkeydown =
    document.onkeyup =
    document.onkeypress =
      function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 123) {
          e.returnValue = false;
          return false;
        }
      };
};

export {createKeyEventHash, createIconsList, disableF12, inputSpaceToSnack, alertByWidth};

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

const arrowDownOrArrowUp = () => {
  return {
    ArrowDown: (id: number) => {
      return id !== 3 ? id + 1 : 0;
    },
    ArrowUp: (id: number) => {
      return id !== 0 ? id - 1 : 3;
    },
  };
};

export {arrowDownOrArrowUp, inputSpaceToSnack};

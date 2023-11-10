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

export {inputSpaceToSnack};

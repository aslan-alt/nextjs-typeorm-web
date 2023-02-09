export interface ReducerState {
  showOptions: boolean;
  selectIndex?: number;
  inputValue: string;
  showButton: boolean;
  enterTimes: number;
}
export interface Actions {
  type:
    | 'setShowOptions'
    | 'setSelectIndex'
    | 'setInputValue'
    | 'setShowButton'
    | 'resetState'
    | 'setEnterTimes';
  payload?: any;
}
export const initialValue: ReducerState = {
  showOptions: false,
  selectIndex: 0,
  showButton: false,
  enterTimes: 0,
  inputValue: '',
};

const reducer = (state: ReducerState, action: Actions) => {
  const newStates = {
    setShowOptions: {...state, showOptions: action.payload},
    setSelectIndex: {...state, selectIndex: action.payload},
    setInputValue: {...state, inputValue: action.payload},
    setShowButton: {...state, showButton: action.payload},
    setEnterTimes: {...state, enterTimes: action.payload},
    resetState: initialValue,
  };
  return newStates[action.type];
};
export default reducer;

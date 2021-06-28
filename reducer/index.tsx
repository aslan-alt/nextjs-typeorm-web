export interface ReducerState {
    showOptions: boolean;
    selectIndex: number;
    inputValue: string;
    showButton: boolean
}
export interface Actions {
    type: 'setShowOptions' | 'setSelectIndex' | 'setInputValue' | 'setShowButton',
    payload: any
}
export const initialValue = {
    showOptions: false,
    selectIndex: 0,
    showButton: false,
    inputValue: ''
}

const reducer = (state: ReducerState, action: Actions) => {
    const newStates = {
        setShowOptions: { ...state, showOptions: action.payload },
        setSelectIndex: { ...state, selectIndex: action.payload },
        setInputValue: { ...state, inputValue: action.payload },
        setShowButton: { ...state, showButton: action.payload },
    }
    const x = newStates[action.type]
    console.log('new State -----x')
    console.log(x)
    return x
}
export default reducer
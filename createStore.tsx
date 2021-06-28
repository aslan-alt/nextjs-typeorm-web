import { createContext, useContext } from "react";
import reducer, { ReducerState, initialValue, Actions } from 'reducer'



export const Context = createContext<{
    state: ReducerState,
    dispatch: React.Dispatch<Actions>;
}>({
    state: initialValue,
    dispatch: () => undefined,
})
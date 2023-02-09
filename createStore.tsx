import {createContext} from 'react';
import {ReducerState, initialValue, Actions} from 'reducer';

export const Context = createContext<{
  state: ReducerState;
  dispatch: React.Dispatch<Actions>;
}>({
  state: initialValue,
  dispatch: () => undefined,
});

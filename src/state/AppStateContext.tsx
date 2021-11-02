import { createContext, Dispatch, useContext, useEffect } from 'react';
import { useImmerReducer } from 'use-immer';
import { save } from '../api';
import { DragItem } from '../DragItem';
import { withInitialState } from '../withInitialState';
import { Action } from './actions';
import { AppState, appStateReducer, List, Task } from './appStateReducer';


type AppStateContextProps = {
    draggedItem: DragItem | null;
    lists: List[];
    getTasksByListId(id: string): Task[];
    dispatch: Dispatch<Action>
}

const AppStateContext = createContext<AppStateContextProps>({} as AppStateContextProps);

type AppStateProviderProps = {
    children: React.ReactNode,
    initialState: AppState
}
export const AppStateProvider = withInitialState<AppStateProviderProps>(
    ({ children, initialState }) => {
        const [state, dispatch] = useImmerReducer(appStateReducer, initialState);
        const { draggedItem, lists } = state;

        const getTasksByListId = (id: string) => {
            return lists.find(list => list.id === id)?.tasks || [];
        };

        useEffect(() => {
            save(state);
        }, [state]);

        return (
            <AppStateContext.Provider value={ { draggedItem, lists, getTasksByListId, dispatch } }>
                { children }
            </AppStateContext.Provider>
        );
    });

export const useAppState = () => {
    return useContext(AppStateContext);
};

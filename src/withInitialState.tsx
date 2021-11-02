import { ComponentType, useEffect, useState } from 'react';
import { load } from './api';
import { AppState } from './state/appStateReducer';

type InjectedProps = {
    initialState: AppState
}

type PropsWithoutInjected<U> = Omit<U, keyof InjectedProps>

export function withInitialState<T>(WrappedComponent: ComponentType<PropsWithoutInjected<T> & InjectedProps>) {
    return (props: PropsWithoutInjected<T>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        });
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | undefined>();

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load();
                    setInitialState(data);
                } catch (e) {
                    if (e instanceof Error) {
                        setError(e);
                    }
                }
                setIsLoading(false);
            };
            fetchInitialState();
        }, []);

        if (isLoading) {
            return <div>Loading</div>;
        }
        if (error) {
            return <div>{ error.message }</div>;
        }

        return <WrappedComponent initialState={ initialState } { ...props }/>;
    };
}

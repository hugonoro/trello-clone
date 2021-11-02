import { AddNewItem } from './AddNewItem';
import { CustomDragLayer } from './CustomDragLayer';
import { addList } from './state/actions';
import { useAppState } from './state/AppStateContext';
import { AppContainer } from './styles';
import { Column } from './Column';

export const App = () => {
    const { lists, dispatch } = useAppState();

    return (
        <AppContainer>
            <CustomDragLayer/>
            { lists.map((list) => (
                <Column text={ list.text } key={ list.id } id={ list.id }/>
            )) }
            <AddNewItem
                onAdd={ text => dispatch(addList(text)) }
                toggleButtonText={ '+ Add another list' }/>
        </AppContainer>
    );
};

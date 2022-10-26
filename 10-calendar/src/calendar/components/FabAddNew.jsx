import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';
import '../../styles.css';

export const FabAddNew = () => {

    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();


    const handleClickNew = () => {
        setActiveEvent({
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2),
            user: {
                _id: 'ABC123',
                name: 'Santiago'
            }
        })
        openDateModal();
    }

    return (
        <button
            className="btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className='fas fa-plus'></i>
        </button>
    )
}

import { useCalendarStore } from '../../hooks';
import '../../styles.css';

export const FabDelete = () => {

    const { hasEventSelected, startDeletingEvent } = useCalendarStore();


    const handleDelete = async () => {
        await startDeletingEvent();
    }

    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={handleDelete}
            aria-label="btn-delete"
            style={{
                display: hasEventSelected ? '' : 'none'
            }}
        >
            <i className='fas fa-trash-alt'></i>
        </button>
    )
}

import { useEffect, useMemo, useState } from 'react';
import { addHours } from 'date-fns';
import { useCalendarStore, useForm, useUiStore } from '../../hooks';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import '../../styles.css';
import 'react-datepicker/dist/react-datepicker.css';
import esES from 'date-fns/locale/es'
import { differenceInSeconds } from 'date-fns/esm';

registerLocale('es', esES)

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root');

export const CalendarModal = () => {

    const [formSubmitted, setFormSubmitted] = useState(false);

    const { title, notes, start, end, onInputChange, onDateChanged, formState, onEventSelected } = useForm({
        title: '',
        notes: '',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const { isDateModalOpen, closeDateModal } = useUiStore();
    const { activeEvent, startSavingEvent } = useCalendarStore();

    const titleClass = useMemo(() => {

        if (!formSubmitted) return '';

        return title.length > 0
            ? ''
            : 'is-invalid'

    }, [title, formSubmitted])

    useEffect(() => {
        if (!!activeEvent) {
            onEventSelected({ ...activeEvent });
        }
    }, [activeEvent])


    const onSubmit = async (event) => {

        event.preventDefault();
        setFormSubmitted(true);

        const difference = differenceInSeconds(end, start);

        if (isNaN(difference) || difference <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadass');
            return;
        }

        if (title <= 0) {
            Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadass');
            return;
        }

        console.log(formState)

        await startSavingEvent(formState);
        closeDateModal();
        setFormSubmitted(false);
    }

    return (
        <Modal
            className='modal'
            overlayClassName='modal-fondo'
            isOpen={isDateModalOpen}
            onRequestClose={closeDateModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form
                onSubmit={onSubmit}
                className="container">

                <div className="form-group mb-2">
                    <label>Fecha y hora inicio</label>
                    <DatePicker
                        className='form-control'
                        onChange={(e) => onDateChanged(e, 'start')}
                        selected={start}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <div className="form-group mb-2">
                    <label>Fecha y hora fin</label>
                    <DatePicker
                        minDate={start}
                        className='form-control'
                        onChange={(e) => onDateChanged(e, 'end')}
                        selected={end}
                        dateFormat='Pp'
                        showTimeSelect
                        locale='es'
                        timeCaption='Hora'
                    />
                </div>

                <hr />
                <div className="form-group mb-2">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={`form-control ${titleClass}`}
                        placeholder="Título del evento"
                        name="title"
                        value={title}
                        onChange={onInputChange}
                        autoComplete="off"
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group mb-2">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={notes}
                        onChange={onInputChange}
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>

        </Modal>
    )
}

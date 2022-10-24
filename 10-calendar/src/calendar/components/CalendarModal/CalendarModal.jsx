import { useState } from 'react';
import { addHours } from 'date-fns';
import { useForm } from '../../../hooks/useForm';
import DatePicker, { registerLocale } from 'react-datepicker';
import Modal from 'react-modal';
import './CalendarModal.css';
import 'react-datepicker/dist/react-datepicker.css';
import esES from 'date-fns/locale/es'

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

    const [modalState, setModalState] = useState(true);

    const { title, notes, start, end, onInputChange, onDateChanged } = useForm({
        title: 'Santiago',
        notes: 'Sanchez',
        start: new Date(),
        end: addHours(new Date(), 2)
    });

    const onOpenModal = () => {
        setModalState(true);
    }

    const onCloseModal = () => {
        setModalState(false);
    }

    return (
        <Modal
            className='modal'
            overlayClassName='modal-fondo'
            isOpen={modalState}
            onRequestClose={onCloseModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h1> Nuevo evento </h1>
            <hr />
            <form className="container">

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
                        className="form-control"
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

import React from 'react';
import Modal from './ModalPortal';
import { connect } from 'react-redux';
import { hideConfirmModal } from '../duck/modal';
import Clear from '@material-ui/icons/Clear';
import '../sass/global.scss';

class ModalComponentConfirmation extends React.Component {

    render() {
        const {
            classNameModalForm,
            classNameBackdropForm,
            hideConfirmModal,
            showConfirm,
            title,
            typeConfirm, //jaký modal se otevírá: redux
            nameModalForm, //identifikator tohoto modalu
            afterClose, //potřebuji volat funkci při ukončení modalu křížkem nebo klikem vedle 
            onConfirm,


        } = this.props;
        const handleConfirm = (isConfirmed) => () => {
            hideConfirmModal();
            this.props.props.onConfirm(isConfirmed);
        };

        return (
            <Modal show={typeConfirm === nameModalForm ? showConfirm : false}>

                <div className={classNameModalForm}>
                    <div className="modal-header">
                        {title ? <h2 className="modal-title">{title}</h2> : null}
                        <button name="button-close-modal" onClick={() => (hideConfirmModal(), afterClose && afterClose())} className="button-close-modal"><Clear className="icon-button" /></button>
                    </div>
                    {/*this.props.children*/}
                    {this.props.children}


                    <div className="modal-footer confirm-footer">
                        <button name="saveButton" className="button button-modal" type="submit" onClick={handleConfirm(true)}>Ano</button>
                        <button name="discardButton" className="button buttonReset" type="button" onClick={handleConfirm(false)}>Ne</button>

                    </div>
                </div>
                {!this.props.noBackdrop &&
                    <div onClick={() => (hideConfirmModal(), afterClose && afterClose())} className={classNameBackdropForm} />}
            </Modal>
        );

    }

}




export default connect(state => state.modal, { hideConfirmModal })(ModalComponentConfirmation);
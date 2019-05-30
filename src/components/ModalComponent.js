import React from 'react';
import Modal from './ModalPortal';
import { connect } from 'react-redux';
import { hideModal, showModal } from '../duck/modal';
import Clear from '@material-ui/icons/Clear';
import '../sass/global.scss';

class ModalComponent extends React.Component {

    render() {
        const {
            classNameModalForm,
            classNameBackdropForm,
            hideModal,
            show,
            title,
            type, //jaký modal se otevírá: redux
            nameModalForm, //identifikator tohoto modalu
            afterClose //potřebuji volat funkci při ukončení modalu křížkem

        } = this.props;
        return (
            <Modal show={type === nameModalForm ? show : false}>

                <div className={classNameModalForm}>
                    {title ? <div className="modal-header">
                        <h2 className="modal-title">{title}</h2>
                    </div> : null}
                    <button name="button-close-modal" onClick={() => (hideModal(), afterClose && afterClose())} className="button-close-modal"><Clear className="icon-button" /></button>
                    {this.props.children}

                </div>
                {!this.props.noBackdrop &&
                    <div className={classNameBackdropForm} />}
            </Modal>
        );

    }

}




export default connect(state => state.modal, { hideModal, showModal })(ModalComponent);
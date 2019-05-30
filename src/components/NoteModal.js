import React from 'react';
import { connect } from 'react-redux';
import agent from '../agent';
import { hideModal } from '../duck/modal';
import { translation } from "../translate/translater";
import querystring from "query-string";


const mapStateToProps = state => ({
    ...state,
});

const mapDispatchToProps = dispatch => ({
    hideModal: (type, props) => dispatch(hideModal(type, props)),

});

class NoteModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            valid: true,
        };
    };

    saveNote(e) {
        const { hideModal, shotDownModal, createNew, saveToRedux, initialValues, tableData } = this.props;
        e.preventDefault();
        let copyTableData = [...tableData];
        if (this.title_ref.value === "") {
            return (
                this.setState({ valid: false })
            );
        } else {
            this.setState({ valid: true });
            if (createNew) {
                const sendData = Object.create({ title: this.title_ref.value }, {});
                agent.Notes.createNote(querystring.stringify(sendData)).then(
                    (res) => {
                        copyTableData.push(res)
                        Promise.all([
                            saveToRedux(copyTableData),
                            shotDownModal()
                        ]).then(() => hideModal())


                    }).catch(err => console.log('chyba při vytváření', err));
            } else {

                const sendData = Object.create({ title: this.title_ref.value }, {});
                agent.Notes.editNote(initialValues.id, querystring.stringify(sendData)).then(
                    (res) => {
                        const index = copyTableData.findIndex((i) => i.id === initialValues.id);
                        copyTableData[index] = res;
                        Promise.all([
                            saveToRedux(copyTableData),
                            shotDownModal()
                        ]).then(() => hideModal())


                    }).catch(err => console.log('chyba při editaci', err));
            }
        }
    }

    render() {
        const {
            language,
            initialValues,
        } = this.props;

        return (

            <form>
                <div className="formGroupInputLabel">
                    <label>{translation.localization[language.loc].modalLabel}</label>
                    <div>
                        <input
                            name="title"
                            component="input"
                            defaultValue={initialValues ? initialValues.title : ""}
                            type="text"
                            placeholder={translation.localization[language.loc].modalPlaceholder}
                            ref={node => this.title_ref = node}
                            onFocus={() => this.setState({ valid: true })}
                        />
                        {((this.state.valid) ? null : <span className="form-error">!<span className="tooltiptext">{translation.localization[language.loc].modalValidMsg}</span></span>)}
                    </div>
                </div>
                <div className="modal-footer">
                    <button name="buttonSave" type="button" className="button button-modal" onClick={(e) => this.saveNote(e)}>{translation.localization[language.loc].modalSave}</button>


                </div>

            </form>
        );
    };
};

NoteModal = connect(
    mapStateToProps, mapDispatchToProps
)(NoteModal);

export default NoteModal;


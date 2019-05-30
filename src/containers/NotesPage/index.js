import React, { Component } from 'react'
import { connect } from 'react-redux';
import agent from '../../agent';
import { initialDataLoad, getActiveRowData } from '../../duck/notes';
import {
    ModalComponent,
    ModalComponentConfirmation,
    NoteModal
} from '../../components';
import { translation } from "../../translate/translater";
import DeleteIcon from "@material-ui/icons/Delete";
import InfoIcon from "@material-ui/icons/Info";
import Edit from '@material-ui/icons/Create';
import { hideConfirmModal, showConfirmModal, showModal } from '../../duck/modal';
import { Link } from 'react-router-dom';
import '../../sass/notesPage.scss';


const mapStateToProps = (state) => ({
    ...state,
    tableData: state.notes.initialNotes,
    activeTableRow: state.notes.activeRowData
});

const mapDispatchToProps = (dispatch) => ({
    initialList: data => dispatch(initialDataLoad(data)),
    showModal: (type, props) => dispatch(showModal(type, props)),
    showConfirmModal: (type, props) => dispatch(showConfirmModal(type, props)),
    hideConfirmModal: (type, props) => dispatch(hideConfirmModal(type, props)),
    getRowData: data => dispatch(getActiveRowData(data)),
});
class NotesPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeModal: false,
        };
    };
    componentDidMount() {
        agent.Notes.getNotes().then(
            (res) => {
                console.log('response', res);
                this.props.initialList(res);
            }
        )
    }
    changeURL = url => {
        this.props.history.push(url);
    };
    generateBody = () => {
        const { tableData, language } = this.props;
        console.log('notes', tableData);
        return tableData.map((row) => {
            return <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td title={translation.localization[language.loc].listEdit}><Edit className="icon-button" onClick={(e) => this.edit(e, row)} /></td>
                <td title={translation.localization[language.loc].listDelete}><DeleteIcon className="icon-button" onClick={(e) => this.delete(e, row)} /></td>
                <td title={translation.localization[language.loc].listInfo}><InfoIcon className="icon-button" onClick={(e) => this.info(e, row)} /></td>
            </tr>
        })

    }
    delete = (e, row) => {
        const { tableData, initialList } = this.props;
        e.preventDefault();
        let copyTableData = [...tableData];
        console.log('Delete', row.id);
        this.props.showConfirmModal('confirmDeleteNote', {
            onConfirm: (isConfirmed) => {
                if (isConfirmed) {
                    agent.Notes.removeNote(row.id).then(
                        () => {
                            const index = copyTableData.findIndex((i) => i.id === row.id);
                            console.log('delete id', index);
                            copyTableData.splice(index, 1);
                            console.log('Odstraneny item v poli', copyTableData);
                            initialList(copyTableData);
                        }).catch(err => console.log('chyba při mazání', err));
                } else {
                    this.props.hideConfirmModal();
                }
            }
        });
    }
    add = (e) => {
        const { showModal } = this.props;
        e.preventDefault();
        Promise.all([
            this.setState({ activeModal: true })
        ]).then(
            () => showModal('newNote', null)
        )
        console.log('Add');
    }
    info = (e, row) => {
        e.preventDefault();
        console.log('info', row);
        this.changeURL(`/info/${row.id}`);
    }
    edit = (e, row) => {
        const { showModal, getRowData } = this.props;
        e.preventDefault();
        console.log('e value', e.target.value);
        Promise.all([
            getRowData(row),
            this.setState({ activeModal: true })
        ]).then(
            () => showModal('editNote', null)
        )
        console.log('Edit');
    }
    shotDownModal = () => {
        this.setState({ activeModal: false });
        this.props.getRowData();
    };
    render() {
        const { tableData, activeTableRow, language } = this.props;
        console.log('activeTableRow initial', activeTableRow);
        return (
            <div className="main-wrapper">




                <table className="table-main">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>{translation.localization[language.loc].listTitle}</th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateBody()}
                    </tbody>
                </table>
                <button className="add-button" onClick={(e) => this.add(e)} >Přidat poznámku</button>
                {this.state.activeModal ? <ModalComponent nameModalForm="newNote" classNameModalForm="modalForm middleSize" classNameBackdropForm="backdropForm" title="Nová poznámka">
                    <NoteModal
                        createNew={true}
                        saveToRedux={this.props.initialList}
                        shotDownModal={this.shotDownModal}
                        tableData={tableData}

                    />
                </ModalComponent> : null}

                {this.state.activeModal && activeTableRow ? <ModalComponent nameModalForm="editNote" classNameModalForm="modalForm middleSize" classNameBackdropForm="backdropForm" title="Editování poznámky">
                    <NoteModal
                        createNew={false}
                        saveToRedux={this.props.initialList}
                        shotDownModal={this.shotDownModal}
                        tableData={tableData}
                        initialValues={activeTableRow}
                    />
                </ModalComponent> : null}
                <ModalComponentConfirmation nameModalForm="confirmDeleteNote" classNameModalForm="modalForm confirmSize" classNameBackdropForm="backdropForm" title="Opravdu odstranit poznámku?" />
            </div>
        )
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);



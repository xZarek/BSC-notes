import React, { Component } from 'react'
import { connect } from 'react-redux';
import agent from '../../agent';
import { initialDataLoad } from '../../duck/notes';
import { Link } from 'react-router-dom';
import '../../sass/notesPage.scss';




const mapStateToProps = (state) => ({
    ...state,
    tableData: state.notes.initialNotes
});

const mapDispatchToProps = (dispatch) => ({
    initialList: data => dispatch(initialDataLoad(data))
});
class NotesPage extends Component {
    componentDidMount() {
        agent.Notes.getNotes().then(
            (res) => {
                console.log('response', res);
                this.props.initialList(res);
            }
        )
    }
    generateBody = () => {
        const { tableData } = this.props;
        console.log('notes', tableData);
        return tableData.map((row) => {
            return <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.title}</td>
                <td>tužka</td>
                <td>koš</td>
            </tr>
        })

    }
    render() {

        return (
            <div >
                <table className="table-main">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Popisek</th>
                            <th>Editovat</th>
                            <th>Smazat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.generateBody()}
                    </tbody>
                </table>
            </div>
        )
    }


}



export default connect(mapStateToProps, mapDispatchToProps)(NotesPage);

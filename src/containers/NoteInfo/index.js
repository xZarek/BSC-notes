import React, { Component } from 'react'
import { connect } from 'react-redux';
import { infoNoteLoad } from '../../duck/notes';
import agent from '../../agent';
import { translation } from "../../translate/translater";
import "../../sass/noteInfo.scss";

const mapStateToProps = (state) => ({
    ...state,
    deatilData: state.notes.infoNote,
});

const mapDispatchToProps = (dispatch) => ({
    getInfoNote: data => dispatch(infoNoteLoad(data)),
});
class NoteInfo extends Component {

    componentDidMount() {
        const { match, getInfoNote } = this.props;
        agent.Notes.getNote(match.params.noteId).then(
            (res) => getInfoNote(res)
        ).catch(err => console.log('chyba při získávání infa', err));
    }
    componentWillUnmount() {
        const { getInfoNote } = this.props;
        getInfoNote();
    }
    return = () => {
        const { history } = this.props;
        history.goBack();
    }

    render() {
        const { deatilData, language } = this.props;
        return (
            <div className="info-text">
                <div className="label-info">{translation.localization[language.loc].noteInfoName}</div>
                {deatilData ? <div className="text-info"><span className="label-name">Id:</span> <span>{deatilData.id}</span>
                    <span className="label-name">{translation.localization[language.loc].noteInfoTitle}:</span> <span>{deatilData.title}</span></div> : null}
                <button onClick={() => this.return()}>{translation.localization[language.loc].noteInfoBack}</button>
            </div>
        )
    }


}


export default connect(mapStateToProps, mapDispatchToProps)(NoteInfo);



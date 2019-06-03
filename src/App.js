import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withStyles, Grid, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "./containers/Pages";
import NotesPage from "./containers/NotesPage";
import SwitcherLocation from "./components/SwitcherLocation"
import { selectLanguageLoad } from './duck/language';
import NoteInfo from "./containers/NoteInfo";
import { translation } from "./translate/translater";
import "./sass/global.scss";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({
    selectLocation: data => dispatch(selectLanguageLoad(data)),

});

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        color: theme.palette.text.primary,
        minHeight: 425,
        height: "100%",
        boxSizing: "border-box"
    },
    button: {
        margin: theme.spacing(2)
    }
});



export class App extends React.Component {

    getTranslateProps = () => {
        return (
            this.props.language !== undefined
                ? this.props.language.loc
                : 'cz'
        )
    }
    handleChange = (event) => {
        this.props.selectLocation(event.target.value);
    }
    render() {
        const { classes, language } = this.props;
        const translater = translation.localization[this.getTranslateProps()] ? translation.localization[this.getTranslateProps()] : [];
        return (
            <Fragment>
                <div className="header-wrap">
                    <SwitcherLocation value={this.getTranslateProps()} handleChange={this.handleChange} />
                    <h2>BCS {translater.headName}</h2>



                </div>
                <div className="main-container">
                    <div className={classes && classes.root}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>

                                <Paper className={classes.paper}>

                                    <Router basename="/">
                                        <div>
                                            <Switch>
                                                <Route exact={true} path="/" component={NotesPage} />
                                                <Route exact={true} path="/home" component={NotesPage} />
                                                <Route exact={true} path="/info/:noteId" component={NoteInfo} />
                                                <Route component={NotFound} />
                                            </Switch>
                                        </div>
                                    </Router>
                                </Paper>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Fragment >
        );
    }
}
App.defaultProps = {
    classes: {},
    language: {},
};
//export default connect(mapStateToProps, mapDispatchToProps)(App);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));
//export default App;


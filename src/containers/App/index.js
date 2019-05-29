import React, { Fragment } from "react";
import { connect } from "react-redux";
import { withStyles, Grid, Paper } from "@material-ui/core";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { NotFound } from "../Pages";
import NotesPage from "../NotesPage";
import "../../sass/global.scss";

const mapStateToProps = state => ({
    ...state
});

const mapDispatchToProps = dispatch => ({});

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    paper: {
        // padding: theme.spacing.unit * 2,
        //textAlign: 'center',
        display: "grid",
        color: theme.palette.text.primary,
        minHeight: 425,
        height: "100%",
        boxSizing: "border-box"
    },
    button: {
        margin: theme.spacing(2)
    }
});

class App extends React.Component {
    componentDidMount() { }

    render() {
        const { classes } = this.props;
        return (
            <Fragment>
                <div className="header-wrap">
                    <h2>BCS poznámky</h2>
                </div>
                <div className="main-container">
                    <div className={classes.root}>
                        <Grid container spacing={8}>
                            <Grid item xs={12}>
                                <Paper className={classes.paper}>
                                    <Router basename="/">
                                        <div>
                                            <Switch>
                                                <Route exact={true} path="/" component={NotesPage} />
                                                <Route exact={true} path="/home" component={NotesPage} />

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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(App));


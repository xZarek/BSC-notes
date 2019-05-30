import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translation } from "../../translate/translater";


import PropTypes from 'prop-types';
const mapStateToProps = (state) => ({
    ...state,
});

class NotFound extends Component {


    render() {
        const { language } = this.props;
        return (
            <div>
                <h1>{translation.localization[language.loc].pageNotFound}</h1>
            </div>
        );
    }
}

NotFound.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect(mapStateToProps, null)(NotFound);
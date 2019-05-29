import React, { Component } from 'react';
import { connect } from 'react-redux';


import PropTypes from 'prop-types';

class NotFound extends Component {


    render() {
        return (
            <div>
                <h1>Stránka nenalezena</h1>
            </div>
        );
    }
}

NotFound.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(NotFound);
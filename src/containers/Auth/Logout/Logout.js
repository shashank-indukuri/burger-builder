import React, { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

class Logout extends Component {

    componentDidMount() {
        this.props.OnLogout();
    }
    render() {
        return (<Redirect to="/" />);
    }
}

const mapDispatchToProps = dispatch => {
    return {
        OnLogout: () => dispatch(actions.authLogout())
    }
}

export default connect(null, mapDispatchToProps)(Logout);
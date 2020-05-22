import React, {Component} from 'react';
import Aux from '../Auxilary/Auxilary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import {connect} from 'react-redux';

class Layout extends Component{
    state = {
        sideDrawer : false
    };

    sideDrawerCloseHandler = () => {
        this.setState({sideDrawer : false});
    }

    sideDrawerToggleHandler = () => {
        this.setState((prevState) => {
           return {sideDrawer : ! prevState.sideDrawer}
        });
    }
    render () {
        return (
            <Aux>
            <Toolbar toggle={this.sideDrawerToggleHandler} isAuth={this.props.isAuthenticated}/>
            <SideDrawer open={this.state.sideDrawer} isAuth={this.props.isAuthenticated} clicked={this.sideDrawerCloseHandler}/>
            <main className={classes.Content} >
                {this.props.children}
            </main>
        </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
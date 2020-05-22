import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidty } from '../../shared/utility';

class Auth extends Component {
    state = {
        Controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignUp: true
    };

    inputChangeHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.Controls, {
            [controlName]: updateObject(this.state.Controls[controlName], {
                value: event.target.value,
                valid: checkValidty(event.target.value, this.state.Controls[controlName].validation),
                touched: true
            })
        });
        this.setState({ Controls: updatedControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.OnAuth(this.state.Controls.email.value, this.state.Controls.password.value, this.state.isSignUp);
    }

    switchAuthHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.Controls) {
            formElementArray.push({
                id: key,
                config: this.state.Controls[key]
            });
        }
        let form = formElementArray.map(formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                valueType={formElement.config.elementConfig.placeholder}
                invalid={!formElement.config.valid} />
        ));
        if (this.props.loading) {
            form = <Spinner />;
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }
        let redirect = null;
        if (this.props.isAuthenticated) {
            if (this.props.price.toFixed(2) > 4.00) {
                redirect = <Redirect to='/checkout' />;
            } else {
                redirect = <Redirect to='/' />;
            }
        }
        return (
            <div className={classes.Auth}>
                {redirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType='Success'>Submit</Button>
                </form>
                <Button btnType='Danger' clicked={this.switchAuthHandler}>SWITCH IN {this.state.isSignUp ? 'SIGIN' : 'SIGNUP'}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        price: state.burger.totalPrice
    };
};

const mapDispatchToProps = dispatch => {
    return {
        OnAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
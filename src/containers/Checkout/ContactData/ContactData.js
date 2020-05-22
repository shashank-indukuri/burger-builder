import React, { Component } from 'react';
import classes from './ContactData.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidty } from '../../../shared/utility';

class ContactData extends Component {
    state = {
        OrderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZipCode'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true
            }
        },
        formIsValid: false
    };

    orderSubmit = () => {
        const formData = {};
        for (let formElement in this.state.OrderForm) {
            formData[formElement] = this.state.OrderForm[formElement].value;
        }
        const order = {
            ingredients: this.props.ing,
            price: this.props.price,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.OnOrderBurger(order, this.props.token);
    }

    inputChangeHandler = (event, inputElement) => {
        const updatedFormElement = updateObject(this.state.OrderForm[inputElement], {
            value: event.target.value,
            valid: checkValidty(event.target.value, this.state.OrderForm[inputElement].validation),
            touched: true
        });
        const updatedForm = updateObject(this.state.OrderForm, {
            [inputElement]: updatedFormElement
        });
        let formValid = true;
        for (let inputElement in updatedForm) {
            formValid = updatedForm[inputElement].valid && formValid;
        }
        this.setState({ OrderForm: updatedForm, formIsValid: formValid });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.OrderForm) {
            formElementArray.push({
                id: key,
                config: this.state.OrderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderSubmit}>
            {formElementArray.map(formElement => (
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
            ))}
            <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderSubmit}>ORDER</Button>
        </form>);
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burger.ingredients,
        price: state.burger.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        OnOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
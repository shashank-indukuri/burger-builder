import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';

class Checkout extends Component {

    goBackHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.push('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ing) {
            const purchaseRedirect = this.props.purchased ? <Redirect to="/" /> : null;
            summary =
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ing}
                        clickCancel={() => this.goBackHandler()}
                        clickContinue={() => this.continueHandler()} />
                    <Route path={this.props.match.url + '/contact-data'}
                        component={ContactData} />
                </div>
        }
        return (
            <div>
                {summary}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ing: state.burger.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStateToProps)(Checkout);
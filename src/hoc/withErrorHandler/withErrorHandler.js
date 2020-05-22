import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilary from '../Auxilary/Auxilary';

const withErroHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: null
        };


        UNSAFE_componentWillMount () {           
           this.reqInt = axios.interceptors.request.use(req => {
            this.setState({error: null});
            return req;
             });
    
            this.resInt = axios.interceptors.response.use(res => res, error => {
                 this.setState({error: error});
             });
        }

        UNSAFE_componentWillUnmount () {
            axios.interceptors.request.eject(this.reqInt);
            axios.interceptors.response.eject(this.resInt);
        }

        errorConfirmationHandler = () => {
            this.setState({error: null});
        }

        render () {
            return(
                <Auxilary>
                    <Modal show={this.state.error} modalClosed={this.errorConfirmationHandler}>
                        {this.state.error? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxilary>
            );
        }
    }
};

export default withErroHandler;
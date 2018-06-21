import React, { Component } from 'react';
import moment from 'moment';

import Styles from './styles.scss';
import {connect} from "react-redux";
import Spinner from "../../Spinner";
import {bindActionCreators} from "redux";
import {fetchPayment} from "../../../actions/main";


class PaymentInfo extends Component{
    componentDidMount() {
        const { payment } = this.props;
        if(payment === null) {
            this.props.fetchPayment();
        }
    }

    render () {
        const { payment } = this.props;
        const { showSpinner } = this.props;
        let paymentComponent;
        if(showSpinner) {
            paymentComponent = <Spinner size={50}/>
        } else if(payment === null) {
            paymentComponent = null;
        } else {
            const expDate = payment.get('expirationDate');
            const tasksNumber = payment.get('tasksNumber');
            if(expDate !== null) {
                paymentComponent =
                    <p className = {Styles.Time}>Subscription available till: <time>{ moment(expDate).format('MMMM D YYYY') }</time></p>
            } else {
                paymentComponent =
                    <p className = {Styles.Tasks}>You can create <a>{ tasksNumber }</a> tasks</p>
            }
        }

        return (
            <section className = {Styles.PaymentInfo}>
                { paymentComponent }
            </section>
        )
    }

}
const mapStateToProps = (state) => ({
    payment: state.main.get('payment'),
    showSpinner: state.main.get('showPaymentSpinner')
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchPayment
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(PaymentInfo);
import React, {Component, Fragment} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Control, Form } from 'react-redux-form';

import Styles from './styles.scss';
import {login, showLoginForm, showSignupForm, signup, showError, hideError} from "../../../actions/login";
import Spinner from "../../Spinner";


class LoginForm extends Component{
    submit = (data) => {
        const { loginParams: login } = this.props;

        const isErrorShowed = login.get('error').get('show');
        if(isErrorShowed){
            this.props.hideError();
        }

        try{
            this._formValidation(data);
        }catch ({message}){
            this.props.showError(message);
            return;
        }

        const isLogin = login.get('isLogin');
        if(isLogin){
            this.props.login(data)
        }else{
            this.props.signup(data)
        }

    };
    switchForm = () => {
        const { loginParams: login } = this.props;
        const isLogin = login.get('isLogin');
        if(isLogin){
            this.props.showSignupForm()
        }else{
            this.props.showLoginForm()

        }
    };
    _formValidation = data => {
        for(const key in data){
            if(this._isEmpty(data[key])){
                throw new Error(`Field ${key} is required`)
            }
        }
    };
    _isEmpty = str => str.length === 0;

    render () {
        const { loginParams: login } = this.props;
        const isLogin = login.get('isLogin');
        const error = login.get('error');
        const showSpinner = login.get('ui').get('showSpinner');
        const errorComponent = error.get('show') ? <p>{error.get('errorMessage')}</p> : null;
        const submitText = isLogin ? 'Sign in' : 'Sign up';
        const model = isLogin ? 'login' : 'signup';
        const submitComponent = showSpinner ? <Spinner size = {70}/> :
            <button type = 'submit'>
                {submitText}
            </button>;
        const switchFormComponent = showSpinner ? null : isLogin ?
            <div><span>Don't have an account? <a onClick={this.switchForm}>Sign up</a></span></div> :
            <div><span>Have an account?  <a onClick={this.switchForm}>Sign in</a></span></div>;

        const signUpFields = !isLogin ?
            <Fragment>
                <Control.select model={`forms.${model}.location`} defaultValue="">
                    <option value="" disabled>Select your city</option>
                    <option value="kyiv">Kyiv</option>
                    <option value="kosice">Kosice</option>
                </Control.select>
            </Fragment> : null;

        return (
            <section className = {Styles.LoginForm}>
                <h1>Instamax</h1>
                {errorComponent}
                <Form
                    model = {`forms.${model}`}
                    onSubmit = { this.submit }>
                    <Control.text
                        model = {`forms.${model}.username`}
                        placeholder = 'Enter instagram username'
                        type = 'text'
                    />
                    <Control.text
                        model = {`forms.${model}.password`}
                        placeholder = 'Enter instagram password'
                        type = 'password'
                    />
                    { signUpFields }
                    { submitComponent }
                </Form>

                { switchFormComponent }

            </section>
        )
    }

}
const mapStateToProps = (state) => ({
    loginParams : state.login
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        showLoginForm,
        showSignupForm,
        login,
        signup,
        showError,
        hideError
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import { Transition, TransitionGroup } from 'react-transition-group';
import Styles from './styles.scss';
import InstaScreen from "../../components/login/InstaScreen";
import LoginForm from "../../components/login/LoginForm";
import {changeScreens} from "../../actions/login";


class Login extends Component{

    componentDidMount () {
        const { changeScreens } = this.props;
        // this.interval = setInterval(changeScreens, 5000);
    }

    componentWillUnmount () {
        // clearInterval(this.interval);
    }



    render () {
        const { screens } = this.props;
        const rows = [];
        let index = 0;
        let screenIndex = 0;
        for(let i = 0; i < 3; i++) {
            let raw = screens.slice(index, index + 3).map(s =>
                    <InstaScreen index={screenIndex++} key={s} screen={s}/>
            );
            index += 3;

            rows.push(
                <div key={i}>{ raw }</div>
            );
        }
        return (
            <section className = {Styles.Login}>
                <LoginForm/>
                <div className = {Styles.Container}>
                    { rows }
                </div>
            </section>
        )
    }

}
const mapStateToProps = (state) => ({
    screens: state.login.get('ui').get('currentScreens')
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        changeScreens
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Login);
import React, {Component, Fragment} from 'react';
import Styles from './styles.scss';

import testAvatar from '../../../theme/assets/img/test_user.png'
import PaymentInfo from "../PaymentInfo";
import {bindActionCreators} from "redux";
import { connect } from "react-redux";
import {fetchCurrentUser} from "../../../actions/auth";
import Spinner from "../../Spinner";
import {showTasksDialog} from "../../../actions/main";

class UserHeader extends Component{

    componentDidMount() {
        const currentUser = this.props.auth.get('currentUser');
        if (currentUser === null) {
            this.props.fetchCurrentUser();
        }
    }
    handleCreateTaskClick = () => {
      this.props.showTasksDialog();
    };
    render () {
        const showUserSpinner = this.props.main.get('showUserSpinner');
        const currentUser = this.props.auth.get('currentUser');
        const imgComponent = showUserSpinner ?  <Spinner size={150}/> :
            currentUser === null ? null :
                <Fragment>
                    <img src={currentUser.get('icon')}/>
                    <button onClick={this.handleCreateTaskClick}>Create task</button>
                </Fragment>;
        const userName = showUserSpinner ? null :
            currentUser === null ? null :
                currentUser.get('username');

        return (
            <section className = {Styles.UserHeader}>
                <div className = {Styles.ProfileImg} >
                    { imgComponent }
                </div>
                <div className = {Styles.ProfileInfo}>
                    <span>{ userName }</span>
                    <PaymentInfo/>
                </div>
                <div className = {Styles.LogoutContainer}>
                    <button>Logout</button>
                </div>
            </section>
        )
    }

}

const mapStateToProps = (state) => ({
    main: state.main,
    auth: state.auth
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchCurrentUser,
        showTasksDialog
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserHeader);
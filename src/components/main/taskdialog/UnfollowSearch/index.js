import React, { Component } from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Styles from './styles.scss';
import {TextField, Toggle} from "material-ui";
import {disableCreateButton, enableCreateButton} from "../../../../actions/main";
import {setUnfollow} from "../../../../actions/search";


class UnfollowSearch extends Component{
    state = {
        disabled: false,
        usersCount: ''
    };
    changeInputHandler = e => {
        const { disabledCreateButton } = this.props;

        if (e.target.value.length === 0 || e.target.value === '0') {
            this.props.disableCreateButton();
        } else {
            if(disabledCreateButton){
                this.props.enableCreateButton();
            }        }
        this.setState({
            usersCount: e.target.value
        });
        const { disabled } = this.props;

        this.props.setUnfollow({
            all: disabled,
            number: Number(e.target.value)
        })
    };
    changeToggleHandler = (e, isInputChecked) => {
        const { usersCount } = this.state;
        this.setState({
            disabled: isInputChecked
        });
        if (isInputChecked) {
            this.props.enableCreateButton();
        } else {
            if (usersCount.length === 0 || usersCount === '0') {
                this.props.disableCreateButton();
            }
        }
        this.props.setUnfollow({
            all: isInputChecked,
            number: Number(usersCount)
        });
    };
    render () {
        const { disabled } = this.state;
        return (
            <section className = {Styles.UnfollowSearch}>
                <div className={Styles.Header}>
                    <h1>General</h1>
                </div>
                <TextField
                    hintText="Users number"
                    floatingLabelText="Type number of user for unfollowing"
                    floatingLabelStyle={{color: '#3897f0'}}
                    floatingLabelFocusStyle={{color: '#3897f0'}}
                    underlineFocusStyle={{borderColor: '#3897f0'}}
                    floatingLabelFixed={true}
                    onChange={this.changeInputHandler}
                    type='number'
                    min='0'
                    disabled={disabled}
                />
                <div className={Styles.ToggleContainer}>
                    <Toggle
                        label="Unfollow from all followers"
                        labelStyle={{
                            width: 'auto',
                            fontWeight: 100,
                            paddingRight: 16
                        }}
                        thumbSwitchedStyle={{backgroundColor: '#3897f0'}}
                        trackSwitchedStyle={{backgroundColor: 'rgba(56, 151, 240, 0.7)'}}
                        onToggle={this.changeToggleHandler}
                    />
                </div>
            </section>
        )
    }
}
const mapStateToProps = (state) => ({
    disabledCreateButton: state.main.get('disabledCreateButton')
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        disableCreateButton,
        enableCreateButton,
        setUnfollow
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UnfollowSearch);
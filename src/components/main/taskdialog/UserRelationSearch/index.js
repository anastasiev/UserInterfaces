import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import { relationColor } from '../../../../helper/colors'
import Styles from './styles.scss';
import {setRelation} from "../../../../actions/search";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {disableCreateButton, enableCreateButton} from "../../../../actions/main";
import {UserRelationType} from "../../../../helper/tasksprops";

class UserRelationSearch extends Component{
    state = {
        userName: '',
        relation: UserRelationType.FOLLOWED_BY
    };
    changeInputHandler = e => {
        const value = e.target.value;
        const { relation } = this.state;
        const { disabledCreateButton } = this.props;
        if (value === '') {
            this.props.disableCreateButton();
        } else {
            if(disabledCreateButton){
                this.props.enableCreateButton();
            }
        }
        this.props.setRelation({
            userName: value,
            relation
        });
        this.setState({
            userName: value
        });
    };
    changeRadioButtonHandler = (e, value) => {
        const { userName } = this.state;
        this.setState({
            relation: value
        });
        if (userName !== '') {
            this.props.setRelation({
                relation: value,
                userName
            });
        }

    };
    componentDidUpdate(prevProps){
        const { active: prevActive } = prevProps;
        const { active: currentActive } = this.props;
        const { userName, relation } = this.state;
        if( prevActive === false && currentActive === true && userName !== '' ) {
            this.props.setRelation({
                userName,
                relation
            });
            this.props.enableCreateButton();
        }
    }
    render () {
        const { active } = this.props;
        return (
            <section className = {`${Styles.UserRelationSearch} ${active || Styles.Disabled}`}>
                <div className={Styles.Header}>
                    <h1>Users<i className={`${Styles.Tag} material-icons`}>perm_identity</i></h1>
                </div>
                <div className={Styles.Body}>
                    <TextField
                        hintText="Example: dmytro.anastasiev"
                        floatingLabelText="Type username"
                        floatingLabelStyle={{color: relationColor}}
                        floatingLabelFocusStyle={{color: relationColor}}
                        underlineFocusStyle={{borderColor: relationColor}}
                        disabled={!active}
                        floatingLabelFixed={true}
                        onChange={this.changeInputHandler}

                    />
                    <RadioButtonGroup name="relation"
                                      defaultSelected={UserRelationType.FOLLOWED_BY}
                                      style={{
                                          float: 'right',
                                          width: 150,
                                          paddingTop: 20,
                                          paddingRight: 30
                                      }}
                                      onChange={this.changeRadioButtonHandler}
                    >
                        <RadioButton
                            value={UserRelationType.FOLLOWS}
                            label="Follows"
                            iconStyle={{fill: relationColor}}
                            disabled={!active}
                        />
                        <RadioButton
                            value={UserRelationType.FOLLOWED_BY}
                            label="Followed by"
                            iconStyle={{fill: relationColor}}
                            disabled={!active}
                        />
                    </RadioButtonGroup>
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
        setRelation
    }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(UserRelationSearch);
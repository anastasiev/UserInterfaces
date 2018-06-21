import React, {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import {Tab, Tabs} from "material-ui";
import FontIcon from 'material-ui/FontIcon';

import FollowAction from "../FollowAction";
import LikeAction from "../LikeAction";
import UnfollowAction from "../UnfollowAction";
import {disableCreateButton} from "../../../../actions/main";
import {changeActionType} from "../../../../actions/search";
import {ActionType} from "../../../../helper/tasksprops";

class DialogTabs extends Component {
    state = {
        likeStyle: {
            backgroundColor: '#3897f0',
            color: 'rgba(255, 255, 255, 0.4)'
        },
        followStyle: {
            backgroundColor: '#3897f0',
            color: 'rgba(255, 255, 255, 1)'
        },
        unfollowStyle: {
            backgroundColor: '#3897f0',
            color: 'rgba(255, 255, 255, 0.4)'
        },
        activeTab: ActionType.FOLLOW
    };

    followActiveHandler = () => {
        this.props.changeActionType({
            actionType: ActionType.FOLLOW,
            mediaNumber: null
        });
        this.setState({
            likeStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 0.4)'
            },
            followStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 1)'
            },
            unfollowStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 0.4)'
            }
        });
    };
    likeActiveHandler = () => {
        this.props.changeActionType({
            actionType: ActionType.LIKE,
            mediaNumber: 1
        });
        this.setState({
            likeStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 1)'
            },
            followStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 0.4)'
            },
            unfollowStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 0.4)'
            }
        });
    };
    unfollowActiveHandler = () => {
        this.props.changeActionType({
            actionType: ActionType.UNFOLLOW,
            mediaNumber: null
        });
        this.setState({
            likeStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 0.4)'
            },
            followStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 0.4)'
            },
            unfollowStyle: {
                backgroundColor: '#3897f0',
                color: 'rgba(255, 255, 255, 1)'
            }
        });
    };
    tabsChangeHandler = (activeTab) => {
        this.props.disableCreateButton();
        this.setState({
            activeTab
        });
    };
    render() {
        const { likeStyle, followStyle, unfollowStyle, activeTab } = this.state;
        return (
            <Tabs
                inkBarStyle={{
                    backgroundColor: '#ffffff',
                    height: 3,
                }}
                tabItemContainerStyle={{
                    boxShadow: 'rgba(0, 0, 0, 0.3) 0px 3px 5px'
                }}
                onChange={this.tabsChangeHandler}
            >
                <Tab
                    icon={<FontIcon className="material-icons">supervisor_account</FontIcon>}
                    label="FOLLOW"
                    style={ followStyle }
                    onActive={this.followActiveHandler}
                    value={ActionType.FOLLOW}
                >
                    {
                        activeTab === ActionType.FOLLOW && <FollowAction/>
                    }
                </Tab>

                <Tab
                    icon={<FontIcon className="material-icons">favorite_border</FontIcon>}
                    label="LIKE"
                    style={ likeStyle }
                    onActive={this.likeActiveHandler}
                    value={ActionType.LIKE}
                >
                    {
                        activeTab === ActionType.LIKE && <LikeAction/>
                    }
                </Tab>
                <Tab
                    icon={<FontIcon className="material-icons">visibility_off</FontIcon>}
                    label="UNFOLLOW"
                    style={ unfollowStyle }
                    onActive={this.unfollowActiveHandler}
                    value={ActionType.UNFOLLOW}
                >
                    {
                        activeTab === ActionType.UNFOLLOW && <UnfollowAction/>
                    }

                </Tab>
            </Tabs>
        )
    }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        disableCreateButton,
        changeActionType
    }, dispatch);
export default connect(undefined, mapDispatchToProps)(DialogTabs)
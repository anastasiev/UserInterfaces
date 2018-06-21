import React, {Component, Fragment} from 'react';

import {ActionType} from "../../../../helper/tasksprops";
import Styles from './styles.scss'

export default class TaskType extends Component{
    render () {
        const { action } = this.props;
        let actionIcon = <i className="material-icons">favorite_border</i>;
        let actionText = 'LIKE';
        switch (action) {
            case ActionType.LIKE:
                actionIcon = <i className="material-icons">favorite_border</i>;
                actionText = 'LIKE';
                break;
            case ActionType.FOLLOW:
                actionIcon = <i className="material-icons">supervisor_account</i>;
                actionText = 'FOLLOW';
                break;
            case ActionType.UNFOLLOW:
                actionIcon = <i className="material-icons">visibility_off</i>;
                actionText = 'UNFOLLOW';
                break;
        }
        return (
            <Fragment>
                {actionIcon}<span className={Styles.TaskType}>{actionText}</span>
            </Fragment>
        )
    }

}
import React, { Component } from 'react';
import Styles from './styles.scss';
import TaskActions from "../TaskActions";
import ProgressTooltip from "../ProgressTooltip";
import Status from "../Status";
import Target from "../Target";
import {ActionType, TaskMenuActions, TaskStatus} from "../../../../helper/tasksprops";
import TaskType from "../TaskType";
import SearchParamView from "../SearchParamView";


export default class Task extends Component{
    state = {
      showActions: false
    };
    showActions = () =>{
        this.setState({showActions: true})
    };
    hideActions = () =>{
        this.setState({showActions: false})
    };
    render () {
        const { task }= this.props;
        const type = task.get('type');
        const search = task.get('search');
        const status = task.get('status');
        const progress = task.get('progress');

        const { showActions } = this.state;
        let actions;
        switch (status) {
            case TaskStatus.ACTIVE:
                actions = [TaskMenuActions.PAUSE, TaskMenuActions.INFO, TaskMenuActions.REMOVE];
                break;
            case TaskStatus.PAUSED:
                actions = [TaskMenuActions.RESUME, TaskMenuActions.INFO, TaskMenuActions.REMOVE];
                break;
            case TaskStatus.DONE:
                actions = [TaskMenuActions.INFO, TaskMenuActions.REMOVE];
                break;
            default:
                actions = [TaskMenuActions.PAUSE, TaskMenuActions.INFO, TaskMenuActions.REMOVE];


        }
        return (
            <tr className = {Styles.Task}>
                <td><TaskType action={type}/></td>
                <td><SearchParamView search={search}/></td>
                <td><Status status={status}/></td>
                <td><span className={Styles.Progress}>{progress}</span></td>
                <td  className={Styles.Setting}>
                    <span onMouseLeave={this.hideActions}>
                        <i onClick={this.showActions} className="material-icons">settings</i>
                        {showActions ? <TaskActions id={this.props.task.get('id')} hideActions={this.hideActions} actions={actions} /> : null}
                    </span>
                </td>
            </tr>
        )
    }

}
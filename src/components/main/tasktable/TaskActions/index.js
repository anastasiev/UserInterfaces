import React, { Component } from 'react';
import Styles from './styles.scss';
import {TaskMenuActions} from "../../../../helper/tasksprops";
import {bindActionCreators} from "redux";
import {fetchCurrentUser} from "../../../../actions/auth";
import {pauseTask, removeTask, resumeTask} from "../../../../actions/tasks";
import {connect} from "react-redux";


class TaskActions extends Component{

    handleResume = () => {
        const {id, resumeTask} = this.props;
        resumeTask(id);
        this.props.hideActions();
    };
    handlePause = () => {
        const {id, pauseTask} = this.props;
        pauseTask(id);
        this.props.hideActions();
    };
    handleGetInfo = () => {
        this.props.hideActions();
        console.log('info')
    };
    handleRemove = () => {
        const {id, removeTask} = this.props;
        removeTask(id);
        this.props.hideActions();
    };

    render () {
        const { actions } = this.props;
        const actionsComponent = actions.map(a => {
           switch(a) {
               case TaskMenuActions.RESUME:
                   return <p onClick={this.handleResume} key='resume'><i className="material-icons">play_circle_outline</i><span>Resume</span></p>;
               case TaskMenuActions.PAUSE:
                   return <p onClick={this.handlePause} key='pause'><i className="material-icons">pause_circle_outline</i><span>Pause</span></p>;
               case TaskMenuActions.INFO:
                   return <p onClick={this.handleGetInfo} key='info'><i className="material-icons">info_outline</i><span>Info</span></p>;
               case TaskMenuActions.REMOVE:
                   return <p onClick={this.handleRemove} key='remove'><i className="material-icons">remove_circle_outline</i><span>Remove</span></p>;
           }
        });
        return (
            <section className = {Styles.TaskActions}>{ actionsComponent }</section>
        )
    }
}
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        pauseTask,
        resumeTask,
        removeTask
    }, dispatch);
export default connect(undefined, mapDispatchToProps)(TaskActions)
import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {Map} from 'immutable'

import Styles from './styles.scss';

import {bindActionCreators} from "redux";
import {disableCreateButton, hideTaskInfoDialog, hideTasksDialog, showTaskInfoDialog} from "../../../../actions/main";
import {connect} from "react-redux";
import DialogTabs from "../DialogTabs";
import TaskInfoDialog from "../TaskInfoDialog";
import {ActionType, TaskStatus} from "../../../../helper/tasksprops";


class TaskDialog extends Component{

    closeDialog = () => {
        this.props.hideTasksDialog();
        this.props.disableCreateButton();
    };

    getTaskFromSearch = () => {
        const { search } = this.props;
        const { tags, locations, user, unfollow } = search.inputSearchWrapper;
        const searchBody = tags !== null ? Map({tags}) :
                           locations !== null ? Map({locations}) :
                           user !== null ? Map({text: user.userName}) :
                           unfollow.all ? Map({text: 'ALL'}) : Map({text: unfollow.number});
        return  {
            type: search.inputActionWrapper.actionType,
            mediaNumber: search.inputActionWrapper.mediaNumber,
            search: searchBody,
            status: TaskStatus.PREPARING,
            message: 'Task is being prepared'
        }
    };

    render () {
        const { createButtonDisabled, showTaskInfoDialog, showTaskConfirmationDialog } = this.props;
        const actions = [
            <RaisedButton
                label="Cancel"
                onClick={this.closeDialog}
                style={{marginRight: 10}}
            />,
            <RaisedButton
                label="Create"
                onClick={showTaskInfoDialog}
                backgroundColor='#3897f0'
                labelColor='#ffffff'
                disabled={createButtonDisabled}
            />,
        ];
        return (
            <Dialog
                actions={actions}
                open={this.props.showTasksDialog}
                onRequestClose={this.closeDialog}
                titleStyle={{display: 'none'}}
                bodyStyle={{
                    padding: 0,
                }}
                className={Styles.TaskDialog}
                actionsContainerStyle={{marginTop: 10}}
                modal={true}
            >
                <DialogTabs/>
                {   showTaskConfirmationDialog &&
                    <TaskInfoDialog create task={this.getTaskFromSearch()}/>
                }
            </Dialog>
        )
    }

}
const mapStateToProps = (state) => ({
    showTasksDialog: state.main.get('showTasksDialog'),
    createButtonDisabled: state.main.get('disabledCreateButton'),
    search: state.search,
    showTaskConfirmationDialog: state.main.get('showTaskInfoDialog')

});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        hideTasksDialog,
        disableCreateButton,
        showTaskInfoDialog
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskDialog)
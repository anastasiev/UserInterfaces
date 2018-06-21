import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {hideTaskInfoDialog, hideTasksDialog} from "../../../../actions/main";
import {createTask} from "../../../../actions/tasks";
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
} from 'material-ui/Table';
import Styles from './styles.scss';
import TaskType from "../../tasktable/TaskType";
import SearchParamView from "../../tasktable/SearchParamView";
import Status from "../../tasktable/Status";

class TaskInfoDialog extends Component {
    createTask = () => {
        this.props.hideTaskInfoDialog();
        this.props.hideTasksDialog();
        this.props.createTask()
    };
    render () {
        const { hideTaskInfoDialog, create, task, showDialog } = this.props;
        const actions = [
            <RaisedButton
                label="Cancel"
                onClick={hideTaskInfoDialog}
                style={{marginRight: create ? 10 : 0}}
            />
        ];
        if ( create ) {
            actions.push(
                <RaisedButton
                label="Create"
                onClick={this.createTask}
                backgroundColor='#3897f0'
                labelColor='#ffffff'/>
            )
        }
        const title = create ? 'Do you really want to create this task ?' : 'Task info';
        const mediaNumberText = `${task.mediaNumber} ${task.mediaNumber > 1 ? 'posts' : 'post'}`;

        return (
            <Dialog
                actions={actions}
                open={showDialog}
                onRequestClose={hideTaskInfoDialog}
                title={title}
                titleStyle={{
                    textAlign: 'center',
                    fontWeight: 100
                }}
            >

                <Table>
                    <TableHeader
                        displaySelectAll={false}
                        adjustForCheckbox={false}
                    >
                        <TableRow>
                            <TableHeaderColumn style={{textAlign: 'center'}}>TYPE</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>SEARCH</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>STATUS</TableHeaderColumn>
                            <TableHeaderColumn style={{textAlign: 'center'}}>INFO</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody
                        displayRowCheckbox={false}
                    >
                        <TableRow>
                            <TableRowColumn><TaskType action={task.type}/>{ task.mediaNumber !== null && <span className={Styles.MediaNumber}>{mediaNumberText}</span> }</TableRowColumn>
                            <TableRowColumn><div className={Styles.InfoMessage}><SearchParamView search={task.search} block/></div></TableRowColumn>
                            <TableRowColumn><Status status={task.status}/></TableRowColumn>
                            <TableRowColumn
                                style={{textAlign: 'center'}}
                            >
                                <span className={Styles.InfoMessage}>{task.message}</span>
                            </TableRowColumn>
                        </TableRow>
                    </TableBody>
                </Table>

            </Dialog>
        )

    }
}

const mapStateToProps = (state) => ({
    showDialog: state.main.get('showTaskInfoDialog')
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        hideTaskInfoDialog,
        createTask,
        hideTasksDialog
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TaskInfoDialog)
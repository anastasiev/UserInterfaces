import React, { Component } from 'react';
import Styles from './styles.scss';
import Task from "../Task";
import {ActionType, TaskStatus} from "../../../../helper/tasksprops";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchTasks} from "../../../../actions/tasks";



class TasksTable extends Component{

    render () {
        const { tasks } = this.props;

        const tasksComponents = tasks.map( t => <Task key={t.get('id')} task={t}/>);
        return (
            <section className = {Styles.TasksTable}>
                <table>
                    <thead>
                        <tr>
                            <th>TYPE</th>
                            <th>SEARCH</th>
                            <th>STATUS</th>
                            <th>PROGRESS</th>
                            <th>ACTIONS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasksComponents}
                    </tbody>
                </table>

            </section>
        )
    }
}
const mapStateToProps = (state) => ({
    tasks: state.tasks.get('tasks')
});

export default connect(mapStateToProps)(TasksTable)
import React, { Component } from 'react';
import Styles from './styles.scss';
import UserHeader from "../../components/main/UserHeader";
import TasksTable from "../../components/main/tasktable/TasksTable";
import {connect} from "react-redux";
import {fetchTasks} from "../../actions/tasks";
import {bindActionCreators} from "redux";
import Spinner from "../../components/Spinner";
import TaskDialog from "../../components/main/taskdialog/TaskDialog";



class Main extends Component{

    componentDidMount() {
        this.props.fetchTasks();
    }


    render () {
        const showTable = this.props.tasks.size > 0;
        const { showSpinner} = this.props;
        return (
            <section className = {Styles.Main}>
                <UserHeader/>
                {
                    showSpinner ? <Spinner size={60}/> : showTable ? <TasksTable/> :
                    <h1>You have not created tasks yet</h1>
                }
                <TaskDialog/>
            </section>
        )
    }
}
const mapStateToProps = (state) => ({
    tasks: state.tasks.get('tasks'),
    showSpinner: state.main.get('showTasksSpinner'),
    showTasksDialog: state.main.get('showTasksDialog')
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({
        fetchTasks
    }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Main)
import React, { Component } from 'react';
import Styles from './styles.scss';
import {TaskStatus} from "../../../../helper/tasksprops";


export default class Status extends Component{
    render () {
        const { status } = this.props;
        let style;
        let text;
        switch (status) {
            case TaskStatus.ACTIVE:
                style = Styles.Active;
                text = 'ACTIVE';
                break;
            case TaskStatus.INTERRUPTED:
                style = Styles.Interrupted;
                text = 'INTERRUPTED';
                break;
            case TaskStatus.PAUSED:
                style = Styles.Paused;
                text = 'PAUSED';
                break;
            case TaskStatus.STOPPED:
                style = Styles.Stopped;
                text = 'STOPPED';
                break;
            case TaskStatus.DONE:
                style = Styles.Done;
                text = 'DONE';
                break;
            case TaskStatus.PREPARING:
                style = Styles.Preparing;
                text = 'PREPARING';
                break;
        }
        return (
            <p className = {`${style} ${Styles.Status}`}>
                { text }
            </p>
        )
    }

}
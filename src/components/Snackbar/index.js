import React, { Component } from "react";
import Styles from './styles.scss';


export default class Snackbar extends Component {
    render () {
        const { error, message } = this.props;
        return (
            <section className = {Styles.Snackbar}/>
        )
    }
}
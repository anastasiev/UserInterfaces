import React, { Component } from 'react';
import Styles from './styles.scss';
import UnfollowSearch from "../UnfollowSearch";


export default class UnfollowAction extends Component{
    render () {
        return (
            <section className = {Styles.UnfollowAction}>
                <UnfollowSearch/>
            </section>
        )
    }

}
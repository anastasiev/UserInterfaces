import React, { Component } from 'react';
import Styles from './styles.scss';


export default class InstaScreen extends Component{
    render () {
        const { screen, index } = this.props;
        return (
            <img className = {`${Styles.InstaScreen} ${index > 4 ? Styles.Mobile : null}`} src={screen}/>
        )
    }

}
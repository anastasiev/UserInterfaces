import React, { Component } from 'react';
import Styles from './styles.scss';

import mainIcon from '../../theme/assets/img/main.png'



export default class Header extends Component {

    render () {
        return (
            <section className = { Styles.Header }>
                <img src={mainIcon}/>
                <span>Instamax</span>
            </section>
        )
    }

}
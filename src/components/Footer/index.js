import React, { Component } from 'react';
import Styles from './styles.scss';


export default class Footer extends Component{
    render () {
        return (
            <section className = { Styles.Footer }>
                <p>Guns&Rocket © 2018</p>
            </section>
        )
    }
}
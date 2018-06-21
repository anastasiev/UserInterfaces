import React, { Component } from 'react';
import spinner from '../../theme/assets/img/spinner.gif'

export default class Spinner extends Component {

    render () {
        const { size = 50 } = this.props;
        return (
            <div>
                <img style={{width: size, height: size}} src = { spinner } />
            </div>
        );
    }
}

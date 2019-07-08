import React, { Component } from 'react';
import '../../assets/styles/common/global.scss';

class Breadcrumb extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='breadcrumbs'>
                {this.props.children}
            </div>
        );
    }
}

export default Breadcrumb;
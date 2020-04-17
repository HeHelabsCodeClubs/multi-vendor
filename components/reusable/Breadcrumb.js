import React, { Component } from 'react';

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
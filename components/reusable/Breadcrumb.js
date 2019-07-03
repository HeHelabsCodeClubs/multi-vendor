import React, { Component } from 'react';
import '../../assets/styles/common/global.scss';

class Breadcrumb extends Component {
    render() {
        return (
            
            <div className='breadcrumbs'>
                <a href="#" className="breadcrumb-link">Home</a>
                <span> / </span>
                <a href="#" className="breadcrumb-link">Categories</a>
                <span> / </span>
                <a href="#" className="breadcrumb-current">Electronics</a>
            </div>
        )
    }
}

export default Breadcrumb;
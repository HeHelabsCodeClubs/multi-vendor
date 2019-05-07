import React, { Component } from 'react';
import FullPageSlider from '../../adds/FullPageSlider'; 

class Add extends Component {
    constructor(props) {
        super(props);
    }

    renderAdd(addType, data) {
        switch(addType) {
            case 'slider':
                return <FullPageSlider adds={data} />
            default:
                return null;

        }
    }
    render() {
        const { type, data } = this.props;
        return this.renderAdd(type, data);
    }   
}

export default Add;
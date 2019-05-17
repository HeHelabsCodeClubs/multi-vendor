import React, { Component } from 'react';
import FullPageSlider from '../../ads/FullPageSlider'; 
import Promotion from '../homepage/Promotion';

class Ad extends Component {
    constructor(props) {
        super(props);
    }

    renderAdd(addType, data) {
        switch(addType) {
            case 'slider':
                return <FullPageSlider adds={data} />
            case 'default':
                return <Promotion events={data} />
            default:
                return null;
        }
    }
    render() {
        const { type, data } = this.props;
        return this.renderAdd(type, data);
    }   
}

export default Ad;
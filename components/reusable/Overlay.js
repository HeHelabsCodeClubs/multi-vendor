import React, { Component } from 'react';

class Overlay extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false
        };
    }
    componentWillReceiveProps(nextProps) {
        const { show } = nextProps;
        if (show !== this.state.show) {
            this.setState({
                show: show
            });
        }
    }
    render () {
        const { show } = this.state;
        const overlayClass = show ? 'overlay show' : 'overlay';
        return (
            <div className={overlayClass}></div>
        );
    }
}

export default Overlay;

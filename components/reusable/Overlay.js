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
        const { overlayContent } = this.props;
        const overlayClass = show ? 'overlay show' : 'overlay';
        if (overlayContent === null) {
            return (
                <div className={overlayClass}></div>
            );
        }
        return (
            <div className={overlayClass}>
                {overlayContent}
            </div>
        );
    }
}

export default Overlay;

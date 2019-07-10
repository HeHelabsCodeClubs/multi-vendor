import React, { Component } from 'react';
import OrderSuccess from './OrderSuccess';
import OrderFailure from './OrderFailure';

export default class OrderFeedback extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayedLayout: 'none',
            message: ''
        };
        this.renderLayout = this.renderLayout.bind(this);
    }

    componentDidMount() {
        const { displayedLayout, message } = this.props;
        this.setState({
            displayedLayout,
            message
        });
    }

    componentWillReceiveProps(nextProps) {
        const { displayedLayout, message } = nextProps;
        this.setState({
            displayedLayout,
            message
        });
    }

    renderLayout() {
        const { displayedLayout, message } = this.state;
        console.log('i am here')
        if (displayedLayout === 'success') {
            return(
                <OrderSuccess message={message}/>
            );
        }

        if (displayedLayout === 'failure') {
            return (
                <OrderFailure message={message} />
            );
        }

        return null;
    }

    render() {
        return this.renderLayout();
    }
}
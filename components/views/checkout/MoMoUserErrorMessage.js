import React, { Component } from 'react';

export default class MoMoUserErrorMessage extends Component {
    constructor(props) {
        super(props);
        this.state ={
            shouldCancel: false,
            shouldRetry: false
        }
        this.updateStatesPerProps = this.updateStatesPerProps.bind(this);
        this.renderActionButton = this.renderActionButton.bind(this);
    }
    componentDidMount() {
        this.updateStatesPerProps(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.updateStatesPerProps(nextProps);
    }
    updateStatesPerProps(props) {
        const { shouldRetry, shouldCancel } = props;
        if (shouldRetry !== undefined) {
            this.setState({
                shouldRetry: shouldRetry
            });
        }

        if (shouldCancel !== undefined) {
            this.setState({
                shouldCancel: shouldCancel
            });
        }
    }
    renderActionButton() {
        const { 
            shouldRetry, 
            shouldCancel,
            onActionCallback
        } = this.props;
        if (shouldRetry) {
            return (
                <button
                type="button"
                className="action-button"
                onClick={() => onActionCallback ? onActionCallback() : null}>
                    Try again
                </button>
            );
        }

        if (shouldCancel) {
            return (
                <button
                type="button" 
                className="action-button"
                onClick={() => onActionCallback ? onActionCallback() : null}>
                    Cancel Transaction
                </button>
            );
        }
        return null;
    }
    render() {
        const { 
            message
        } = this.props;
        return (
            <div>
                <h5 className="has-error">
                    {message}
                </h5>
                {this.renderActionButton()}
            </div>
        );
    }
}
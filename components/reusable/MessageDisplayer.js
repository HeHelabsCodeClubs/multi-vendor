import React, { Component } from 'react';

export default class MessageDisplayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDisplayed: false,
            boxClassNames: 'validation-error-box'
        };
        this.displayBox = this.displayBox.bind(this);
        this.hideBox = this.hideBox.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { display } = nextProps;
        if (display) {
            this.displayBox();
        } else  {
            this.hideBox();
        }
    }

    displayBox(){
        this.setState({
            boxClassNames: 'validation-error-box display'
        });
        setTimeout(() => {
            this.setState({
                boxClassNames: 'validation-error-box display show'
            });
        }, 300);
    }

    hideBox() {
        const { boxClassNames } = this.state;
        if (boxClassNames === 'validation-error-box display show') {
            this.setState({
                boxClassNames: 'validation-error-box display'
            });
            setTimeout(() => {
                this.setState({
                    boxClassNames: 'validation-error-box'
                });
            }, 300);
        }
    }

    render() {
        const { errorMessage, type } = this.props;
        const { boxClassNames } = this.state;
        const finalClassName = type === 'success' ? `${boxClassNames} success` : boxClassNames;
        return (
            <div className={finalClassName}>
                {errorMessage}
            </div>
        );
    }
}
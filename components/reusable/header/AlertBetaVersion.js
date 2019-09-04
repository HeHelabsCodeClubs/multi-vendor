import React, { Component } from 'react';

class AlertBetaVersion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertVisibility: true
        };
        this.closeAlertPopup = this.closeAlertPopup.bind(this);
        this.renderAlertContent = this.renderAlertContent.bind(this);
    }

    closeAlertPopup() {
        this.setState({
            alertVisibility: false
        });
    }

    renderAlertContent () {
        const { alertVisibility } = this.state;
        if (alertVisibility) {
            return (
                <div className="cookies-wrapper alert-top">
                    <p>This is a beta version of <a href="/">hehe.rw</a>. We're still working on this new-look site, we apologize for any inconvenience this may cause.
                        <button className="close-popup" onClick={this.closeAlertPopup}><span class="icon-Times"></span></button>
                    </p>
                </div>
            );
        }
        return null;
    }
    
    render () {
        return this.renderAlertContent();
    }
}

export default AlertBetaVersion;
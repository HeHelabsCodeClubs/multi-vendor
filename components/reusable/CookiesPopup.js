import React, { Component } from 'react';

class CookiesPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeCookies: true
        };
        this.closeCookiesPopup = this.closeCookiesPopup.bind(this);
    }

    closeCookiesPopup() {        
        const { closeCookies } = this.state;
        if (closeCookies) {
            this.setState({ 
                closeCookies: false 
            });
        }
    }
    renderCookieContent () {
        const { closeCookies } = this.state;
        if (closeCookies) {
            return (
                <div className="cookies-wrapper">
                    <p>This site use cookies to provide a great user experience. Buy using HeHe, you accept our
                        <a href="/privacy" target="_blank">privacy policy</a>
                        <button className="close-popup" onClick={this.closeCookiesPopup}><span class="icon-Times"></span></button>
                    </p>
                </div>
            );
        }
        return null;
    }
    
    render () {
        return this.renderCookieContent();
    }
}

export default CookiesPopup;
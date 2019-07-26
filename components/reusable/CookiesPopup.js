import React, { Component } from 'react';
import localforage from 'localforage';
import { STORE_USER_ACCEPTANCE_FOR_COOKIE_USER } from '../../config';

class CookiesPopup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            closeCookies: true
        };
        this.closeCookiesPopup = this.closeCookiesPopup.bind(this);
        this.rememberUserPrivacyAcceptanceAction = this.rememberUserPrivacyAcceptanceAction.bind(this);
        this.displayCookiesPopup = this.displayCookiesPopup.bind(this);
    }
    componentDidMount() {
        localforage.getItem(STORE_USER_ACCEPTANCE_FOR_COOKIE_USER).then((action) => {
            if (action === null || Number(action) !== 1) {
                this.displayCookiesPopup();
            }
        });
    }
    closeCookiesPopup() {        
        const { closeCookies } = this.state;
        if (!closeCookies) {
            this.setState({ 
                closeCookies: true 
            }, () => {
                this.rememberUserPrivacyAcceptanceAction();
            });
        }
    }

    displayCookiesPopup() {
        this.setState({
            closeCookies: false
        });
    }

    rememberUserPrivacyAcceptanceAction() {
        localforage.setItem(STORE_USER_ACCEPTANCE_FOR_COOKIE_USER, 1);
    }

    renderCookieContent () {
        const { closeCookies } = this.state;
        if (!closeCookies) {
            return (
                <div className="cookies-wrapper">
                    <p>This site use cookies to provide a great user experience. By using HeHe, you accept our  
                        <a href="/privacy" target="_blank"> privacy policy</a>
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
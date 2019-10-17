import React,{ Component } from 'react';
import { initGA, logPageView } from './util';

export default class GoogleAnalyticsLogger extends Component {
    componentDidMount() {
        if (!window.GA_INITIALIZED) {
            initGA();
            window.GA_INITIALIZED = true;
        };
        logPageView();
    }

    render() {
        return this.props.children;
    }
}
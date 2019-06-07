
import React, { Component } from 'react';
import Notifications from 'react-notify-toast';
import Header from './header/Header';
import Footer from './Footer';
import '../../assets/styles/layouts/header.scss';

class Global extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCart: false
        };
    }
    componentWillReceiveProps(nextProps) {
        const { updateCart } = nextProps;
        if (updateCart) {
            this.setState({
                updateCart: true
            });
        }
    }
    render() {
        return (
            <div className='site-wrapper'>
                <Notifications />
                <Header 
                updateCart={this.state.updateCart}
                />
                {this.props.children}
                <Footer />
            </div>
        );
    }
} 

export default Global;
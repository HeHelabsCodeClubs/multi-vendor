import React, { Component } from 'react';
import SingleCartItem from '../SingleCartItem';

const SidebarUI = ({ isOpen, ...rest }) => {
    const classes = [
        'Sidebar',
        isOpen ? 'is-open' : '',
    ];
    return (
        <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />
    );
};
  
SidebarUI.Overlay = props => <div className="SidebarOverlay" {...props} />;

SidebarUI.Content = ({ width = '40%', isRight = true, ...rest }) => {
    const classes = [
        'SidebarContent',
        isRight ? 'is-right' : '',
    ];
    const style = {
        width,
        height: '100%',
        top: 0,
        right: isRight ? `-${width}` : 'auto',
        left: !isRight ? `-${width}` : 'auto',
    };
    
    return (
        <div
            className={classes.join(' ')}
            style={style}
            {...rest}
        />
    );
};


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen
        };
        this.openSidebar = this.openSidebar.bind(this);
    };
    openSidebar(isOpen = true) {
        this.setState({ isOpen });
    }

    render() {
        const { isOpen } = this.state;
        const { isRight } = this.props;
        return (
            <SidebarUI isOpen={isOpen}>
                <div>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-6 cart-grid'>
                        <button 
                        type='button'
                        onClick={this.openSidebar}
                        className='cart-wrapper'
                        >
                            <span className='icon-Path-63'></span>
                            <span className='header-content'>Cart</span>
                        </button>
                    </div>
                    <SidebarUI.Content isRight={isRight}>
                        <div className="cart-sidebar">
                            <div className="main-title">
                                <div className='sidebar-title'>
                                    <span className='icon-Path-63'></span>
                                    <span className='title'>My cart</span>
                                    <span className='item-nbr'>(7 Items Total)</span>
                                </div>
                                <div className='sidebar-close' onClick={() => this.openSidebar(false)}>
                                    <span className='close-cart'>Close</span><span className="icon-Path-58" />
                                </div>
                            </div>
                            <div className='cart-content'>
                                <div className='cart-content-content'>
                                    <SingleCartItem />
                                    <div className='go-to-checkout'>
                                        <span className='grand-total'>All Total: Rwf 70,000</span>
                                        <span className='proceed-button'><button><a href='/checkout'>Proceed to Checkout</a></button></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SidebarUI.Content>
                </div>
                {isOpen ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
            </SidebarUI>
        )
    }
}

export default Cart;
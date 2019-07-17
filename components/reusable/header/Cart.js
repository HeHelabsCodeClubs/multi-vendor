import React, { Component } from 'react';
import SingleCartStoreItem from '../SingleCartStoreItem';
import { 
    getCartItems,
    countCartItems,
    storeProductsTotalPrice
} from '../../../helpers/cart_functionality_helpers';
import isObjectEmpty from '../../../helpers/is_object_empty';

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
            isOpen: props.isOpen,
            cartItems: {}
        };
        this.openSidebar = this.openSidebar.bind(this);
        this.renderCartContent = this.renderCartContent.bind(this);
        this.updateCartItems = this.updateCartItems.bind(this);
        this.renderCartIcon = this.renderCartIcon.bind(this);
    };

    componentDidMount() {
        this.updateCartItems();
    }

    componentWillReceiveProps(nextProps) {
        const { updateCart } = nextProps;
        if (updateCart) {
            this.updateCartItems();
        }
    }

    updateCartItems() {
        try {
            getCartItems((items) => {
                if (items !== null) {
                    this.setState({
                        cartItems: items
                    });
                }
            });
            
        } catch(err) {
            if (err) {
                console.log(err);
            }
        }
    }

    openSidebar() {
        this.updateCartItems();
        const { isOpen } = this.state;
        if (isOpen) {
            this.setState({ 
                isOpen: false 
            });
        } else {
            this.setState({ 
                isOpen: true
            });
        }
    }

    renderCartContent() {
        const { cartItems } = this.state;
        if (!isObjectEmpty(cartItems)) {
            const itemsLayout = [];
            Object.keys(cartItems).forEach((storeSlug, index) => {
                const item = cartItems[storeSlug];
                item.slug = storeSlug;
                itemsLayout.push(
                    <SingleCartStoreItem 
                    key={index}
                    store={item}
                    updateCartData={this.updateCartItems}
                    />
                );
            });
            const productsTotalPrice = storeProductsTotalPrice(cartItems);
            return (
                <div className='cart-content'>
                    <div className='cart-content-content'>
                        {itemsLayout}
                        <div className='go-to-checkout'>
                            <span className='grand-total'>{`All Total: Rwf ${productsTotalPrice}`}</span>
                            <span className='proceed-button'><button><a href='/checkout/account'>Proceed to Checkout</a></button></span>
                        </div>
                    </div>
                </div>
            );
        }

        return (
            <h5 className="empty-cart-items">
                No item in the cart
            </h5>
        );
    }

    renderCartIcon(cartItemsCounter) {
        if (cartItemsCounter !== 0) {
            return (
                <a 
                className='row cart-wrapper'
                onClick={this.openSidebar}
                >
                    <span className='header-content'>
                        <span className='icon-Path-63'></span>
                        <span className="mobile-menu__title mobile-visible">Cart</span>
                        <span className='cart-items-counter'>
                            {cartItemsCounter}
                        </span>
                    </span>
                    <span>
                        <h5 className="cart-title">My Cart</h5>
                    </span>
                </a>
            );
        }

        return (
            <a 
            className='row cart-wrapper'
            onClick={this.openSidebar}
            >
                <span className='header-content'>
                    <span className='icon-Path-63'></span>
                    <span className="mobile-menu__title mobile-visible">Cart</span>
                </span>
                <span>
                    <h5 className="cart-title">My Cart</h5>
                </span>
            </a>
        );
        
    }

    render() {
        const { isOpen, cartItems } = this.state;
        const { isRight } = this.props;
        const counter = countCartItems(cartItems);
        const cartCounterDisplay = counter !== 0 ? `(${counter} Items Total)` : null;
        return (
            <div className='col-lg-6 col-md-6 col-sm-6 col-6 cart-grid'>
                <SidebarUI isOpen={isOpen}>
                    <div>
                        {this.renderCartIcon(counter)}
                        <SidebarUI.Content isRight={isRight}>
                            <div className="cart-sidebar">
                                <div className="main-title">
                                    <div className='sidebar-title'>
                                        <span className='icon-Path-63'></span>
                                        <span className='title'>My cart</span>
                                        <span className='item-nbr'>{cartCounterDisplay}</span>
                                    </div>
                                    <button 
                                    type='button'
                                    className='sidebar-close' onClick={() => this.openSidebar(false)}>
                                        <span className='close-cart'>Close</span>
                                        <span className="icon-Path-58" />
                                    </button>
                                </div>
                                {this.renderCartContent()}
                            </div>
                        </SidebarUI.Content>
                    </div>
                    {isOpen ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
                </SidebarUI>
            </div>
        );
    }
}

export default Cart;
import React, { Component } from 'react';
import localforage from 'localforage';
import SingleCartStoreItem from '../SingleCartStoreItem';
import { 
    getCartItems,
    countCartItems,
    storeProductsTotalPrice
} from '../../../helpers/cart_functionality_helpers';
import { LOCAL_SHIPMENTS_KEY } from '../../../config';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';
import { 
    retrieveShipmentDataPerStoreSlug, 
    removeShipmentInLocal 
} from '../../../helpers/shipment_method_functionality_helpers';

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

SidebarUI.Content = ({ width = '30%', isRight = true, ...rest }) => {
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
            cartItems: {},
            shipmentMethod: '',
            shipmentHasBeenSelected: false,
            openOnProductAddedToCart: false
        };
        this.openSidebar = this.openSidebar.bind(this);
        this.renderCartContent = this.renderCartContent.bind(this);
        this.updateCartItems = this.updateCartItems.bind(this);
        this.renderCartIcon = this.renderCartIcon.bind(this);
        //this.renderNotificationInCartSidebar = this.renderNotificationInCartSidebar.bind(this);
    };
    targetElement = null;
    
    componentDidMount() {
        this.updateCartItems();
    }

    componentWillReceiveProps(nextProps) {
        const { updateCart, openCart } = nextProps;
        if (updateCart) {
            this.updateCartItems();
        }
        if (openCart) {
            this.setState({
                openOnProductAddedToCart: true
            });
        }
    }

    updateLocalShipment(cartItems) {
        localforage.getItem(LOCAL_SHIPMENTS_KEY).then((items) => {
        if (items !== null) {
            Object.keys(items).forEach((key, index) => {
                if (cartItems[key] === undefined) {
                    retrieveShipmentDataPerStoreSlug(key, (existingMethod) => {
                    const data = {
                        slug: key,
                        method: existingMethod
                    };
                    if (existingMethod !== '') {
                        removeShipmentInLocal(data, () => {
                        });
                    }
                })
                }
            });
        }
        }).catch((err) => {
            if (err) {
                console.log(err);
            }
        });
    }
    updateCartItems() {
        try {
            getCartItems((items) => {
                if (items !== null) {
                    this.setState({
                        cartItems: items
                    });
                }
                this.updateLocalShipment(items);
            });
        } catch(err) {
            if (err) {
                console.log(err);
            }
        }
    }

    openSidebar() {
        const { isOpen, openOnProductAddedToCart } = this.state;
        this.updateCartItems();
        if (isOpen || openOnProductAddedToCart) {
            this.setState({ 
                isOpen: false,
                openOnProductAddedToCart: false 
            });
            //enableBodyScroll(this.targetElement);
        } else {
            this.setState({ 
                isOpen: true
            });
            //disableBodyScroll(this.targetElement);
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
                className='cart-wrapper'
                onClick={this.openSidebar}
                >
                    <span className='header-content mobile-menu-link'>
                        <span className="cart-icon-counter-wrapper">
                            <span className='icon-Path-63 mobile-menu-icon'></span>
                            <span className='cart-items-counter'>{cartItemsCounter}</span>
                        </span>
                        <span className="mobile-menu__title">Cart</span>
                        
                    </span>
                </a>
            );
        }

        return (
            <a 
            className='cart-wrapper'
            onClick={this.openSidebar}
            >
                <span className='header-content mobile-menu-link'>
                    <span className='icon-Path-63 mobile-menu-icon'></span>
                    <span className="mobile-menu__title">Cart</span>
                </span>
            </a>
        );
    }

    renderNotificationInCartSidebar() {
        const { openOnProductAddedToCart } = this.state;
        if (openOnProductAddedToCart) {
            return (
                <div className='cart-notify'>
                    <span className='notify-text'><span className='icon-check-circle'></span>A new item has been added to your shopping cart. </span>
                    <span className='notify-btn'><button onClick={() => this.openSidebar()}>Add more products</button></span>
                </div>
            )
        } 
        return null;
    }

    render() {
        const { isOpen, cartItems, openOnProductAddedToCart } = this.state;
        const { isRight } = this.props;
        const counter = countCartItems(cartItems);
        const cartCounterDisplay = counter !== 0 ? `(${counter} Items Total)` : null;
        return (
            <div className='cart-grid'>
                <SidebarUI isOpen={isOpen || openOnProductAddedToCart}>
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
                                {this.renderNotificationInCartSidebar()}
                                {this.renderCartContent()}
                            </div>
                        </SidebarUI.Content>
                    </div>
                    {isOpen || openOnProductAddedToCart ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
                </SidebarUI>
            </div>
        );
    }
}

export default Cart;
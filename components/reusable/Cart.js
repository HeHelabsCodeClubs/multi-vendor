import Select2 from 'react-select2-wrapper';

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


class Cart extends React.Component {
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
                    <div className='col-lg-6 col-md-6 col-sm-6 col-6 cart-grid' onClick={this.openSidebar}>
                        <span className='icon-Path-63'></span>
                        <span className='header-content'>Cart</span>
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
                                <div className='cart-store-content'>
                                    <div className='store-logo'>
                                        <img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
                                        <span className='store-name'>Mart (3 Items from Mart store)</span>
                                    </div>
                                    <div className='row reset-row cart-item'>
                                        <div className='col-lg-2 col-md-2 col-sm-2 col-2 col-reset product-cart-image'>
                                            <img className='cart-product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288623/multi-vendor/prod_1_2x.png' />
                                        </div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset name-incremenet'>
                                            <div className='product-name'>Cabagge</div>
                                            <div className='qty-measurement'>Pce</div>
                                            <div className='qty-increment'>
                                                <span className='decrement'>-</span>
                                                <span className='number'>12</span>
                                                <span className='increment'>+</span>
                                            </div>
                                        </div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset prices-discounts'>
                                            <div className='cart-bk'>
                                                <div className='discount'>10% OFF</div>
                                                <div />
                                            </div>
                                            <div className='cart-bk'>
                                                <div className='edit'><span className='icon-Path-68'></span>Edit</div>
                                                <div className='initial-price'>Rwf 1000</div>
                                            </div>
                                            <div className='cart-bk'>
                                                <div className='remove'><span className='icon-Path-60'></span>Remove</div>
                                                <div className='price'>Rwf 900</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='row reset-row cart-item'>
                                        <div className='col-lg-2 col-md-2 col-sm-2 col-2 col-reset product-cart-image'>
                                            <img className='cart-product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288623/multi-vendor/prod_1_2x.png' />
                                        </div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset name-incremenet'>
                                            <div className='product-name'>Cabagge</div>
                                            <div className='qty-measurement'>Pce</div>
                                            <div className='qty-increment'>
                                                <span className='decrement'>-</span>
                                                <span className='number'>12</span>
                                                <span className='increment'>+</span>
                                            </div>
                                        </div>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset prices-discounts'>
                                            <div className='cart-bk'>
                                                <div className='discount'>10% OFF</div>
                                                <div />
                                            </div>
                                            <div className='cart-bk'>
                                                <div className='edit'><span className='icon-Path-68'></span>Edit</div>
                                                <div className='initial-price'>Rwf 1000</div>
                                            </div>
                                            <div className='cart-bk'>
                                                <div className='remove'><span className='icon-Path-60'></span>Remove</div>
                                                <div className='price'>Rwf 900</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='total-price'>
                                    <div className='subtotal'>Sutotal: Rwf 21,345</div>
                                    <div className='shipping-grid'>
                                        <span className='shipping-title'>Shipping method</span>
                                        <span className='shipping-dropdown'>
                                            <Select2
                                                defaultValue={2}
                                                data={[
                                                    { text: 'WHS', id: 1 },
                                                    { text: 'another WHS', id: 2 },
                                                    { text: 'other WHS', id: 3}
                                                ]}
                                            />
                                        </span>
                                        <span className='shipping'>Total: Rwf 21,345</span>
                                    </div>
                                    <div className='total-grid'>
                                        <span className='total'>Total: Rwf 45,475</span>
                                    </div>
                                </div>
                                <div className='go-to-checkout'>
                                    <span className='grand-total'>All Total: Rwf 70,000</span>
                                    <span className='proceed-button'><button>Proceed to Checkout</button></span>
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
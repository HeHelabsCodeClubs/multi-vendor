

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
                                    <span>My cart</span>
                                </div>
                                <div className='sidebar-close'>
                                    <span>Close</span><span className="icon-Path-58" onClick={() => this.openSidebar(false)} />
                                </div>
                            </div>
                            <div className='cart-content'>
                                <div className='store-logo'>
                                    <img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
                                    <span className='store-name'>Mart</span>
                                </div>
                                <div className='row reset-row'>
                                    <div className='col-lg-2 col-md-2 col-sm-2 col-2 col-reset'>
                                        <img className='cart-product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288623/multi-vendor/prod_1_2x.png' />
                                    </div>
                                    <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset'>
                                        <div className='product-name'>Cabagge</div>
                                        <div className='qty-measurement'>Pce</div>
                                        <div className='qty-increment'>
                                            <span className='decrement'>-</span>
                                            <span className='number'>12</span>
                                            <span className='increment'>+</span>
                                        </div>
                                    </div>
                                    <div className='col-lg-5 col-md-5 col-sm-5 col-5 col-reset'>
                                        <div><span className='discount'>10% OFF</span></div>
                                        <div>
                                            <div><span className='icon-Path-68'></span>Edit</div>
                                            <div>Rwf 1000</div>
                                        </div>
                                        <div>
                                            <div><span className='icon-Path-60'></span>Remove</div>
                                            <div>Rwf 900</div>
                                        </div>
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
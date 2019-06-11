import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';

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

SidebarUI.Content = ({ width = '40%', isRight = false, ...rest }) => {
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

class HeaderCategoryMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomerMenu: false,
            showSubCategory: false,
            categories: [],
            isOpen: props.isOpen
        };
        this.renderCategory = this.renderCategory.bind(this);
        this.openSidebar = this.openSidebar.bind(this);
        this.renderMoboCategory = this.renderMoboCategory.bind(this);
    };

    async componentDidMount() {
        const res = await fetch(`${API_URL}/categories`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        this.setState({
           categories: data.data
        });
    }

    customerHandleHover = () => {
        const { showCustomerMenu } = this.state;
        if (showCustomerMenu === false) {
            this.setState({ showCustomerMenu: true });
        } else {
            this.setState({ showCustomerMenu: false });
        }
    };
    customerHandleLeave = () => {
        this.setState({ showCustomerMenu: false });
    };

    categoryHandleHover = () => {
        this.setState({ showSubCategory: true })
    };
    categoryHandleLeave = () => {
        this.setState({ showSubCategory: false })
    };

    openSidebar() {
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

    renderCategory(categories) {
        if (categories) {
            const categoryLayout = categories.map((category) => {
                return (
                    <span className="nav__submenu-item " key={category.id} >
                        <a href="/categories" className='sub-menu__item-a'>{category.name}</a>
                        <div className='sub-category'>
                            <div className='row'>
                                <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                    <h5>Mobile phones</h5>
                                    <p>Mobile Phones</p>
                                    <p>Front Camera</p>
                                    <p>Fingerprint Recognition</p>
                                    <p>Touch Screen</p>
                                    <p>Dual SIM Card</p>
                                    <p>5.7-inch Display</p>
                                    <p>Mobile Phone Parts</p>
                                    <p>Mobile Phone LCDs</p>
                                    <p>Mobile Phone Batteries</p>
                                    <p>Mobile Phone Housings</p>
                                    <p>Mobile Phone Touch Panel</p>
                                    <p>Flex Cables</p>

                                    <h5>Mobile phones</h5>
                                    <p>Mobile Phones</p>
                                    <p>Front Camera</p>
                                    <p>Fingerprint Recognition</p>
                                    <p>Touch Screen</p>
                                    <p>Dual SIM Card</p>
                                    <p>5.7-inch Display</p>
                                    <p>Mobile Phone Parts</p>
                                    <p>Mobile Phone LCDs</p>
                                    <p>Mobile Phone Batteries</p>
                                    <p>Mobile Phone Housings</p>
                                    <p>Mobile Phone Touch Panel</p>
                                    <p>Flex Cables</p>
                                </div>
                                <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                    <h5>Mobile phones</h5>
                                    <p>Mobile Phones</p>
                                    <p>Front Camera</p>
                                    <p>Fingerprint Recognition</p>
                                    <p>Touch Screen</p>
                                    <p>Dual SIM Card</p>
                                    <p>5.7-inch Display</p>
                                    <p>Mobile Phone Parts</p>
                                    <p>Mobile Phone LCDs</p>
                                    <p>Mobile Phone Batteries</p>
                                    <p>Mobile Phone Housings</p>
                                    <p>Mobile Phone Touch Panel</p>
                                    <p>Flex Cables</p>

                                    <h5>Mobile phones</h5>
                                    <p>Mobile Phones</p>
                                    <p>Front Camera</p>
                                    <p>Fingerprint Recognition</p>
                                    <p>Touch Screen</p>
                                    <p>Dual SIM Card</p>
                                    <p>5.7-inch Display</p>
                                    <p>Mobile Phone Parts</p>
                                    <p>Mobile Phone LCDs</p>
                                    <p>Mobile Phone Batteries</p>
                                    <p>Mobile Phone Housings</p>
                                    <p>Mobile Phone Touch Panel</p>
                                    <p>Flex Cables</p>
                                </div>
                                <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                    <h5>Mobile phones</h5>
                                    <p>Mobile Phones</p>
                                    <p>Front Camera</p>
                                    <p>Fingerprint Recognition</p>
                                    <p>Touch Screen</p>
                                    <p>Dual SIM Card</p>
                                    <p>5.7-inch Display</p>
                                    <p>Mobile Phone Parts</p>
                                    <p>Mobile Phone LCDs</p>
                                    <p>Mobile Phone Batteries</p>
                                    <p>Mobile Phone Housings</p>
                                    <p>Mobile Phone Touch Panel</p>
                                    <p>Flex Cables</p>

                                    <h5>Mobile phones</h5>
                                    <p>Mobile Phones</p>
                                    <p>Front Camera</p>
                                    <p>Fingerprint Recognition</p>
                                    <p>Touch Screen</p>
                                    <p>Dual SIM Card</p>
                                    <p>5.7-inch Display</p>
                                    <p>Mobile Phone Parts</p>
                                    <p>Mobile Phone LCDs</p>
                                    <p>Mobile Phone Batteries</p>
                                    <p>Mobile Phone Housings</p>
                                    <p>Mobile Phone Touch Panel</p>
                                    <p>Flex Cables</p>
                                </div>
                                <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1560250753/multi-vendor/3043262_ultraradiant-met-hp-ast_ecom1830-4.png' />
                                    </div>
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1560250767/multi-vendor/Products_Banner2-928x461.png' />
                                    </div>
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1560250753/multi-vendor/3043262_ultraradiant-met-hp-ast_ecom1830-4.png' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </span>
                )
            });
            return categoryLayout;
        }
    }

    renderMoboCategory(categories) {
        if (categories) {
            const categoryLayout = categories.map((category) => {
                return (
                    <span className="nav__submenu-item " key={category.id} >
                        <a href="/categories" className='sub-menu__item-a'>{category.name}</a>
                    </span>
                )
            });
            return categoryLayout;
        }
    }

    render() {
        const { categories, isOpen } = this.state;
        const { isRight } = this.props;
        return (
            <span className="main-menu">
                <nav className="nav nav-container">
                    <ul className="nav__menu">
                        <li className="nav__menu-item">
                            <div
                                onClick={this.customerHandleHover} 
                                className='main-menu__item-a'
                            >
                                <span className='icon-Path-61'></span>
                                <span className='icon-Path-73'></span>
                                <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                            </div>
                            {this.state.showCustomerMenu && 
                                <div className='menu-wrapper'>
                                    <ul className="nav__submenu">
                                        <li>
                                            {this.renderCategory(categories)}
                                        </li>
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="nav__menu-item-mobo">
                            <SidebarUI isOpen={isOpen}>
                                <div>
                                    <div
                                        className='main-menu__item-a'
                                        onClick={this.openSidebar}
                                    >
                                        <span className='icon-Path-61'></span>
                                        <span className='icon-Path-73'></span>
                                        <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                                    </div>
                                    <SidebarUI.Content isRight={isRight}>
                                        <div className="cart-sidebar">
                                            <div className="main-title">
                                                <div className='sidebar-title'>
                                                    <span className='icon-Path-71' onClick={() => this.openSidebar(false)}></span>
                                                    <span className='title'>Categories</span>
                                                </div>
                                            </div>
                                            <div>
                                                <ul className="nav__submenu">
                                                    <li>
                                                        {this.renderMoboCategory(categories)}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </SidebarUI.Content>
                                </div>
                                {isOpen ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
                            </SidebarUI>
                        </li>
                    </ul>
                </nav>
            </span>   
            
            // <header>
            //     <div className="cd-dropdown-wrapper">
            //         <a className="cd-dropdown-trigger" href="#0">Dropdown</a>
            //         <nav className="cd-dropdown">
            //             <h2>Title</h2>
            //             <a href="#0" className="cd-close">Close</a>
            //             <ul className="cd-dropdown-content">
            //                 <li>
            //                     <form className="cd-search">
            //                         <input type="search" placeholder="Search..." />
            //                     </form>
            //                 </li>

            //                 <li className="has-children">
            //                     <a href="#0">Clothing</a>
            //                     <ul className="cd-secondary-dropdown is-hidden">
            //                     <li className="go-back"><a href="#0">Menu</a></li>
            //                     <li className="see-all"><a href="#0">All Clothing</a></li>
            //                     <li className="has-children">
            //                         <a href="#0">Accessories</a>

            //                         <ul className="is-hidden">
            //                             <li className="go-back"><a href="#0">Clothing</a></li>
            //                             <li className="see-all"><a href="#0">All Accessories</a></li>
            //                             <li className="has-children">
            //                             <a href="#0">Beanies</a>
            //                             <ul className="is-hidden">
            //                                 <li className="go-back"><a href="#0">Accessories</a></li>
            //                                 <li className="see-all"><a href="#0">All Benies</a></li>
            //                                 <li><a href="#0">Caps &amp; Hats</a></li>
                                            
            //                             </ul>
            //                             </li>
            //                             <li className="has-children">
            //                             <a href="#0">Caps &amp; Hats</a>
            //                             <ul className="is-hidden">
            //                                 <li className="go-back"><a href="#0">Accessories</a></li>
            //                                 <li className="see-all"><a href="#0">All Caps &amp; Hats</a></li>
            //                                 <li><a href="#0">Beanies</a></li>
                                            
            //                             </ul>
            //                             </li>
            //                             <li><a href="#0">Glasses</a></li>
                                        
            //                         </ul>
            //                     </li>

            //                     <li className="has-children">
                                    
            //                     </li>

            //                     <li className="has-children">
                                    
            //                     </li>

            //                     <li className="has-children">
                             
            //                     </li>
            //                 </ul>
            //                 </li>

            //                 <li className="has-children">
            //                 </li>

            //                 <li className="has-children">
            //                 </li>

            //                 <li className="cd-divider">Divider</li>

            //                 <li><a href="#0">Page 1</a></li>
            //             </ul>
            //         </nav>
            //     </div>
            // </header>
        )
    }
}

export default HeaderCategoryMenu;
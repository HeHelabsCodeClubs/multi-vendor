import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';


// const subMenuItems = [
//     {
//         name: 'Mobile Phones',
//         subSubMenuItems: [
//             {name: 'Front camera'},
//             {name: 'Fingerprint Recognition'},
//             {name: 'Touch screen'},
//             {name: '5.7 -inch Display'},
//             {name: 'Flex cables'},
//             {name: 'Mobile phone housings'},
//             {name: 'Mobile phone touch panel'}
//         ]
//     },
//     {
//         name: 'Mobile Phones',
//         subSubMenuItems: [
//             {name: 'Front camera'},
//             {name: 'Fingerprint Recognition'},
//             {name: 'Touch screen'},
//             {name: '5.7 -inch Display'},
//             {name: 'Flex cables'},
//             {name: 'Mobile phone housings'},
//             {name: 'Mobile phone touch panel'}
//         ]
//     },
//     {
//         name: 'Mobile Phones',
//         subSubMenuItems: [
//             {name: 'Front camera'},
//             {name: 'Fingerprint Recognition'},
//             {name: 'Touch screen'},
//             {name: '5.7 -inch Display'},
//             {name: 'Flex cables'},
//             {name: 'Mobile phone housings'},
//             {name: 'Mobile phone touch panel'}
//         ]
//     },
//     {
//         name: 'Mobile Phones',
//         subSubMenuItems: [
//             {name: 'Front camera'},
//             {name: 'Fingerprint Recognition'},
//             {name: 'Touch screen'},
//             {name: '5.7 -inch Display'},
//             {name: 'Flex cables'},
//             {name: 'Mobile phone housings'},
//             {name: 'Mobile phone touch panel'}
//         ]
//     },
//     {
//         name: 'Mobile Phones',
//         subSubMenuItems: [
//             {name: 'Front camera'},
//             {name: 'Fingerprint Recognition'},
//             {name: 'Touch screen'},
//             {name: '5.7 -inch Display'},
//             {name: 'Flex cables'},
//             {name: 'Mobile phone housings'},
//             {name: 'Mobile phone touch panel'}
//         ]
//     },
// ]

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
                        <a 
                        href={`/categories/${category.slug}`} 
                        className='sub-menu__item-a'>
                        <span className={`${category.icon_class_name} menu-item-icon`} />
                        {category.name}
                        </a>
                        <div className='sub-category'>
                            <div className='row'>
                                <div className='col-lg-9 col-md-9 col-sm-9 col-12'>
                                    <div className='sub-wrapper'>
                                        <h5>Mobile phones</h5>
                                        <div>
                                            <a>Mobile Phones</a>
                                            <a>Front Camera</a>
                                            <a>Fingerprint Recognition</a>
                                            <a>Touch Screen</a>
                                            <a>Dual SIM Card</a>
                                            <a>5.7-inch Display</a>
                                            <a>Mobile Phone Parts</a>
                                            <a>Mobile Phone LCDs</a>
                                            <a>Mobile Phone Batteries</a>
                                            <a>Mobile Phone Housings</a>
                                            <a>Mobile Phone Touch Panel</a>
                                            <a>Flex Cables</a>
                                        </div>
                                    </div>
                                    <div className='sub-wrapper'>
                                        <h5>Mobile phones</h5>
                                        <div>
                                            <a>Mobile Phones</a>
                                            <a>Front Camera</a>
                                            <a>Fingerprint Recognition</a>
                                            <a>Touch Screen</a>
                                            <a>Dual SIM Card</a>
                                            <a>5.7-inch Display</a>
                                            <a>Mobile Phone Parts</a>
                                            <a>Mobile Phone LCDs</a>
                                            <a>Mobile Phone Batteries</a>
                                            <a>Mobile Phone Housings</a>
                                            <a>Mobile Phone Touch Panel</a>
                                            <a>Flex Cables</a>
                                        </div>
                                    </div>
                                    <div className='sub-wrapper'>
                                        <h5>Mobile phones</h5>
                                        <div>
                                            <a>Mobile Phones</a>
                                            <a>Front Camera</a>
                                            <a>Fingerprint Recognition</a>
                                            <a>Touch Screen</a>
                                            <a>Dual SIM Card</a>
                                            <a>5.7-inch Display</a>
                                            <a>Mobile Phone Parts</a>
                                            <a>Mobile Phone LCDs</a>
                                            <a>Mobile Phone Batteries</a>
                                            <a>Mobile Phone Housings</a>
                                            <a>Mobile Phone Touch Panel</a>
                                            <a>Flex Cables</a>
                                        </div>
                                    </div>
                                    <div className='sub-wrapper'>
                                        <h5>Mobile phones</h5>
                                        <div>
                                            <a>Mobile Phones</a>
                                            <a>Front Camera</a>
                                            <a>Fingerprint Recognition</a>
                                            <a>Touch Screen</a>
                                            <a>Dual SIM Card</a>
                                            <a>5.7-inch Display</a>
                                            <a>Mobile Phone Parts</a>
                                            <a>Mobile Phone LCDs</a>
                                            <a>Mobile Phone Batteries</a>
                                            <a>Mobile Phone Housings</a>
                                            <a>Mobile Phone Touch Panel</a>
                                            <a>Flex Cables</a>
                                        </div>
                                    </div>
                                    <div className='sub-wrapper'>
                                        <h5>Mobile phones</h5>
                                        <div>
                                            <a>Mobile Phones</a>
                                            <a>Front Camera</a>
                                            <a>Fingerprint Recognition</a>
                                            <a>Touch Screen</a>
                                            <a>Dual SIM Card</a>
                                            <a>5.7-inch Display</a>
                                            <a>Mobile Phone Parts</a>
                                            <a>Mobile Phone LCDs</a>
                                            <a>Mobile Phone Batteries</a>
                                            <a>Mobile Phone Housings</a>
                                            <a>Mobile Phone Touch Panel</a>
                                            <a>Flex Cables</a>
                                        </div>
                                    </div>
                                    <div className='sub-wrapper'>
                                        <h5>Mobile phones</h5>
                                        <div>
                                            <a>Mobile Phones</a>
                                            <a>Front Camera</a>
                                            <a>Fingerprint Recognition</a>
                                            <a>Touch Screen</a>
                                            <a>Dual SIM Card</a>
                                            <a>5.7-inch Display</a>
                                            <a>Mobile Phone Parts</a>
                                            <a>Mobile Phone LCDs</a>
                                            <a>Mobile Phone Batteries</a>
                                            <a>Mobile Phone Housings</a>
                                            <a>Mobile Phone Touch Panel</a>
                                            <a>Flex Cables</a>
                                        </div>
                                    </div>
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
                        <a href="/categories" className='sub-menu__item-a'>
                            <span className={`${category.icon_class_name} menu-item-icon`} />
                            {category.name}
                        </a>
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
                            <a
                                onClick={this.customerHandleHover} 
                                className='main-menu__item-a'
                            >
                                <span className='icon-Path-61'></span>
                                <span className='icon-Path-73'></span>
                                <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                            </a>
                            {this.state.showCustomerMenu && 
                                <div className='menu-wrapper'>
                                    <ul className="nav__submenu">
                                        <li>
                                            {this.renderCategory(categories)}
                                            <div className='menu-btn'>
                                                <button>Shop by Seller</button>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                </div>
                            }
                        </li>
                        <li className="nav__menu-item-mobo">
                            <SidebarUI isOpen={isOpen}>
                                <div>
                                    <a
                                        className='main-menu__item-a'
                                        onClick={this.openSidebar}
                                    >
                                        <span className='icon-Path-61'></span>
                                        <span className='icon-Path-73'></span>
                                        <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                                    </a>
                                    <SidebarUI.Content isRight={isRight}>
                                        <div className="cart-sidebar">
                                            <div className='mobo-menu-title'>
                                                <div className='sidebar-title'>
                                                    <a className='icon-Path-71' onClick={() => this.openSidebar(false)}></a>
                                                    <h4 className='title'>Categories</h4>
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
        )
    }
}

export default HeaderCategoryMenu;
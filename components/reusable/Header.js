import Link from 'next/link'; 
import Select2 from 'react-select2-wrapper';
import Cart from './Cart';
import fetch from 'isomorphic-unfetch';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomerMenu: false,
            customers: []
        };
    };

    async componentDidMount() {
        const res = await fetch('https://heherw.com/api/clients/umuti/services/business_sign_in/users')
        const data = await res.json()

        this.setState({
            customers: data.data
        })
        //console.log(`Show data fetched. Count: ${JSON.stringify(data.data)}`)
    }

    customerHandleHover = () => {
        this.setState({ showCustomerMenu: true });
    };
    customerHandleLeave = () => {
        this.setState({ showCustomerMenu: false });
    };

    render() {
        return (
            <div>
                <div className='top-panel'>
                    <div className='row maximum-width'>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                            <div className='top-panel-left'>
                                <span className='top-content'>+(250) 788 317 916</span>
                                <span className='top-content'>order.hehe.rw</span>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                            <div className='top-panel-right'>
                                <span className='top-content'>Track your order</span>
                                <span className='top-content'>about</span>
                                <span className='top-content'>contact</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='header'>
                    <div className='row maximum-width'>
                        <div className='col-lg-4 col-md-4 col-sm-12 col-12 header-left'>
                            <span className='site-logo'>
                                <img src='https://res.cloudinary.com/hehe/image/upload/v1556120378/multi-vendor/HeHe_Logo_Original_landscape.svg' />
                            </span>
                            <span className='location-dropdown'>
                                <Select2
                                    defaultValue={2}
                                    data={[
                                        { text: 'Kigali, Kacyiru', id: 1 },
                                        { text: 'Kigali, Kimironko', id: 2 },
                                        { text: 'Kigali, Kanombe', id: 3},
                                        { text: 'Kigali, Town', id: 4 }
                                    ]}
                                />
                            </span>
                            <span className="main-menu">
                                <nav className="nav nav-container">
                                    <ul className="nav__menu">
                                        <li className="nav__menu-item" onMouseLeave={this.customerHandleLeave}>
                                            <div 
                                            onMouseEnter={this.customerHandleHover} 
                                            className={this.props.view === 'customers' || this.props.view === 'customercreate' ? 'main-menu__item-a active' : 'main-menu__item-a'
                                            }>
                                            <span className='icon-Path-61'></span>
                                            <span className='icon-Path-73'></span>
                                            <span className={this.state.showCustomerMenu ? 'icon-icon_up-arrow-small' : 'icon-icon_down-arrow-small'}></span>
                                            </div>
                                            {this.state.showCustomerMenu && 
                                                <ul className="nav__submenu">
                                                    {this.state.customers.map(customer => (
                                                        <li className="nav__submenu-item " key={customer.id}>
                                                            <a href="/categories" className='sub-menu__item-a'>{customer.customer}</a>
                                                        </li>
                                                    ))}
                                                    {/* <li className="nav__submenu-item ">
                                                        <Link href="/categories" className='sub-menu__item-a'><a>Groceries</a></Link>
                                                    </li>
                                                    <li className="nav__submenu-item ">
                                                        <Link href="/categories" className='sub-menu__item-a'><a>Electronics</a></Link>
                                                    </li>
                                                    <li className="nav__submenu-item ">
                                                        <Link href="/categories" className='sub-menu__item-a'><a>Fashion</a></Link>
                                                    </li>
                                                    <li className="nav__submenu-item ">
                                                        <Link href="/categories" className='sub-menu__item-a'><a>Babies</a></Link>
                                                    </li> */}
                                                </ul>
                                            }
                                        </li>
                                    </ul>
                                </nav>
                            </span> 
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-12 col-12'>
                            <span className='main-search'>
                                <input type="text" placeholder="Search store or product" />
                                <span className='categories-dropdown'>
                                    <Select2
                                        defaultValue={2}
                                        data={[
                                            { text: 'Shoes', id: 1 },
                                            { text: 'Groceries', id: 2 },
                                            { text: 'Clothes', id: 3},
                                            { text: 'Electronics', id: 4 }
                                        ]}
                                    />
                                </span>
                                <button type="submit"><span className="icon-Path-64"></span></button>
                            </span>
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-12 col-12'>
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-6 account-grid'>
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-3 col-reset'>
                                            <span className='icon-Path-62'></span>
                                        </div>
                                        <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset'>
                                            <div className='header-content'>My account</div>
                                            <div className='header-content'>Sign in / Register</div>
                                        </div>
                                    </div>
                                </div>
                                <Cart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
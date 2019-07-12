import Link from 'next/link';
import Select2 from 'react-select2-wrapper';
import Cart from './Cart';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import { getUserAuthenticatedInfo, logoutUser } from '../../../helpers/auth';
import isObjectEmpty from '../../../helpers/is_object_empty';
import SearchDropdown from './SearchDropdown';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCart: false,
            authUser: {}
        };
        this.cartShouldUpdate = this.cartShouldUpdate.bind(this);
        this.renderUserProfile = this.renderUserProfile.bind(this);
        this.updateAuthUser = this.updateAuthUser.bind(this);
        this.logOut = this.logOut.bind(this);
    }
    componentDidMount() {
        getUserAuthenticatedInfo((user) => {
            this.updateAuthUser(user);
        });
    }
    componentWillReceiveProps(nextProps) {
        const { updateCart } = nextProps;
        if (updateCart) {
            this.cartShouldUpdate();
        }
    }

    cartShouldUpdate() {
        this.setState({
            updateCart: true
        });
    }

    updateAuthUser(user) {
        this.setState({
            authUser: user
        });
    }

    logOut(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        logoutUser();
    }

    // test deploy

    renderUserProfile() {
        const { authUser } = this.state;
        if (!authUser) {
            // logout client
            logoutUser()
        }
        if (!isObjectEmpty(authUser)) {
            const {
                last_name,
                first_name
            } = authUser;
            const userName = `${last_name} ${first_name[0]}`;
            return (
                <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset account-links'>
                    <div className='header-content'>{userName}</div>
                    <div className='header-content'>
                        <a 
                        href='/logout'
                        onClick={this.logOut}
                        >
                            Logout
                        </a>
                    </div>                 
                </div>
            );
        }
        return (
            <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset account-links'>
                <div className='header-content'>My account</div>
                <div className='header-content'><a href='/signin'>Sign in</a> / <a href='/register'>Register</a></div>                 
            </div>
        );
    }

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
                                <a href="https://tracking.wherehouseshipping.com/" target="_blank"><span className='top-content'>Track your order</span></a>
                                <a href="https://hehe.rw/" target="_blank"><span className='top-content'>about</span></a>
                                <a href="https://hehe.rw/#contactUs" target="_blank"><span className='top-content'>contact</span></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='header'>
                    <div className='row maximum-width'>
                        <div className='col-lg-4 col-md-4 col-sm-6 col-12 header-left'>
                            <span className='site-logo'>
                                <a href='/'>
                                    <img src='https://res.cloudinary.com/hehe/image/upload/v1556120378/multi-vendor/HeHe_Logo_Original_landscape.svg' />
                                </a>
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
                            <HeaderCategoryMenu />
                        </div>
                        <div className='col-lg-5 col-md-5 col-sm-2 col-3 search-container'>
                            <span className='main-search'>

                                <SearchDropdown />
                                {/* <input type="text" placeholder="Search store or product" /> */}
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
                        <div className='col-lg-3 col-md-3 col-sm-4 col-3 account-container'>
                            <div className='row row-container'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-2 account-grid'>
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-12 col-reset'>
                                            <span className='icon-Path-62'></span>
                                        </div>
                                        {/* user profile goes here */}
                                        {this.renderUserProfile()}
                                    </div>
                                </div>
                                <Cart 
                                updateCart={this.state.updateCart}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
import Router from 'next/router';
import Select2 from 'react-select2-wrapper';
import cookie from 'js-cookie';
import Cart from './Cart';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import isObjectEmpty from '../../../helpers/is_object_empty';
import SearchDropdown from './SearchDropdown';
import classnames from "classnames";
import Head from 'next/head';
import { getUserAuthenticatedInfo, logoutUser } from '../../../helpers/auth';
import {
    APP_BETA_NOTIFICATION
} from '../../../config';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCart: false,
            authUser: {},
            prevScrollpos: 0,
            visible: true,
            searchedValue: '',
            alertVisibility: true
        };
        this.cartShouldUpdate = this.cartShouldUpdate.bind(this);
        this.renderUserProfile = this.renderUserProfile.bind(this);
        this.updateAuthUser = this.updateAuthUser.bind(this);
        this.logOut = this.logOut.bind(this);
        this.updateSearchValue = this.updateSearchValue.bind(this);
        this.handleSearchValueSubmission = this.handleSearchValueSubmission.bind(this);
        this.closeAlertPopup = this.closeAlertPopup.bind(this);
        this.renderAlertContent = this.renderAlertContent.bind(this);
        this.storeBetaPopUpUserClosureAction = this.storeBetaPopUpUserClosureAction.bind(this);
    }
    componentDidMount() {
        // this.setState({
        //     prevScrollpos: window.pageYOffset,
        // })
        getUserAuthenticatedInfo((user) => {
            this.updateAuthUser(user);
        });
        // window.addEventListener("scroll", this.handleScroll);
        if(cookie.get(APP_BETA_NOTIFICATION) === '1') {
            this.setState({
                alertVisibility: false
            });
        }
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

    updateSearchValue(newValue) {
        this.setState({
            searchedValue: newValue
        });
    }

    handleSearchValueSubmission(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        const { searchedValue } = this.state;
        if (searchedValue.length !== '') {
            let validValue = searchedValue.toLowerCase().split(' ').join('_');
            validValue = validValue.replace(/[^a-z0-9]+|\s+/gmi, '_');
            Router.push(`/search-results/${validValue}`);
            return;
        }
    }

    // Hide menu on scroll      
    componentWillUnmount() {
        //window.removeEventListener("scroll", this.handleScroll);
    }
    
    handleScroll = () => {
        const { prevScrollpos } = this.state;
      
        const currentScrollPos = window.pageYOffset;
        const visible = prevScrollpos > currentScrollPos;
      
        this.setState({
          prevScrollpos: currentScrollPos,
          visible
        });
    };

    // Alert Beta version warning
    closeAlertPopup() {
        this.setState({
            alertVisibility: false
        }, () => {
            /**
             * Store the user action in session after pop up closure
             * to avoid seeing the popup on every page load in one single
             * session
             */
            this.storeBetaPopUpUserClosureAction();
        });
    }

    storeBetaPopUpUserClosureAction() {
        cookie.set(APP_BETA_NOTIFICATION, 1);
    }

    renderAlertContent() {
        const { alertVisibility } = this.state;
        if (alertVisibility && cookie.get(APP_BETA_NOTIFICATION) !== '1') {
            return (
                <div className="cookies-wrapper alert-top">
                    <p>This is a beta version of <a href="/">hehe.rw</a>. We're still working on this new-look site, we apologize for any inconvenience this may cause.
                        <button className="close-popup" onClick={this.closeAlertPopup}><span class="icon-Times"></span></button>
                    </p>
                </div>
            );
        }
        return null;
    }

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
            const userName = `Hi ${first_name}`;
            return (
                <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset account-links'>
                    <div className='header-content profile-name'><span className='icon-Path-62'></span> {userName}</div>
                    <div className="profile-dropdown-wrapper">
                        <div className='profile-dropdown'>
                            <ul>
                                {/* <li><a href=''>My Profile</a></li> */}
                                <li><a href='/profile/orders'>My Orders</a></li>
                                {/* <li><a href=''>Wishlist</a></li>
                                <li><a href=''>My Favorite Stores</a></li>
                                <li><a href=''>My Coupons</a></li> */}
                            </ul>
                            <div className='header-content logout'>
                                <a 
                                href='/logout'
                                onClick={this.logOut}
                                >
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>               
                </div>
            );
        }
        return (
            <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset account-links'>
                <a href="/signin" className="auth-redirection-link">
                    <img src="https://res.cloudinary.com/hehe/image/upload/v1571155428/logistics-platform/images/Group_1391.svg" />
                    <span className="link-txt">
                        <span>Sign In</span>
                        <span>With HeHe</span>
                    </span>
                </a>
                {/* <div className='header-content'>My account</div>
                <div className='header-content'><a href='/signin'>Sign in</a> / <a href='/register'>Register</a></div> */}
            </div>
        );
    }


    render() {
        const { alertVisibility } = this.state;
        let wrapperClassName = (cookie.get(APP_BETA_NOTIFICATION) === '1' && !alertVisibility) ? "header-panel" : "header-panel top-alert";
        return (
            <div className="header-panel">
                <Head>
                    <link rel="shortcut icon" href="https://res.cloudinary.com/hehe/image/upload/v1563286307/multi-vendor/HeHe_Favicon.png" />
                    <title>HeHe Marketplace</title>
                </Head>

                <div className={classnames("nav__bar", {
                    "navbar__hidden": !this.state.visible
                })}
                >
                    
                    {/* <div>
                        {this.renderAlertContent()}
                    </div> */}
                    <div className='top-panel'>
                        <div className='row maximum-width'>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                                <div className='top-panel-left'>
                                    <span className='top-content'>+(250) 786 456 686</span>
                                    <span className='top-content'>order@hehe.rw</span>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                                <div className='top-panel-right'>
                                    <a href="https://seller.hehe.rw/#contactUs" target="_blank"><span className="top-content">Become a Seller</span></a>
                                    <a href="https://tracking.wherehouseshipping.com/" target="_blank"><span className='top-content'>Track your order</span></a>
                                    <a href="https://dmmhehe.com/" target="_blank"><span className='top-content'>about</span></a>
                                    <a href="https://seller.hehe.rw/#contactUs" target="_blank"><span className='top-content'>contact</span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='header'>
                        <div className='row maximum-width'>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-1 header-left'>
                                <div className="main-menu__wrapper mobile-visible">
                                    <div className="home-link">
                                        <a href="/"><span className='icon-Home'></span>
                                        <span className="mobile-menu__title mobile-visible">Home</span></a>
                                    </div>
                                </div>
                                
                                <span className='site-logo'>
                                    <a href='/' className="mobile-invisible">
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1564428498/multi-vendor/NEW_HEHE_LOGOS-Final_logos_LANDSCAPE_B2C_BETA_LANDSCAPE_B2C_BETA_2.svg' />
                                    </a>
                                    <a href='/' className="mobile-visible">
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1563286307/multi-vendor/HeHe_Favicon.png' />
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
                            <div className='col-lg-5 col-md-5 col-sm-2 col-11 search-container'>
                                <form className='main-search' onSubmit={this.handleSearchValueSubmission}>

                                    <div className={classnames("search-suggestion", {
                                    "dismiss-onscroll": !this.state.visible
                                    })}
                                    >
                                        <SearchDropdown 
                                        updateParentSearchTerm={this.updateSearchValue}
                                        />

                                    </div>

                                    {/* <input type="text" placeholder="Search store or product" /> */}
                                    {/* <span className='categories-dropdown'>
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
                                    <button type="submit"><span className="icon-Path-64"></span></button> */}
                                    <button type="submit">
                                        <span className="icon-Path-64"></span>
                                    </button>
                                </form>
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-4 col-6 account-container'>
                                <div className='row row-container'>
                                    <div className='col-lg-6 col-md-6 col-sm-6 col-6 account-grid'>
                                        <div className='row'>
                                            <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                                <a href="/profile" className="mobile-visible"><span className='icon-Path-62'></span></a>
                                                <span className="mobile-menu__title mobile-visible">Account</span>
                                            </div>
                                            {/* user profile goes here */}
                                            {this.renderUserProfile()}
                                        </div>
                                    </div>
                                    <Cart 
                                    updateCart={this.state.updateCart}
                                    openCart={this.props.openCart}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;
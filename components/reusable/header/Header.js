import Router from 'next/router';
import Cart from './Cart';
import HeaderCategoryMenu from './HeaderCategoryMenu';
import { getUserAuthenticatedInfo, logoutUser } from '../../../helpers/auth';
import isObjectEmpty from '../../../helpers/is_object_empty';
import SearchDropdown from './SearchDropdown';
import classnames from "classnames";
import Head from 'next/head';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCart: false,
            authUser: {},
            prevScrollpos: 0,//window.pageYOffset,
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
    }
    componentDidMount() {
        this.setState({
            prevScrollpos: window.pageYOffset,
        })
        getUserAuthenticatedInfo((user) => {
            this.updateAuthUser(user);
        });
        window.addEventListener("scroll", this.handleScroll);
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
        window.removeEventListener("scroll", this.handleScroll);
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
        });
    }

    renderAlertContent() {
        const { alertVisibility } = this.state;
        if (alertVisibility) {
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
            const userName = `Hi ${first_name}`;
            return (
                <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset account-links'>
                    <div className='header-content profile-name'>{userName}</div>
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
                <div className='header-content'>My account</div>                
            </div>
        );
    }


    render() {
        const { alertVisibility } = this.state;
        // let className = "header-panel";
        // if (alertVisibility) {
        //     className += " top-alert";
        // }
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
                    <div>
                        {/* {this.renderAlertContent()} */}
                    </div>
                    <div className='header'>
                        <div className='row maximum-width'>
                            <div className='col-lg-4 col-md-4 col-sm-6 col-1 header-left'>
                                <span className='site-logo'>
                                    <a href='/'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1563286307/multi-vendor/HeHe_Favicon.png' />
                                    </a>
                                </span>                                
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

                                    <button type="submit">
                                        <span className="icon-Path-64"></span>
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bottom-mainMenu">
                    <div className="main-menu__wrapper row row-reset">
                        <div className="mob-menu-item col-3">
                            <a href="/" className="mobile-menu-link">
                                <span className='icon-Home mobile-menu-icon'></span>
                                <span className="mobile-menu__title">Home</span>
                            </a>
                        </div>
                        <div className="mob-menu-item col-3">
                            <HeaderCategoryMenu />
                        </div>
                        <div className="mob-menu-item col-3">
                            <a href="/profile" className="mobile-menu-link">
                                <span className='icon-Path-62 mobile-menu-icon'></span>
                                <span className="mobile-menu__title">Account</span>
                            </a>
                        </div>
                        <div className="mob-menu-item col-3">
                            <Cart 
                            updateCart={this.state.updateCart}
                            openCart={this.props.openCart}
                            />
                        </div>                      

                    </div>
                    
                </div>
            </div>
        )
    }
}

export default Header;
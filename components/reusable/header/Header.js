import Select2 from 'react-select2-wrapper';
import Cart from './Cart';
import HeaderCategoryMenu from './HeaderCategoryMenu';

class Header extends React.Component {

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
                        <div className='col-lg-5 col-md-5 col-sm-12 col-2 search-container'>
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
                        <div className='col-lg-3 col-md-3 col-sm-12 col-3 account-container'>
                            <div className='row'>
                                <div className='col-lg-6 col-md-6 col-sm-6 col-2 account-grid'>
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-12 col-reset'>
                                            <span className='icon-Path-62'></span>
                                        </div>
                                        <div className='col-lg-9 col-md-9 col-sm-9 col-9 col-reset account-links'>
                                            <div className='header-content'>My account</div>
                                            <div className='header-content'><a href='/signin'>Sign in</a> / <a href='/register'>Register</a></div>
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
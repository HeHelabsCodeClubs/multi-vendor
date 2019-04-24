import Link from 'next/link';

const Header = () => (
    <div>
        <div className='row reset-row top-panel'>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <div className='top-panel-left'>
                    <span className='top-content'>+(250) 788 317 916</span>
                    <span className='top-content'>order.hehe.rw</span>
                </div>
            </div>
            <div className='col-lg-6 col-md-6 col-sm-6 col-xs-12'>
                <div className='top-panel-right'>
                    <span className='top-content'>Track your order</span>
                    <span className='top-content'>about</span>
                    <span className='top-content'>contact</span>
                </div>
            </div>
        </div>
        <div className='row reset-row header'>
            <div className='col-lg-4 col-md-4 col-sm-12 col-xs-12'>
                <span className='site-logo'>
                    <img src='https://res.cloudinary.com/hehe/image/upload/v1556120378/multi-vendor/HeHe_Logo_Original_landscape.svg' />
                </span>
                <span className='location-dropdown'>
                    <select>
                        <option>Kigali, Kacyiru KCB</option>
                        <option>Kigali Height</option>
                        <option>Kigali, Kimironko Market</option>
                        <option>Kigali, Town</option>
                    </select>
                </span>
                <span className='categories-dropdown'>
                    <span className='icon-Path-61'></span>
                </span>
            </div>
            <div className='col-lg-5 col-md-5 col-sm-12 col-xs-12'>
                <span className='main-search'>
                    <input type="text" placeholder="Search store or product" />
                    <select>
                        <option>Shoes</option>
                        <option>Groceries</option>
                        <option>Clothes</option>
                        <option>Electronics</option>
                    </select>
                    <button type="submit"><span className="icon-Path-64"></span></button>
                </span>
            </div>
            <div className='col-lg-3 col-md-3 col-sm-12 col-xs-12'>
                <div className='row'>
                    <div className='col-lg-6 account-grid'>
                        <div className='row'>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-xs-3 col-reset'>
                                <span className='icon-Path-62'></span>
                            </div>
                            <div className='col-lg-9 col-md-9 col-sm-9 col-xs-9 col-reset'>
                                <div className='header-content'>My account</div>
                                <div className='header-content'>Sign in / Register</div>
                            </div>
                        </div>
                    </div>
                    <div className='col-lg-6 cart-grid'>
                        <span className='icon-Path-63'></span>
                        <span className='header-content'>Cart</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

export default Header;
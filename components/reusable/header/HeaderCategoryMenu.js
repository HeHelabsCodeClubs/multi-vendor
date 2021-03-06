import fetch from 'isomorphic-unfetch';
import Link from 'next/link';
import { API_URL } from '../../../config';
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from 'body-scroll-lock';

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

SidebarUI.Content = ({ width = '70%', isRight = false, ...rest }) => {
    const classes = [
        'SidebarContent',
        isRight ? 'is-right' : '',
    ];
    const style = {
        width,
        maxWidth: 300,
        height: '100%',
        top: 0,
        boxShadow: 'none',
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
        this.renderCategorySubCategories = this.renderCategorySubCategories.bind(this);
    };
    //targetElement = null;

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
            //disableBodyScroll(this.targetElement);
        } else {
            this.setState({ showCustomerMenu: false });
            //enableBodyScroll(this.targetElement);
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

    renderCategorySubCategories(parent_category_slug, category_children) {
        if (category_children.length > 0) {
            const parentCategoryLayout = category_children.map((parentCat) => {
                let categoryChildLayout = null;
                const { children } = parentCat;
                if (children.length > 0) {
                    categoryChildLayout = children.map((childCat) => {
                        return (
                            <a 
                                href={`/categories/${parent_category_slug}/${parentCat.slug}/${childCat.slug}`}
                                key={childCat.slug}
                                className='sub-cat-item'
                                >
                                {childCat.name}
                            </a>
                            
                        );
                    });
                }
                return (
                    <div 
                    key={parentCat.slug}
                    className='sub-wrapper'>
                        {/* <Link
                        href={`/categories/?category_slug=${parent_category_slug}&sub_cat_slug=${parentCat.slug}`}
                        as={`/categories/${parent_category_slug}/${parentCat.slug}`}
                        > */}
                            <a
                            href={`/categories/${parent_category_slug}/${parentCat.slug}`}
                            className='sub-cat-title'
                            >
                                {parentCat.name}
                            </a>
                        {/* </Link> */}
                        <div
                        className='sub-cat-wrapper'
                        >
                            {categoryChildLayout}
                        </div>
                    </div>
                );
            });
           
            return parentCategoryLayout;
        }
        return null;
    }

    renderCategory(categories) {
        if (categories) {
            const categoryLayout = categories.map((category) => {
                const {
                    id,
                    slug,
                    name,
                    icon_class_name,
                    icon_url,
                    children
                } = category;
                const IconUrl = icon_url !== '' ? icon_url : 'icon-KITCHENWARE-ICO';
                //const links = icon_class_name.split(',');
                    return (
                        <span className="nav__submenu-item " key={id} >
                            {/* <Link
                            href={`/categories?category_slug=${slug}`}
                            as={`/categories/${slug}`}
                            > */}
                                <a  
                                className='sub-menu__item-a'
                                href={`/categories/${slug}`}
                                >
                                
                                {/* <span className={`${IconClassName} menu-item-icon`} /> */}
                                <img src={IconUrl} className={`cat-icon`} />
                                <h5 className="cat-name-menu">{name}</h5>
                                </a>
                            {/* </Link> */}
                            <div className='sub-category'>
                                <div className='row'>
                                    <div className='col-lg-8 col-md-7 col-sm-8 col-12'>
                                        {this.renderCategorySubCategories(slug, children)}
                                    </div>
                                    <div className='col-lg-4 col-md-5 col-sm-4 col-12'>
                                        <div className="menu-banners">
                                            <div className='menu-img'>
                                                <img src='https://res.cloudinary.com/hehe/image/upload/v1564149056/multi-vendor/Group_1284_2x.png' />
                                            </div>
                                            <div className='menu-img'>
                                                <img src='https://res.cloudinary.com/hehe/image/upload/v1564149055/multi-vendor/Group_1281_2x.png' />
                                            </div>
                                            <div className='menu-img'>
                                                <img src='https://res.cloudinary.com/hehe/image/upload/v1564149055/multi-vendor/Group_1282_2x.png' />
                                            </div>
                                            <div className='menu-img'>
                                                <img src='https://res.cloudinary.com/hehe/image/upload/v1565166464/multi-vendor/Group_1283_2x_2.png' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </span>
                    )
            });

            categoryLayout.unshift(
                <span className="nav__submenu-item shypt-item" key="hehe-services" >
                    <a href="#" className='sub-menu__item-a'>
                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571155428/logistics-platform/images/Group_1391.svg" className={`cat-icon cat-img-menu`} />
                        <h5 className="cat-name-menu"> Request other services</h5>
                    </a>
                    <div className='sub-category'>
                        <div className='row'>
                            <div className='col-lg-8 col-md-7 col-sm-8 col-12'>
                            <div 
                                key="services-request"
                                className='sub-wrapper services'>
                                    <div
                                    className='sub-cat-wrapper'
                                    >
                                        <div className="services-title-container">
                                            <h2>SHYPT</h2>
                                            <h5>We deliver!</h5>
                                        </div>
                                        <div className="services-content-container">
                                            <p>
                                            Have a long to-do list? Focus on your priorities and let us go miles for you on the rest of the activities.
                                            </p>
                                            <ul>
                                                <li>
                                                    <a href="https://shypt.rw" target="_blank">
                                                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571218588/multi-vendor/category/category-icons/shypt-icons/cart_shop_ico.svg"/>
                                                        <h5>Online shopping</h5>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://shypt.rw" target="_blank">
                                                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571218588/multi-vendor/category/category-icons/shypt-icons/dry_cleaning_ico.svg"/>
                                                        <h5>Dry-cleaning pickup & drop-off/Laundry</h5>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://shypt.rw" target="_blank">
                                                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571218588/multi-vendor/category/category-icons/shypt-icons/Gift_ico.svg"/>
                                                        <h5>Gift shopping/wrapping delivery</h5>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://shypt.rw" target="_blank">
                                                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571218588/multi-vendor/category/category-icons/shypt-icons/package_ico.svg"/>
                                                        <h5>package delivery</h5>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://shypt.rw" target="_blank">
                                                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571218588/multi-vendor/category/category-icons/shypt-icons/envelope_ico.svg"/>
                                                        <h5>Parcel delivery/pickup</h5>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="https://shypt.rw" target="_blank">
                                                        <img src="https://res.cloudinary.com/hehe/image/upload/v1571218588/multi-vendor/category/category-icons/shypt-icons/Truck_other_ico.svg"/>
                                                        <h5>Others</h5>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-4 col-md-5 col-sm-4 col-12'>
                                <div className="menu-banners">
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1564149056/multi-vendor/Group_1284_2x.png' />
                                    </div>
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1564149055/multi-vendor/Group_1281_2x.png' />
                                    </div>
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1564149055/multi-vendor/Group_1282_2x.png' />
                                    </div>
                                    <div className='menu-img'>
                                        <img src='https://res.cloudinary.com/hehe/image/upload/v1565166464/multi-vendor/Group_1283_2x_2.png' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </span>
            );
            
            return categoryLayout;
        }
    }

    renderMoboCategory(categories) {
        if (categories) {
            const categoryLayout = categories.map((category) => {
                const { slug, icon_class_name } = category;
                const IconClassName = icon_class_name !== '' ? icon_class_name : 'icon-KITCHENWARE-ICO';
                return (
                    <span className="nav__submenu-item " key={category.id} >
                        <Link
                        href={`/categories?category_slug=${slug}`}
                        as={`/categories/${slug}`}
                        >
                            <a className='sub-menu__item-a'>
                                <span className={`${IconClassName} menu-item-icon`} />
                                {category.name}
                            </a>
                        </Link>
                        
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
                                <div>
                                    <div className='menu-overlay' onClick={this.customerHandleHover}></div>
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
                                        <span className="mobile-menu__title mobile-visible">Categories</span>
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
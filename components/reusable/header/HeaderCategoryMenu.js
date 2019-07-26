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
                        <a
                        href={`/categories/${parent_category_slug}/${parentCat.slug}`}
                        className='sub-cat-title'
                        >
                            {parentCat.name}
                        </a>
                        <div
                        className='sub-cat-wrapper'
                        >
                            {categoryChildLayout}
                        </div>
                    </div>
                );
            })
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
                            <a 
                            href={`/categories/${slug}`} 
                            className='sub-menu__item-a'>
                            {/* <span className={`${IconClassName} menu-item-icon`} /> */}
                            <img src={IconUrl} className={`cat-icon`} />
                            <h5>{name}</h5>
                            </a>
                            <div className='sub-category'>
                                <div className='row'>
                                    <div className='col-lg-9 col-md-9 col-sm-9 col-12'>
                                        {this.renderCategorySubCategories(slug, children)}
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
                const { slug, icon_class_name } = category;
                const IconClassName = icon_class_name !== '' ? icon_class_name : 'icon-KITCHENWARE-ICO';
                return (
                    <span className="nav__submenu-item " key={category.id} >
                        <a href={`/categories/${slug}`} className='sub-menu__item-a'>
                            <span className={`${IconClassName} menu-item-icon`} />
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
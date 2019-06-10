import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';

class HeaderCategoryMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomerMenu: false,
            showSubCategory: false,
            categories: []
        };
        this.renderCategory = this.renderCategory.bind(this);
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
           categories: data.data,
           //showCustomerMenu: true
        });
    }

    customerHandleHover = () => {
        this.setState({ showCustomerMenu: true });
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

    renderCategory(categories) {
        if (categories) {
            const categoryLayout = categories.map((category) => {
                return (
                    <li className="nav__submenu-item " key={category.id} onMouseEnter={this.categoryHandleHover} onMouseLeave={this.categoryHandleLeave} >
                        <a href="/categories" className='sub-menu__item-a'>{category.name}</a>
                    </li>
                )
            });
            return categoryLayout;
        }
    }

    render() {
        const { categories } = this.state;
        return (
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
                                    {this.renderCategory(categories)}
                                </ul>
                            }
                        </li>
                    </ul>
                </nav>
                {this.state.showSubCategory && 
                    <div className='sub-category'>meeeeeeeeeeee</div>
                }
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
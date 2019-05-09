import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';

class HeaderCategoryMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showCustomerMenu: false,
            categories: []
        };
        this.renderCategory = this.renderCategory.bind(this);
    };

    async componentDidMount() {
        const res = await fetch(`${API_URL}/categories`)
        const data = await res.json()

        this.setState({
		   categories: data.data
        });
    }

    customerHandleHover = () => {
        this.setState({ showCustomerMenu: true });
    };
    customerHandleLeave = () => {
        this.setState({ showCustomerMenu: false });
    };

    renderCategory() {
        const categoryLayout = this.state.categories.map((category) => {
            return (
                <li className="nav__submenu-item " key={category.id}>
                    <a href="/categories" className='sub-menu__item-a'>{category.name}</a>
                </li>
            )
        })
        return categoryLayout;
    }

    render() {
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
                                    {this.renderCategory()}
                                </ul>
                            }
                        </li>
                    </ul>
                </nav>
            </span>          
        )
    }
}

export default HeaderCategoryMenu;
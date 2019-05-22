import fetch from 'isomorphic-unfetch';
import { API_URL } from '../../../config';
import { ReactMegaMenu } from "react-mega-menu";

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
                {/* <ReactMegaMenu 
                    tolerance={50}      // optional, defaults to 100
                    direction={"LEFT"}  // optional, defaults to "RIGHT", takes in "RIGHT" || "LEFT"
                    // styleConfig={...}   // defaults to an empty object. not recommended to be left blank.
                    // onExit={}  // a function to be called when a mouse leaves the container
                    data={this.renderCategory()}      // array of data to be rendered
                /> */}
            </span>          
        )
    }
}

export default HeaderCategoryMenu;
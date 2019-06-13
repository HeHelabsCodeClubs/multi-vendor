import React, { Component } from 'react';
import Router from 'next/router';
import SideMenu from 'react-sidemenu';
import Item from 'react-sidemenu';
import MenuItemCategory from "./MenuItemCategory";

// import ReactResponsiveSelect from 'react-responsive-select';
 
// const onChange = (newValue) => console.log('onChange', newValue);
// const onSubmit = () => console.log('onSubmit');

// const SidebarUI = ({ isOpen, ...rest }) => {
//     const classes = [
//         'Sidebar',
//         isOpen ? 'is-open' : '',
//     ];
//     return (
//         <div aria-hidden={!isOpen} className={classes.join(' ')} {...rest} />
//     );
// };
  
// SidebarUI.Overlay = props => <div className="SidebarOverlay" {...props} />;

// SidebarUI.Content = ({ width = '40%', isRight = true, ...rest }) => {
//     const classes = [
//         'SidebarContent',
//         isRight ? 'is-right' : '',
//     ];
//     const style = {
//         width,
//         height: '100%',
//         top: 0,
//         right: isRight ? `-${width}` : 'auto',
//         left: !isRight ? `-${width}` : 'auto',
//     };
    
//     return (
//         <div
//             className={classes.join(' ')}
//             style={style}
//             {...rest}
//         />
//     );
// };

// const caretIcon = (
//     <svg className="caret-icon" x="0px" y="0px" width="11.848px" height="6.338px" viewBox="351.584 2118.292 11.848 6.338">
//       <g><path d="M363.311,2118.414c-0.164-0.163-0.429-0.163-0.592,0l-5.205,5.216l-5.215-5.216c-0.163-0.163-0.429-0.163-0.592,0s-0.163,0.429,0,0.592l5.501,5.501c0.082,0.082,0.184,0.123,0.296,0.123c0.103,0,0.215-0.041,0.296-0.123l5.501-5.501C363.474,2118.843,363.474,2118.577,363.311,2118.414L363.311,2118.414z"/></g>
//     </svg>
// );

class SidemenuCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            categories: []
        };
        this.openSidebar = this.openSidebar.bind(this);
        this.renderMenuItems = this.renderMenuItems.bind(this);
        this.renderCategoryChildren = this.renderCategoryChildren.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
    }

    componentWillMount() {
        const { subCategories } = this.props;
        this.setState({
            categories: subCategories
        });
    }

    componentWillReceiveProps(nextProps) {
        const { subCategories } = nextProps;
        this.setState({
            categories: subCategories
        });
    }

    openSidebar(isOpen = true) {
        this.setState({ isOpen });
    }

    redirectToPage(value, e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        console.log('clicked');
        console.log(value);
        const { parentCategorySlug } = this.props;
        console.log('parent cat', parentCategorySlug);
        Router.push(`/categories/${parentCategorySlug}/${value}`);
        //window.location.assign('/');
    }

    renderMenuItems() {
        const { categories } = this.state;
        if (categories.length === 0) {
            return [];
        }

        const items = [
            {divider: true, label: 'All Categories', value: 'main-nav'}
        ];

        for (let i = 0; i < categories.length; i++) {
            items.push({
                label: categories[i].name,
                value: categories[i].slug,
                children: this.renderCategoryChildren(categories[i].children)
            });
        }

        return items;
    }

    renderCategoryChildren(category_children) {
        if (category_children.length === 0 || !category_children) {
            return [];
        }
        const childrenData = [];
        for (let i = 0; i < category_children.length; i++) {
            childrenData.push({
                label: category_children[i].name,
                value: category_children[i].slug
            });
        }

        return childrenData;
    }
    render() {
        const { isOpen } = this.state;
        const { isRight } = this.props;
        return (
            <div>
                {/* <SideMenu 
                    items={this.renderMenuItems()} 
                    onMenuItemClick={(value) => this.redirectToPage(value)}
                    shouldTriggerClickOnParents={true}
                /> */}

                <div className="Side-menu Side-menu-default  children active">
                    <div className="divider divider-level-1">All Categories</div>
                    < MenuItemCategory />
                </div>

                
                {/* <SidebarUI isOpen={isOpen}>
                    <div className='filter-title' onClick={this.openSidebar}>Filter</div>
                    <SidebarUI.Content isRight={isRight}>
                        <div>
                            <div className='filter-sidebar-title' onClick={() => this.openSidebar(false)}>
                                <span className='close'>
                                    <span className="icon-Path-71" />
                                    <span className='back'>Back</span>
                                </span>
                                <span className='title'>Filter</span>
                            </div>
                            <div className='filter-sidebar-content'>
                                <div className='clear-button'>
                                    <button>Clear all</button>
                                </div>
                                <form>
                                    <ReactResponsiveSelect
                                        name="Category"
                                        options={[
                                            {text: 'Clothing', value: 'Clothing', "altered": true},
                                            {text: 'Electronics', value: 'Electronics', markup: <span>Oldsmobile</span>},
                                            {text: 'Groceries', value: 'Groceries', markup: <span>Ford</span>}
                                        ]}
                                        prefix="Category: "
                                        onSubmit={onSubmit}
                                        onChange={onChange}
                                        caretIcon={<span className='icon-Path-70'></span>}
                                    />
                                    <ReactResponsiveSelect
                                        name="Sort By"
                                        options={[
                                            {text: 'Price', value: 'Price'},
                                            {text: 'Popularity', value: 'Popularity', markup: <span>Oldsmobile</span>},
                                            {text: 'Featured', value: 'Featured', markup: <span>Ford</span>}
                                        ]}
                                        prefix="Sort By: "
                                        onSubmit={onSubmit}
                                        onChange={onChange}
                                        caretIcon={<span className='icon-Path-70'></span>}
                                    />
                                    <ReactResponsiveSelect
                                        name="Price"
                                        options={[
                                            {text: 'frw 200 - 250', value: 'null'},
                                            {text: 'frw 250 - 300', value: 'frw 250 - 300', markup: <span>Oldsmobile</span>},
                                            {text: 'frw 300 - 350', value: 'frw 300 - 350', markup: <span>Ford</span>}
                                        ]}
                                        prefix='Price: '
                                        onSubmit={onSubmit}
                                        onChange={onChange}
                                        caretIcon={<span className='icon-Path-70'></span>}
                                    />
                                </form>
                            </div>
                        </div>
                    </SidebarUI.Content>
                    {isOpen ? <SidebarUI.Overlay onClick={() => this.openSidebar(false)} /> : false}
                </SidebarUI> */}
            </div>
        );
    }
}

export default SidemenuCategories;
import React, { Component } from 'react';
import Router from 'next/router';
import MenuItemCategory from "./MenuItemCategory";

class SidemenuCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            openDropdown: false,
            categories: [],
            subParentCatHasToBeUpdated: false
            //triggerUpdateOfActiveSubCat: false
        };
        this.openSidebar = this.openSidebar.bind(this);
        this.renderMenuItems = this.renderMenuItems.bind(this);
        this.renderMenuItemsMobile = this.renderMenuItemsMobile.bind(this);
        this.renderCategoryChildren = this.renderCategoryChildren.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
        this.renderActiveParentCategory = this.renderActiveParentCategory.bind(this);
        this.updateActiveParentSubCat = this.updateActiveParentSubCat.bind(this);
        this.openDropdownMenu = this.openDropdownMenu.bind(this);
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
        const { parentCategorySlug } = this.props;
        Router.push(`/categories/${parentCategorySlug}/${value}`);
    }

    updateActiveParentSubCat() {
        this.setState({
            subParentCatHasToBeUpdated: true
        });
    }

    renderMenuItems() {
        const { categories, subParentCatHasToBeUpdated } = this.state;
        if (categories.length === 0) {
            return null;
        }

        const { parentCategorySlug, updateProducts, displayLoader } = this.props;

        const menuItemsLayout = categories.map((category) => {
           return (
                <MenuItemCategory 
                key={category.slug}
                category={category}
                parentCategorySlug={parentCategorySlug}
                updateProducts={updateProducts}
                displayLoader={displayLoader}
                triggerUpdateOfActiveSubCat={this.updateActiveParentSubCat}
                subParentCatHasToBeUpdated={subParentCatHasToBeUpdated}
                />
           );
        });

        return menuItemsLayout;
    }

    renderMenuItemsMobile() {
        const { categories, subParentCatHasToBeUpdated, openDropdown } = this.state;
        if (categories.length === 0) {
            return null;
        }

        const { parentCategorySlug, updateProducts, displayLoader} = this.props;
        
        const menuItemsLayout = categories.map((category) => {
                return (
                    <MenuItemCategory 
                    key={category.slug}
                    category={category}
                    parentCategorySlug={parentCategorySlug}
                    updateProducts={updateProducts}
                    displayLoader={displayLoader}
                    triggerUpdateOfActiveSubCat={this.updateActiveParentSubCat}
                    subParentCatHasToBeUpdated={subParentCatHasToBeUpdated}
                    />
                );           
        });

        if (openDropdown) {
            return menuItemsLayout;
        }
        return null;
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
    renderActiveParentCategory() {
        const { activeParentCategory } = this.props;
        const displayedCategory = activeParentCategory === '' ? null : activeParentCategory;
        return (
            <div className="divider divider-level-1">
                {displayedCategory}
            </div>
        );
    }

    openDropdownMenu() {        
        const { openDropdown } = this.state;
        if (openDropdown) {
            this.setState({ 
                openDropdown: false 
            });
        } else {
            this.setState({ 
                openDropdown: true
            });
        }
    }

    render() {
        return (
            <div>
                <div className="mobile-invisible side-menu__item Side-menu Side-menu-default  children active">
                        {this.renderActiveParentCategory()}
                    <div>
                        {this.renderMenuItems()}
                    </div>                    
                </div>

                <div className="mobile-visible dropdown side-menu__item Side-menu Side-menu-default  children active">
                    <div className="side-menu__item">
                        <div onClick={this.openDropdownMenu} className="divider divider-level-1">
                            <span>{this.renderActiveParentCategory()}</span> 
                            <span className="icon-Angle_down mobile-visible"></span>
                        </div>
                    </div>
                    <div className="item-menu-dropdown-content">
                        {this.renderMenuItemsMobile()}
                    </div>                    
                </div>
            </div>
        );
    }
}

export default SidemenuCategories;
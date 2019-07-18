import React, { Component } from 'react';
import Router from 'next/router';
import MenuItemCategory from "./MenuItemCategory";

class SidemenuCategories extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: props.isOpen,
            categories: [],
            subParentCatHasToBeUpdated: false
            //triggerUpdateOfActiveSubCat: false
        };
        this.openSidebar = this.openSidebar.bind(this);
        this.renderMenuItems = this.renderMenuItems.bind(this);
        this.renderCategoryChildren = this.renderCategoryChildren.bind(this);
        this.redirectToPage = this.redirectToPage.bind(this);
        this.renderActiveParentCategory = this.renderActiveParentCategory.bind(this);
        this.updateActiveParentSubCat = this.updateActiveParentSubCat.bind(this);
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
    render() {
        return (
            <div>
                <div className="Side-menu Side-menu-default  children active">
                    {this.renderActiveParentCategory()}
                    {this.renderMenuItems()}
                </div>
            </div>
        );
    }
}

export default SidemenuCategories;
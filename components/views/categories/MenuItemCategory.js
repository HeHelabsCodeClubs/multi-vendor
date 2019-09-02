import React, { Component } from "react";
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { API_URL } from '../../../config';

export default class  MenuItemCategory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isMenuItemActive: '',
            activeChildrenItem: '',
            category: {},
            renderPlusIcon: true
        };
        this.renderCategories = this.renderCategories.bind(this);
        this.renderCategoryChildren = this.renderCategoryChildren.bind(this);
        this.renderCategoryNameDropDownIcon = this.renderCategoryNameDropDownIcon.bind(this);
        this.handleParentCategoryClick = this.handleParentCategoryClick.bind(this);
        this.handleDisplayOfSubCategories = this.handleDisplayOfSubCategories.bind(this);
        this.handleChildrenCategoryClick = this.handleChildrenCategoryClick.bind(this);
        this.getCategoryProducts = this.getCategoryProducts.bind(this);
        this.handleUpdateProductsPerActiveCategory = this.handleUpdateProductsPerActiveCategory.bind(this);
        this.updateActiveItemOnRender = this.updateActiveItemOnRender.bind(this);
        this.updateChildrenCategorySelection = this.updateChildrenCategorySelection.bind(this);
    }

    componentDidMount() {
        const { category } = this.props;
        this.setState({
            category: category
        }, () => {
            this.updateActiveItemOnRender();
        });
    }

    componentWillReceiveProps(nextProps) {
        const { subParentCatHasToBeUpdated } = nextProps;
        if (subParentCatHasToBeUpdated) {
            this.updateActiveItemOnRender();
        }
    }

    updateActiveItemOnRender() {
        const { router: { query : { sub_cat_slug, sub_last_cat_slug } } } = Router;
        if (sub_cat_slug) {
            this.handleDisplayOfSubCategories(sub_cat_slug);
        }
        if (sub_last_cat_slug) {
            this.updateChildrenCategorySelection(sub_last_cat_slug);
        }
    }

    handleChildrenCategoryClick(parent_category_slug, parent_subcategory_slug, slug, e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.updateChildrenCategorySelection(slug);
        this.handleUpdateProductsPerActiveCategory(slug);
        const actionUrl = `/categories?category_slug=${parent_category_slug}&sub_cat_slug=${parent_subcategory_slug}&sub_last_cat_slug=${slug}`;
        const asUrl = `/categories/${parent_category_slug}/${parent_subcategory_slug}/${slug}`;
        Router.push(actionUrl, asUrl);
    }

    updateChildrenCategorySelection(slug) {
        this.setState({
            activeChildrenItem: slug
        });
    }

    renderCategoryChildren(children, parent_subcategory_slug, parent_category_slug) {
        const { activeChildrenItem } = this.state;
        const subCategoriesLayout = children.map((subcategory) => {
            const { name, slug } = subcategory;
            const activeClass = activeChildrenItem === slug ? 'item item-level-2 active' : 'item item-level-2';
            return (
                <a 
                key={slug}
                className={activeClass}
                href={`/categories/${parent_category_slug}/${parent_subcategory_slug}/${slug}`}
                onClick={(e) => this.handleChildrenCategoryClick(parent_category_slug, parent_subcategory_slug, slug, e)}
                >
                    <h5 className="item-title">
                        {name}
                    </h5>
                </a>
            );
        });
        return subCategoriesLayout;
    }

    renderCategoryNameDropDownIcon() {
        const { renderPlusIcon } = this.state;

        if (renderPlusIcon === true) {
            return (
                <span className="category-drop-icon">
                    <i className="fa fa-chevron-left mobile-invisible"></i>
                    <i className="icon-Angle_right mobile-visible"></i>
                </span>
            );
        } else {
            return (
                <span className="category-drop-icon">
                    <i className="fa fa-chevron-right mobile-invisible"></i>
                    <i className="icon-Angle_right mobile-visible"></i>
                </span>
            );
        }
    }

    handleParentCategoryClick(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        const { renderPlusIcon } = this.state;

        if (renderPlusIcon) {
            this.setState({
                renderPlusIcon: false
            })
        } else {
            this.setState({
                renderPlusIcon: true
            })
        }
        const { slug } = this.state.category;
        this.handleUpdateProductsPerActiveCategory(slug);
        this.handleDisplayOfSubCategories(slug);
        const actionUrl = `/categories?category_slug=${this.props.parentCategorySlug}&sub_cat_slug=${slug}`;
        const asUrl = `/categories/${this.props.parentCategorySlug}/${slug}`;
        Router.push(actionUrl, asUrl);
        this.props.triggerUpdateOfActiveSubCat();
    }

    handleUpdateProductsPerActiveCategory(slug) {
        /**
         * Display loader to indicate products update
         */
        this.props.displayLoader(() => {
             // update products
            this.getCategoryProducts(slug, (newProducts) => {
                this.props.displayLoader(() => {
                    this.props.updateProducts(newProducts);
                });
            });
        });
        this.getSellers(slug, (sellers) => {
            this.props.updateSellers(sellers);
        });
    }

    async getSellers(categorySlug, callback) {
        const remoteUrl = `${API_URL}/categories/${categorySlug}/parent_page`;
        const res = await fetch(remoteUrl);
        const response = await res.json();
        const data = {
            sellers: response.data.sellers
        };
        callback(data);
    }

    async getCategoryProducts(categorySlug, callback) {
        const remoteUrl = `${API_URL}/categories/${categorySlug}/products`;
        const res = await fetch(remoteUrl);
        const response = await res.json();
        const data = {
            products: response.data,
            meta: response.meta.pagination_data
        };
        callback(data);
    }

    handleDisplayOfSubCategories(slug) {
        this.setState({
            isMenuItemActive: slug
        });
    }

    renderCategories() {
        const { category, isMenuItemActive } = this.state;
        if (!isObjectEmpty(category)) {
            const { 
                name,
                slug,
                children 
            } = category;
            const { parentCategorySlug } = this.props;
            const itemClass = slug === isMenuItemActive ? 'item item-level-1 active' : 'item item-level-1';
            const childrenLayout = children.length > 0 ? (
                    <div className="children active">
                        {this.renderCategoryChildren(children, slug, parentCategorySlug)}
                    </div>
                 ) : null;
            const dropDownIcon = children.length > 0 ? this.renderCategoryNameDropDownIcon() : null;
            return (
                <div className={itemClass}>
                    <a
                    className="item-title"
                    href={`/categories/${this.props.parentCategorySlug}/${slug}`} 
                    onClick={this.handleParentCategoryClick}
                    >
                        <h5  
                        className="item-label">
                            {name} 
                            {dropDownIcon}
                        </h5>
                    </a>
                    {childrenLayout}
                </div>
            );
        }
        return null;
    }

    render() { 
        return this.renderCategories();
    }
}
import React, { Component } from "react";
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { API_URL } from '../../../config';

export default class  MenuItemCategory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isMenuItemActive: false,
            category: {}
        };
        this.renderCategories = this.renderCategories.bind(this);
        this.renderCategoryChildren = this.renderCategoryChildren.bind(this);
        this.renderCategoryNameDropDownIcon = this.renderCategoryNameDropDownIcon.bind(this);
        this.handleParentCategoryClick = this.handleParentCategoryClick.bind(this);
        this.handleDisplayOfSubCategories = this.handleDisplayOfSubCategories.bind(this);
        this.handleChildrenCategoryClick = this.handleChildrenCategoryClick.bind(this);
        this.getCategoryProducts = this.getCategoryProducts.bind(this);
        this.handleUpdateProductsPerActiveCategory = this.handleUpdateProductsPerActiveCategory.bind(this);
    }

    componentDidMount() {
        const { category } = this.props;
        this.setState({
            category: category
        });
    }

    handleChildrenCategoryClick(parent_category_slug, parent_subcategory_slug, slug, e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        this.handleUpdateProductsPerActiveCategory(slug);
        const actionUrl = `/categories?category_slug=${parent_category_slug}&sub_cat_slug=${parent_subcategory_slug}&sub_last_cat_slug=${slug}`;
        const asUrl = `/categories/${parent_category_slug}/${parent_subcategory_slug}/${slug}`;
        Router.push(actionUrl, asUrl);
    }

    renderCategoryChildren(children, parent_subcategory_slug, parent_category_slug) {
        const subCategoriesLayout = children.map((subcategory) => {
            const { name, slug } = subcategory;
            return (
                <a 
                key={slug}
                className="item item-level-2"
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
        return (
            <i className="fa fa-chevron-left"></i>
        );
    }

    handleParentCategoryClick(e) {
        if (e !== undefined) {
            e.preventDefault();
        }
        const { slug } = this.state.category;
        this.handleUpdateProductsPerActiveCategory(slug);
        this.handleDisplayOfSubCategories();
        const actionUrl = `/categories?category_slug=${this.props.parentCategorySlug}&sub_cat_slug=${slug}`;
        const asUrl = `/categories/${this.props.parentCategorySlug}/${slug}`;
        Router.push(actionUrl, asUrl);
    }

    handleUpdateProductsPerActiveCategory(slug) {
        /**
         * Display loader to indicate products update
         */
        this.props.displayLoader();
        // update products
        this.getCategoryProducts(slug, (newProducts) => {
            this.props.displayLoader();
            this.props.updateProducts(newProducts);
        });
    }

    async getCategoryProducts(categorySlug, callback) {
        const remoteUrl = `${API_URL}/categories/${categorySlug}/products`;
        const res = await fetch(remoteUrl);
        const response = await res.json();
        callback(response.data);
    }

    handleDisplayOfSubCategories() {
        const { isMenuItemActive } = this.state;
        if (isMenuItemActive) {
            this.setState({
                isMenuItemActive: false
            });
        } else {
            this.setState({
                isMenuItemActive: true
            });
        }
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
            const itemClass = isMenuItemActive ? 'active' : '';
            const childrenLayout = children.length > 0 ? (
                    <div className="children active">
                        {this.renderCategoryChildren(children, slug, parentCategorySlug)}
                    </div>
                 ) : null;
            const dropDownIcon = children.length > 0 ? this.renderCategoryNameDropDownIcon() : null;
            return (
                <div className={`item item-level-1 ${itemClass}`}>
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
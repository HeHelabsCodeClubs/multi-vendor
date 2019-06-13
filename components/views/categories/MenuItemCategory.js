import React, { Component } from "react";
import isObjectEmpty from '../../../helpers/is_object_empty';

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
    }

    componentDidMount() {
        const { category } = this.props;
        this.setState({
            category: category
        });
    }

    renderCategoryChildren(children) {
        const subCategoriesLayout = children.map((subcategory) => {
            const { name, slug } = subcategory;
            return (
                <a 
                key={slug}
                className="item item-level-2"
                >
                    <h5 className="item-title">
                        {name}
                        {/* <span>
                            <span className="item-label"></span>
                        </span> */}
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
        this.handleDisplayOfSubCategories();
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
                children 
            } = category
            const itemClass = isMenuItemActive ? 'active' : '';
            const childrenLayout = children.length > 0 ? (
                    <div className="children active">
                        {this.renderCategoryChildren(children)}
                    </div>
                 ) : null;
            const dropDownIcon = children.length > 0 ? this.renderCategoryNameDropDownIcon() : null;
            return (
                <div className={`item item-level-1 ${itemClass}`}>
                        <a 
                        href="#" 
                        onClick={this.handleParentCategoryClick}
                        className="item-title">
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
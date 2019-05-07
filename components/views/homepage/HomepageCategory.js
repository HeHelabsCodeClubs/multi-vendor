import React, { Component } from 'react';
import Slider from "react-slick";

class HomepageCategory extends Component {
    renderCategory(categories) {
        const categoriesLayout = categories.map((category) => {
            //let singleCategoryPageUrl = category.slug !== 'categories' ? `/categories/${category.slug}` : 'categories';
            return (
                <a href='/categories' key={category.id}>
                    <div className={`cat-icon ${category.icon_class_name}`}></div>
                    <div className='cat-name'>{category.name}</div>
                </a>
            );
        });
        return categoriesLayout;
    }
    render() {
        const catSettings = {
			infinite: true,
			speed: 500,
			slidesToShow: 6,
  			slidesToScroll: 5
		};
        return  (
            <Slider {...catSettings}>
               {this.renderCategory(this.props.categories)}
            </Slider>
        );
    }
}

export default HomepageCategory;
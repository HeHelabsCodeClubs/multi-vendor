import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";

class HomepageCategory extends Component {
    renderCategory(categories) {
        if (!_.isEmpty(categories)) {
            const categoriesLayout = categories.map((category) => {
                const {
                  icon_class_name,
                  name,
                  slug
                } = category;
                //let singleCategoryPageUrl = category.slug !== 'categories' ? `/categories/${category.slug}` : 'categories';
                const IconClassName = icon_class_name !== '' ? icon_class_name : 'icon-KITCHENWARE-ICO';
                return (
                  <a href={`/categories/${slug}`} key={slug}>
                    <img src={IconClassName} className={`cat-icon`} />
                    <div className='cat-name'>{name}</div>
                  </a>
                );
            });
            return categoriesLayout;
        }
    }
    render() {
        const catSettings = {
            infinite: false,
            speed: 1000,
            slidesToShow: 8,
            slidesToScroll: 1,
            swipeToSlide: true,
            responsive: [
                {
                  breakpoint: 1920,
                  settings: {
                    slidesToShow: 9,
                    slidesToScroll: 1,
                    dots: true
                  }
                },
                {
                  breakpoint: 1280,
                  settings: {
                    slidesToShow: 8,
                    slidesToScroll: 1,
                    dots: true
                  }
                },
                {
                  breakpoint: 979,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    dots: true
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 3,
                    centerMode: true,
					          centerPadding: "30px",
                    slidesToScroll: 1
                  }
                }
            ]
		};
        return  (
            <Slider {...catSettings}>
               {this.renderCategory(this.props.categories)}
            </Slider>
        );
    }
}

export default HomepageCategory;
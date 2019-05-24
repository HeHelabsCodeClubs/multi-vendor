import Link from 'next/link';
import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";

class HomepageCategory extends Component {
    renderCategory(categories) {
        if (!_.isEmpty(categories)) {
            const categoriesLayout = categories.map((category) => {
                //let singleCategoryPageUrl = category.slug !== 'categories' ? `/categories/${category.slug}` : 'categories';
                return (
                    //<Link prefetch href='/categories' key={category.id}>
                        <a href='/categories'>
                          <div className={`cat-icon ${category.icon_class_name}`}></div>
                          <div className='cat-name'>{category.name}</div>
                        </a>
                    //</Link>
                );
            });
            return categoriesLayout;
        }
    }
    render() {
        const catSettings = {
			infinite: true,
			speed: 1000,
			slidesToShow: 6,
            slidesToScroll: 2,
            responsive: [
                {
                  breakpoint: 979,
                  settings: {
                    slidesToShow: 5,
                    slidesToScroll: 1,
                    infinite: true,
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
                    slidesToShow: 4,
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
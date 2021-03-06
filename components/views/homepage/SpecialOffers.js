import _ from 'lodash';
import React, { Component } from 'react';
import SpecialProduct from '../../reusable/SpecialProduct';
import Slider from "react-slick";

class SpecialOffers extends Component {
    renderSpecialProducts(offers) {
        const productsLayout = offers.map((product) => {
            return (
                <div key={product.slug} className='special-single-product'>
                    <SpecialProduct product={product} />
                </div>
            );
        });
        return productsLayout;
    }
	render() {
        const { offers } = this.props;
        var settings = {
            dots: true,
            infinite: false,
            speed: 500,
            swipeToSlide: true,
            slidesToShow: 7,
            slidesToScroll: 2,
            responsive: [
                {
                  breakpoint: 1440,
                  settings: {
                    slidesToShow: 6,
                  }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 5,
                  }
                },
                {
                  breakpoint: 979,
                  settings: {
                    slidesToShow: 4,
                  }
                },
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 4,
                    centerMode: true,
                    centerPadding: "15px 0 0",
                    initialSlide: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    centerMode: true,
                    centerPadding: "15px 0 0",
                    initialSlide: 1
                                        
                  }
                }
            ]
        };
		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Combo Baskets</div>
				<div className='made-in-rwanda-content maximum-width'>
                    <div className="special-offers-row on-sale-offers">
                        <Slider {...settings}>
                            <div className="offers-banner">
                                <img src="https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1570790772/hehe/Mask_Group_27_2x.png" />
                            </div>
                            {this.renderSpecialProducts(offers)}
                        </Slider>
                    </div>

                    {/* <div className="special-offers-row on-sale-offers">
                        <Slider {...settings}>
                            <div className="offers-banner">
                                <img src="https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1564491392/multi-vendor/deals-offers.png" />
                            </div>
                            {this.renderSpecialProducts(offers)}
                        </Slider>
                    </div> */}
				</div>
			</div>
		);
	}
}

export default SpecialOffers;
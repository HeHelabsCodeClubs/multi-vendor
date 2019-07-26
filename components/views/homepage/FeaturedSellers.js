import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";
import ImageLoader from '../../reusable/ImageLoader';
import LimitString from '../../../helpers/limit_string';

class FeaturedSellers extends Component {
    constructor(props) {
        super(props);
        this.renderShopNowUrl = this.renderShopNowUrl.bind(this);
    }

    renderProduct(seller) {
        const products = seller.products;
        if (!_.isEmpty(products)) {
            const productLayout = products.map((product, index) => {
                return (
                    <a 
                    href={`sellers/${product.store_slug}/products/${product.product_slug}`} 
                    className='col-lg-4 col-md-4 col-sm-4 col-4 featured-seller-product' 
                    key={`${index}_${product.name}`}
                    >
                        <ImageLoader 
                        imageUrl={product.image_url}
                        placeholderHeight={100}
                        placeholderBackgroundColor='#ffffff'
                        />
                        {/* <img src={product.image_url} /> */}
                    </a>
                );
            });
            return productLayout;
        }
    }

    renderShopNowUrl(seller) {
        if (seller.store_url) {
            if (seller.store_url !== '') {
                return (
                    <span className='line-display seller-link margin-reset'>
                        <a href={seller.store_url} target='_blank'>Shop now <span className='icon-Path-75'></span></a>
                    </span>
                );
            }
            /**
             * Check if it has a parent category and link to it instead
             */
        }

        return <span />;
    }

    renderSeller(sellers) {
        if (!_.isEmpty(sellers)) {
            const sellerLayout = sellers.map((seller) => {
                return (
                    <div className='featured-wrapper' key={seller.logo}>
                        <div className='row reset-row multi-vendor-seller-wrapper'>
                            
                            <div className='featured-header'>
                                <span className='featured-header-shop'>
                                    <span className='seller-logo-container'>
                                        <span className='seller-logo'>
                                            <ImageLoader 
                                            imageUrl={seller.logo}
                                            placeholderBackgroundColor='#ffffff'
                                            />
                                        </span>
                                    </span>
                                    <span className='line-display margin-reset'>
                                        <h5 
                                        className='store-name'
                                        title={seller.name}
                                        >
                                            {seller.name}
                                        </h5>
                                        <div className='store-category'>{seller.category.name}</div>
                                    </span>
                                    {/* <span className='line-display margin-reset'>
                                        
                                    </span> */}
                                </span>
                                
                                
                                {/* {this.renderShopNowUrl(seller)} */}
                            </div>
                        </div>
                        <div className='row reset-row'>
                            {this.renderProduct(seller)}
                        </div>
                    </div>
                )
            })
            return sellerLayout;
        }
    }

	render() {
        const { sellers } = this.props;
        const infiniteSetting = sellers.length >= 3 ? true : false;
		const settings = {
			infinite: infiniteSetting,
			speed: 500,
			slidesToShow: 4,
            slidesToScroll: 1,
            swipeToSlide: true,
			responsive: [

				{
					breakpoint: 1440,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: false,
						dots: true
					}
				},
				{
					breakpoint: 979,
					settings: {
						slidesToShow: 2,
                        slidesToScroll: 1,
                        infinite: false,
					}
                },
                {
					breakpoint: 767,
					settings: {
                        slidesToShow: 2,
                        centerMode: true,
						centerPadding: "40px",
                        slidesToScroll: 1,
                        infinite: false,
					}
				},
				{
					breakpoint: 480,
					settings: {
                        slidesToShow: 1,
                        centerMode: true,
						centerPadding: "40px",
						slidesToScroll: 1
					}
				}
			]
        }
        
		return (
			<div className='special-offers-wrapper'>
				<div className='special-offers-title maximum-width'>Featured Sellers</div>
				<div className='special-offers-content maximum-width'>
					<div className='special-wrapper'>
						<Slider {...settings}>
                            {this.renderSeller(this.props.sellers)}
						</Slider>
					</div>
				</div>
			</div>
		);
	}
}

export default FeaturedSellers;
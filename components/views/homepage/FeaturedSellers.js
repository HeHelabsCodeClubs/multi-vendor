import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";
import ImageLoader from '../../reusable/ImageLoader';

class FeaturedSellers extends Component {

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
                        placeholderHeight={200}
                        placeholderBackgroundColor='#ffffff'
                        />
                        {/* <img src={product.image_url} /> */}
                    </a>
                );
            });
            return productLayout;
        }
    }

    renderSeller(sellers) {
        if (!_.isEmpty(sellers)) {
            const sellerLayout = sellers.map((seller) => {
                return (
                    <div className='featured-wrapper' key={seller.logo}>
                        <div className='row reset-row multi-vendor-seller-wrapper'>
                            
                            <div className='featured-header'>
                                <a href='' className='seller-logo-container'>
                                    <div className='seller-logo'>
                                        <ImageLoader 
                                        imageUrl={seller.logo}
                                        placeholderBackgroundColor='#ffffff'
                                        />
                                    </div>
                                </a>
                                <span className='line-display margin-reset'>
                                    <div className='store-name'>{seller.name}</div>
                                    <div className='store-category'>{seller.category.name}</div>
                                </span>
                                <span className='line-display seller-link margin-reset'>
                                    <a href=''>Shop now <span className='icon-Path-75'></span></a>
                                </span>
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
		const settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 3,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
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
import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";
import Product from '../../reusable/Product';

class MadeInRwanda extends Component {

	renderStores(stores) {
		if (!_.isEmpty(stores)) {
			const storesLayout = stores.map((store) => {
				return (
					<a target='_blank' href={store.store_url} key={store.store_url}>
						<div>
							<img src={store.logo} />
						</div>
					</a>
				)
			});
			return storesLayout;
		}
	}

	renderProducts(products) {
		const { cartShouldUpdate } = this.props;
        const productsLayout = products.map((product) => {
            return (
				<div key={product.slug}>
					<Product 
					product={product} 
					cartShouldUpdate={cartShouldUpdate}
					/>
				</div>
            );
        });
        return productsLayout;
    }

	render() {
        const settings = {
			infinite: false,
			speed: 500,
			rows:1,
			slidesToShow: 9,
			slidesToScroll: 2,
			swipeToSlide: true,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 8,
						slidesToScroll: 3,
						infinite: false,
						dots: true
					}
				},
				{
					breakpoint: 979,
					settings: {
						slidesToShow: 6,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 2
					}
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1
						
					}
				}
			]
		}

		var prodSettings = {
			infinite: false,
			speed: 500,
			slidesToShow: 6,
			slidesToScroll: 2,
			dots: false,
			responsive: [
				{
				breakpoint: 1600,
					settings: {
						slidesToShow: 5,
						slidesToScroll: 2,
						infinite: false,
						dots: false
					}
				},
				{
				breakpoint: 1440,
					settings: {
						slidesToShow: 4,
						slidesToScroll: 2,
						infinite: false,
						dots: false
					}
				},
				{
				breakpoint: 979,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 2,
						infinite: false,
						dots: false
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
						centerMode: true,
						//centerPadding: "0",
						slidesToScroll: 1
					}
				}
			]
		}
		const { stores, products } = this.props;

		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Made In Rwanda <span>Brands</span></div>
                <div className='stores-logos'>
					<div className='maximum-width'>
						<Slider {...settings}>
							{this.renderStores(stores)}
						</Slider>
					</div>
                </div>
				<div className='special-offers-wrapper'>
					<div className='special-offers-content maximum-width'>
						<div className='special-wrapper'>
							<Slider {...prodSettings}>
								{this.renderProducts(products)}
							</Slider>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default MadeInRwanda;
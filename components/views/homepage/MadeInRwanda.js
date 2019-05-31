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
        const productsLayout = products.map((product) => {
            return (
				<div key={product.slug}>
					<Product product={product} />
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
			slidesToShow: 4,
			slidesToScroll: 2,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 600,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 2
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

		var prodSettings = {
			infinite: false,
			speed: 500,
			rows: 1,
			slidesToShow: 4,
			slidesToScroll: 2,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 3,
						infinite: true,
						dots: true
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 1,
						centerMode: true,
						centerPadding: "40px",
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
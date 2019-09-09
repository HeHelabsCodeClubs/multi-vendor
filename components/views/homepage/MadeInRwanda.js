import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";
import Product from '../../reusable/Product';

class MadeInRwanda extends Component {
	renderProducts(products) {
		const { cartShouldUpdate } = this.props;
        const productsLayout = products.map((product) => {
            return (
				<div key={product.slug}>
					<Product 
					product={product} 
					cartShouldUpdate={cartShouldUpdate}
					openCart={this.props.openCart}
					/>
				</div>
            );
        });
        return productsLayout;
    }

	render() {

		var prodSettings = {
			infinite: false,
			speed: 500,
			slidesToShow: 2,
			slidesToScroll: 1,
			dots: false,
			centerMode: true,
			centerPadding: "15px 0 0",
			initialSlide: 1,
		}
		const { products } = this.props;

		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Made In Rwanda <span>Brands</span></div>
				<div className='special-offers-wrapper made-in-rwanda_products'>
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
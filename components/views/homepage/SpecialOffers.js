import _ from 'lodash';
import React, { Component } from 'react';
import SpecialProduct from '../../reusable/SpecialProduct';

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
		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Special Offers</div>
				<div className='made-in-rwanda-content maximum-width'>
					<div className='made-in-rwanda-wrapper'>
                        <div className='row rwanda-wrapper'>
                            {this.renderSpecialProducts(offers)}
                        </div>
					</div>
				</div>
			</div>
		);
	}
}

export default SpecialOffers;
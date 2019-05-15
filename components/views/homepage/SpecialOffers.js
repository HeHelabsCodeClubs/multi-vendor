import _ from 'lodash';
import React, { Component } from 'react';
import SpecialProduct from '../../reusable/SpecialProduct';

class SpecialOffers extends Component {

    renderProductIcons(specialOffer) {
		if (!_.isEmpty(specialOffer)) {
            if (specialOffer.is_popular === 1 && specialOffer.has_discount === 1) {
                return (
                    <div className='top-icons'>
                        <span className='hot'><span className='icon-Path-54'></span>hot</span>
                        <span className='discount'>{specialOffer.discount_percent}% OFF</span>
                    </div>
                );
            } else if (specialOffer.is_popular === 1 && specialOffer.has_discount === 0) {
                return (
                    <div className='top-icons'>
                        <span className='hot'><span className='icon-Path-54'></span>hot</span>
                    </div>
                );
            } else if (specialOffer.has_discount === 1 && specialOffer.is_popular === 0) {
                return (
                    <div className='top-icons'>
                        <span className='discount'>{specialOffer.discount_percent}% OFF</span>
                    </div>
                );
            } else {
                return null;
            }
		}
    }

    renderProducts(specialOffers) {
		if (!_.isEmpty(specialOffers)) {
			const specialOffersLayout = specialOffers.map((specialOffer) => {
				return (
					<div className='special-single-product'>
                        <SpecialProduct 
                            productIcons={this.renderProductIcons(specialOffer)}
                            specialPrice={specialOffer.special_price}
                            price={specialOffer.price}
                            productImage={specialOffer.image_url}
                        />
                    </div>
				)
			});
			return specialOffersLayout;
		}
	}
	render() {
		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Special Offers</div>
				<div className='made-in-rwanda-content maximum-width'>
					<div className='made-in-rwanda-wrapper'>
                        <div className='row rwanda-wrapper'>
                            {this.renderProducts(this.props.specialOffers)}
                        </div>
					</div>
				</div>
			</div>
		);
	}
}

export default SpecialOffers;
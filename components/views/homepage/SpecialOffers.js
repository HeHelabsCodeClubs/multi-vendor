import React, { Component } from 'react';
import SpecialProduct from '../../reusable/SpecialProduct';

class SpecialOffers extends Component {
	render() {
		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Special Offers</div>
				<div className='made-in-rwanda-content maximum-width'>
					<div className='made-in-rwanda-wrapper'>
                        <div className='row rwanda-wrapper'>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
							<div className='special-single-product'>
                                <SpecialProduct />
                            </div>
							<div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                            <div className='special-single-product'>
                                <SpecialProduct />
                            </div>
							<div className='special-single-product'>
                                <SpecialProduct />
                            </div>
                        </div>
					</div>
				</div>
			</div>
		);
	}
}

export default SpecialOffers;
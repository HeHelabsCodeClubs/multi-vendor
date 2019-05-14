import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";

class Promotion extends Component {

    renderPromotion() {
        return (
            <div>me</div>
        )
    }

	render() {
		var prodSettings = {
			infinite: true,
			speed: 500,
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

		return (
			<div className='made-in-rwanda-wrapper'>
				<div className='made-in-rwanda-title maximum-width'>Promotion and Events In the news - Gallery</div>
				<div className='special-offers-wrapper'>
					<div className='special-offers-content maximum-width'>
						<div className='special-wrapper'>
							<Slider {...prodSettings}>
								<div>
									{this.renderPromotion()}
								</div>
								<div>
									{this.renderPromotion()}
								</div>
								<div>
									{this.renderPromotion()}
								</div>
								<div>
									{this.renderPromotion()}
								</div>
								<div>
									{this.renderPromotion()}
								</div>
								<div>
									{this.renderPromotion()}
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Promotion;
import _ from 'lodash';
import React, { Component } from 'react';
import Slider from "react-slick";

class Promotion extends Component {

	render() {
		var settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 3,
			slidesToScroll: 1,
			dots: true,
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
						<div className='special-wrapper promotion-wrapper'>
							<Slider {...settings}>
								<div>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1557819406/multi-vendor/ad1_2x.png' />
								</div>
								<div>
									<img src='https://res.cloudinary.com/hehe/image/upload/v1557819405/multi-vendor/ad2_2x.png' />
								</div>
								<div>
									<img src='https://res.cloudinary.com/hehe/image/upload/v1557819404/multi-vendor/ad3_2x.png' />
								</div>
								<div>
									<img src='https://res.cloudinary.com/hehe/image/upload/v1557819406/multi-vendor/ad1_2x.png' />
								</div>
								<div>
									<img src='https://res.cloudinary.com/hehe/image/upload/v1557819405/multi-vendor/ad2_2x.png' />
								</div>
								<div>
									<img src='https://res.cloudinary.com/hehe/image/upload/v1557819404/multi-vendor/ad3_2x.png' />
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
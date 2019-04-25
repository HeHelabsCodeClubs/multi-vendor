import React from "react";
import Slider from "react-slick";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/homepage.scss';

class Homepage extends React.Component {
	render() {
		var settings = {
			infinite: true,
			speed: 2000,
			fade: true,
			cssEase: 'linear'
		};

		var catSettings = {
			dots: true,
			infinite: true,
			speed: 1000,
			slidesToShow: 1,
			centerMode: true,
			variableWidth: true
		}
		return (
			<Global>
				<div className='main-banners'>
					<Slider {...settings}>
						<div>
							<img src='https://res.cloudinary.com/hehe/image/upload/v1556198500/multi-vendor/Banner-1_2x.png' />
						</div>
						<div>
							<img src='https://res.cloudinary.com/hehe/image/upload/v1556198500/multi-vendor/Banner_2x.png' />
						</div>
					</Slider>
				</div>
				<div className='categories-scroller'>
					<Slider {...catSettings}>
						<div>
							<div className='cat-icon icon-Art-ico'></div>
							<div className='cat-name'>All categories</div>
						</div>
						<div>
							<div className='cat-icon icon-Elecronics-ico'></div>
							<div className='cat-name'>Electronics</div>
						</div>
						<div>
							<div className='cat-icon icon-Groceries-ico'></div>
							<div className='cat-name'>Groceries</div>
						</div>
						<div>
							<div className='cat-icon icon-KITCHENWARE-ICO'></div>
							<div className='cat-name'>Home appliences</div>
						</div>
						<div>
							<div className='cat-icon icon-Coametics-ico'></div>
							<div className='cat-name'>Cosmetics & Beauty</div>
						</div>
						<div>
							<div className='cat-icon icon-LITTERATURE-ICO'></div>
							<div className='cat-name'>Kids & Babies</div>
						</div>
						<div>
							<div className='cat-icon icon-LITTERATURE-ICO'></div>
							<div className='cat-name'>Literature</div>
						</div>
						<div>
							<div className='cat-icon icon-Fashion-ico'></div>
							<div className='cat-name'>Clothing & Fashion</div>
						</div>
					</Slider>
				</div>
			</Global>
		);
	}
}

export default Homepage;
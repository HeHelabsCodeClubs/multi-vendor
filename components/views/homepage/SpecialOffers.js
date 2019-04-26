import Link from 'next/link'; 
import Slider from "react-slick";
import Product from '../../reusable/Product';

class SpecialOffers extends React.Component {
	render() {
        var settings = {
			infinite: true,
			speed: 500,
			slidesToShow: 4,
  			slidesToScroll: 2
		}
		return (
			<div className='special-offers-wrapper'>
                <div className='special-offers-title maximum-width'>Special Offers</div>
                <div className='special-offers-content maximum-width'>
                    <div className='special-wrapper'>
                        <Slider {...settings}>
							<div>
								<Product />
							</div>
                            <div>
								<Product />
							</div>
                            <div>
								<Product />
							</div>
                            <div>
								<Product />
							</div>
						</Slider> 
                    </div>
                </div>
            </div>
		);
	}
}

export default SpecialOffers;
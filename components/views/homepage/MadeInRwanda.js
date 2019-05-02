import Slider from "react-slick";
import Product from '../../reusable/Product';

class MadeInRwanda extends React.Component {
	render() {
        var settings = {
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
				<div className='made-in-rwanda-title maximum-width'>Made In Rwanda <span>Brands</span></div>
                <div className='stores-logos'>
                    <Slider {...settings}>
                        <div>
                            <img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy.png' />
                        </div>
                        <div>
                            <img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/LOGO_copy_2.png' />
                        </div>
                        <div>
                            <img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath.png' />
                        </div>
                        <div>
                            <img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/Group_7.png' />
                        </div>
                        <div>
                            <img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy_5.png' />
                        </div>
                    </Slider>
                </div>
				<div className='made-in-rwanda-content maximum-width'>
					<div className='made-in-rwanda-wrapper'>
                        <div className='row rwanda-wrapper'>
                            <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                                <Product />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                                <Product />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                                <Product />
                            </div>
                            <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                                <Product />
                            </div>
                        </div>
					</div>
				</div>
			</div>
		);
	}
}

export default MadeInRwanda;
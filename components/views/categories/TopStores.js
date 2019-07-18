import Link from 'next/link';
import Slider from "react-slick";

class TopStores extends React.Component {

	render() {
		var settings = {
			infinite: true,
            speed: 1000,
			slidesToShow: 6,
			slidesToScroll: 2,
			swipeToSlide: true,
            responsive: [
				{
					breakpoint: 1440,
				   settings: {
					   slidesToShow: 5,
				   }
			   	},
				{
				 	breakpoint: 1024,
					settings: {
						slidesToShow: 5,
					}
                },
                {
                    breakpoint: 979,
                   settings: {
                       slidesToShow: 4,
                   }
               }
			]
		};
		return (
			<div className='multi-vendor-stores-wrapper'>
				<div className='col-lg-1 col-md-2 col-sm-2 line-display stores-title'>Stores: </div>
				<div className="col-lg-10 col-md-9 col-sm-9 stores-wrapper">
					<Slider {...settings}>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/LOGO_copy_2.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/Group_7.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy_5.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/LOGO_copy_2.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/Group_7.png' />
								</div>
							</a>
						</Link>
						<Link href='#'>
							<a>
								<div className='line-display single-store'>
									<img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy_5.png' />
								</div>
							</a>
						</Link>
					</Slider>
				</div>
		  	</div>
		);
	  }

}

export default TopStores;
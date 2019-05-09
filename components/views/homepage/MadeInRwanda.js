import Slider from "react-slick";
import Product from '../../reusable/Product';

class MadeInRwanda extends React.Component {

	renderStores(stores) {
		const storesLayout = stores.map((store) => {
			return (
				<a target='_blank' href={store.store_url}>
					<div>
						<img src={store.logo} />
					</div>
				</a>
			)
		});
		return storesLayout;
	}

	render() {
        const settings = {
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
						{this.renderStores(this.props.stores)}
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
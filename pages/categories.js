import Slider from "react-slick";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/categories.scss';

class Categories extends React.Component {
	render() {
		var settings = {
			infinite: true,
            speed: 500,
			slidesToShow: 6,
  			slidesToScroll: 7
		};
		return (
			<Global>
				<div className='multi-vendor-categories'>
                    <div className='maximum-width'>
                        <div className='multi-vendor-categories-wrapper'>
                            <Slider {...settings}>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-Categories-ico'></span>
                                        All Categories
                                    </div>
                                </div>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-Elecronics-ico'></span>
                                        Electronics
                                    </div>
                                </div>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-Groceries-ico'></span>
                                        Groceries
                                    </div>
                                </div>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-LITTERATURE-ICO'></span>
                                        Home Appliences
                                    </div>
                                </div>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-Coametics-ico'></span>
                                        Cosmetics & Beauty
                                    </div>
                                </div>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-Categories-ico'></span>
                                        Kids & Hobies
                                    </div>
                                </div>
                                <div>
                                    <div className='single-category'>
                                        <span className='cat-icon icon-Fashion-ico'></span>
                                        Clothing
                                    </div>
                                </div>
                            </Slider>
                        </div>
                    </div>
				</div>
			</Global>
		);
	}
}

export default Categories;
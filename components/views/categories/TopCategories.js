import Slider from "react-slick";
import Link from 'next/link';

class TopCategories extends React.Component {
	render() {
        var settings = {
			infinite: true,
            speed: 500,
			slidesToShow: 6,
  			slidesToScroll: 7
		};
		return (
			<div className='maximum-width'>
                <div className='multi-vendor-categories-wrapper'>
                    <Slider {...settings}>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-Categories-ico'></span>
                                    All Categories
                                </div>
                            </a>
                        </Link>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-Elecronics-ico'></span>
                                    Electronics
                                </div>
                            </a>
                        </Link>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-Groceries-ico'></span>
                                    Groceries
                                </div>
                            </a>
                        </Link>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-LITTERATURE-ICO'></span>
                                    Home Appliences
                                </div>
                            </a>
                        </Link>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-Coametics-ico'></span>
                                    Cosmetics & Beauty
                                </div>
                            </a>
                        </Link>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-Categories-ico'></span>
                                    Kids & Hobies
                                </div>
                            </a>
                        </Link>
                        <Link>
                            <a>
                                <div className='single-category'>
                                    <span className='cat-icon icon-Fashion-ico'></span>
                                    Clothing
                                </div>
                            </a>
                        </Link>
                    </Slider>
                </div>
            </div>
		);
	}
}

export default TopCategories;
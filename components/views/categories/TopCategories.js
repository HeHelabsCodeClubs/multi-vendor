import Slider from "react-slick";
import Link from 'next/link';
import Router from 'next/router';
import LimitString from '../../../helpers/limit_string';

class TopCategories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: []
        };
        this.renderCategories = this.renderCategories.bind(this);
    }
    componentDidMount() {
        const { categories } = this.props;
        this.setState({
            categories: categories
        });
    }

    componentWillReceiveProps(nextProps) {
        const { categories } = nextProps;
        if (categories) {
            this.setState({
                categories
            });
        }
    }

    renderCategories() {
        const { categories } = this.state;
        if (categories) {
            const categoriesLayout = categories.map((category) => {
                const { slug } = category;
                const activeClassName = (Router.router.query.category_slug === slug) ? 'is-active' : '';
                return (
                    // <Link
                    // href={`/categories?category_slug=${slug}`}
                    // as={`/categories/${slug}`}
                    // >
                        <a
                        href={`/categories/${slug}`}
                        key={slug}
                        title={category.name}
                        className={`single-category ${activeClassName}`}>
                            <img src={category.icon_url} />
                            <span
                            title={category.name}
                            >{LimitString(category.name, 20)}</span>
                        </a>
                    // </Link>
                );
            });
            return categoriesLayout;
        }

        return null;
    }
	render() {
        var settings = {
			infinite: false,
            speed: 1000,
			slidesToShow: 8,
            slidesToScroll: 2,
            swipeToSlide: true,
            responsive: [
                {
                    breakpoint: 1600,
                    settings: {
                        slidesToShow: 7,
                        infinite: false,
                    }
                },
                {
                    breakpoint: 1440,
                    settings: {
                        slidesToShow: 6,
                        infinite: false,
                    }
                },
				{
				 	breakpoint: 1024,
					settings: {
                        slidesToShow: 5,
                        infinite: false,
					}
                },
                {
                    breakpoint: 979,
                    settings: {
                        slidesToShow: 4,
                        infinite: false,
                    }
               }
			]
		};
		return (
			<div className='maximum-width cats'>
                <div className='multi-vendor-categories-wrapper'>
                    <Slider {...settings}>
                       {this.renderCategories()}
                    </Slider>
                </div>
            </div>
		);
	}
}

export default TopCategories;
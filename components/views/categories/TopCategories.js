import Slider from "react-slick";
import Link from 'next/link';
import Router from 'next/router';

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

    renderCategories() {
        const { categories } = this.state;
        if (categories) {
            const categoriesLayout = categories.map((category) => {
                const iconClassName = category.icon_class_name;
                const { slug } = category;
                const activeClassName = (Router.router.query.category_slug === slug) ? 'is-active' : '';
                return (
                    <a 
                    key={slug}
                    href={`/categories/${slug}`}
                    className={`single-category ${activeClassName}`}>
                        <i className={`cat-icon ${iconClassName}`} />
                        {category.name}
                    </a>
                );
            });
            return categoriesLayout;
        }

        return null;
    }
	render() {
        var settings = {
			infinite: true,
            speed: 1000,
			slidesToShow: 6,
  			slidesToScroll: 2
		};
		return (
			<div className='maximum-width'>
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
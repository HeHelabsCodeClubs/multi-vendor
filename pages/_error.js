import React from 'react';
import Notifications from 'react-notify-toast';
import Header from '../components/reusable/header/Header';
import '../assets/styles/layouts/header.scss';
import '../assets/styles/layouts/error.scss';
import { API_URL } from '../config';

class Error extends React.Component {
	constructor(props) {
        super(props);
        this.state = {
            updateCart: false
        };
	}
	
	static async getInitialProps({ query }) {
		const { category_slug, sub_cat_slug, sub_last_cat_slug } = query;
		const res = await fetch(`${API_URL}/categories/${category_slug}/parent_page`);
        const response = await res.json()
		const { 
            data
        } = response;
        return {
            categoriesData: data.parent_categories
        };
    }

	componentWillReceiveProps(nextProps) {
        const { updateCart } = nextProps;
        if (updateCart) {
            this.setState({
                updateCart: true
            });
        }
	}
	
	renderCategories(categories) {
		const categoryLayout = categories.map((category) => {
			return (
				<a href=''>
					<span className='category-item'>
						<img src={category.icon_url} />
						{category.name}
					</span>
				</a>
			);
		});
		return categoryLayout;
	}

	render() {
		const { categoriesData } = this.props;
		return (
			<div className='site-wrapper error-page-wrapper'>
				<Notifications />
                <Header 
				updateCart={this.state.updateCart}
                />
				<div className='error-wrapper maximum-width'>
					<div className='row content-row'>
						<div className='col-lg-12 col-md-12 col-sm-12 col-12'>
							<div className='col-lg-6 col-md-6 col-sm-6 col-12 left-content col-reset'>
								<div>
									<h2>Something is wrong here...</h2>
									<p>We can't find the page you are looking for. <a href='/'>Head back to homepage</a></p>
									<a href='/'><button>Go to Homepage</button></a>
								</div>
							</div>
							<div className='col-lg-6 col-md-6 col-sm-6 col-12 right-content col-reset'>
								<img src='https://res.cloudinary.com/hehe/image/upload/v1563446167/multi-vendor/Group_1155.svg' />
							</div>
						</div>
					</div>
					<div className='row reset-row category-row'>
						<div className='col-lg-12 col-md-12 col-sm-12 col-12'>
							<div className='category-title'><p>Or Shop More:</p></div>
						</div>
						<div className='col-lg-12 col-md-12 col-sm-12 col-12'>
							<div className='category-wrapper'>
								{this.renderCategories(categoriesData)}
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

export default Error;
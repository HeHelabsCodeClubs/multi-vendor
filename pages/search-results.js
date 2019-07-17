import fetch from 'isomorphic-unfetch';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/categories.scss';
import '../assets/styles/layouts/SearchResults.scss';
import TopCategories from '../components/views/categories/TopCategories';
import SidemenuCategories from '../components/views/categories/SidemenuCategories';
import MainContent from '../components/views/categories/MainContent';
import Product from '../components/reusable/Product';
import { API_URL } from '../config';
import Breadcrumb from '../components/reusable/Breadcrumb';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedProducts: [],
            paginationData: {},
            showLoader: false,
            updateCart: false
        };
    }
    static async getInitialProps({ query }) {
        const { category_slug, sub_cat_slug, sub_last_cat_slug } = query;
        let remoteUrl = `${API_URL}/categories/${category_slug}/parent_page`;
        if (category_slug !== undefined && sub_cat_slug !== undefined && sub_last_cat_slug === undefined) {
            remoteUrl = `${remoteUrl}?sub_cats=${sub_cat_slug}`
        }

        if (category_slug !== undefined && sub_cat_slug !== undefined && sub_last_cat_slug !== undefined) {
            remoteUrl = `${remoteUrl}?sub_cats=${sub_cat_slug},${sub_last_cat_slug}`;
        }
		const res = await fetch(remoteUrl);
        const response = await res.json()
		const { 
            data,
            meta
        } = response;
        return {
            categoriesData: data.parent_categories
        };
    }

	render() {
        const { 
            categoriesData
        } = this.props;
		return (
			<Global
            updateCart={this.state.updateCart}
            >
				<div className='multi-vendor-categories'>
                    <TopCategories 
                    categories={categoriesData}
                    />
				</div>
                <div className='categories-content'>
                    <div className='maximum-width'>
                        <div className='row reset-row'>
                            <div className='search-results-title'>
                                <h4>Search results for: <span className='item'>Gold <span className="icon-Path-58 close-icon" /></span></h4>
                            </div>
                        </div>
                        <div className='search-results-breadcrumb'>
                            <Breadcrumb>
                                <a href="/" className="breadcrumb-link">Home</a>
                                    <span> / </span>
                                <a href="/signin" className="breadcrumb-current">Signin</a>
                            </Breadcrumb>
                        </div>
                        <div className='row reset-row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12 col-reset main-content-wrapper search-content-wrapper'>
                                <div className='main-content'>
                                    <div>
                                        <div class="row reset-row">
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                                                <Product />
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                                                <Product />
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                                                <Product />
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                                                <Product />
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                                                <Product />
                                            </div>
                                            <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                                                <Product />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</Global>
		);
	}
}

export default SearchResults;
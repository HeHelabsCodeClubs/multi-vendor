import fetch from 'isomorphic-unfetch';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/categories.scss';
import TopCategories from '../components/views/categories/TopCategories';
import SidemenuCategories from '../components/views/categories/SidemenuCategories';
import MainContent from '../components/views/categories/MainContent';
import { API_URL } from '../config';

class Categories extends React.Component {
    static async getInitialProps({ query }) {
        // console.log(query.category_id);
		const res = await fetch(`${API_URL}/categories/${query.category_slug}/parent_page`)
        const response = await res.json()
		const { 
			data
        } = response;
        console.log('full_url', `${API_URL}/categories/${query.category_slug}/parent_page`);
        return {
            parentCategorySlug: query.category_slug,
            categoriesData: data.parent_categories,
            subCategoriesData: data.sub_categories,
            productsData: data.products
        };
    }
	render() {
        const { 
            categoriesData,
            subCategoriesData,
            productsData,
            parentCategorySlug
        } = this.props;
		return (
			<Global>
				<div className='multi-vendor-categories'>
                    <TopCategories 
                    categories={categoriesData}
                    />
				</div>
                <div className='categories-content'>
                    <div className='maximum-width'>
                        <div className='row reset-row'>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                <SidemenuCategories 
                                subCategories={subCategoriesData}
                                parentCategorySlug={parentCategorySlug}
                                />
                            </div>
                            <div className='col-lg-9 col-md-9 col-sm-9 col-12 col-reset main-content-wrapper'>
                                <MainContent 
                                products={productsData}
                                />
                            </div>
                        </div>
                    </div>
                </div>
			</Global>
		);
	}
}

export default Categories;
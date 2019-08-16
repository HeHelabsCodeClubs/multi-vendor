import fetch from 'isomorphic-unfetch';
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/categories.scss';
import TopCategories from '../components/views/categories/TopCategories';
import SidemenuCategories from '../components/views/categories/SidemenuCategories';
import MainContent from '../components/views/categories/MainContent';
import { API_URL } from '../config';
import TopStores from '../components/views/categories/TopStores';

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updatedProducts: [],
            products: [],
            paginationData: {},
            showLoader: false,
            updateCart: false,
            activeParentCategory: '',
            activeSubCategory: '',
            activeSubLastCategory: '',
            ids: []
        };
        this.cartShouldUpdate = this.cartShouldUpdate.bind(this);
        this.updateProductsData = this.updateProductsData.bind(this);
        this.handleDisplayLoader = this.handleDisplayLoader.bind(this);
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
            parentCategorySlug: query.category_slug,
            categoriesData: data.parent_categories,
            subCategoriesData: data.sub_categories,
            productsData: data.products,
            sellersData: data.sellers,
            metaProductsData: meta.pagination_data,
            activeParentCategory: category_slug,
            activeSubCategory: sub_cat_slug,
            activeSubLastCategory: sub_last_cat_slug
        };
    }

    componentDidMount() {
        const { activeParentCategory, activeSubCategory, activeSubLastCategory, categoriesData, subCategoriesData, productsData } = this.props;
        if (activeParentCategory !== '') {
            let parentCategoryName = '';
            let subCategoryName = '';
            categoriesData.forEach(category => {
                if (category.slug === activeParentCategory) {
                    parentCategoryName = category.name;
                }
            });
            subCategoriesData.forEach(subCategory => {
                if (subCategory.slug === activeSubCategory) {
                    subCategoryName = subCategory.name;
                }
            });
            this.setState({
                activeParentCategory: parentCategoryName,
                activeSubCategory: subCategoryName
            });
        }

        this.setState({
            products: productsData
        });
    }

    cartShouldUpdate() {
		this.setState({
			updateCart: true
		});
	}

    updateProductsData(data) {
        this.setState({
            products: data.products,
            paginationData: data.meta
        });
    }

    handleDisplayLoader(callback) {
        const { showLoader } = this.state;
        if (showLoader) {
            this.setState({
                showLoader: false
            }, () => {
                if (callback) {
                    callback();
                }
            });
        } else {
            this.setState({
                showLoader: true
            }, () => {
                if (callback) {
                    callback();
                }
            });
        }
    }
 
	render() {
        const { 
            categoriesData,
            subCategoriesData,
            productsData,
            parentCategorySlug,
            metaProductsData,
            sellersData
        } = this.props;
        const { 
            updatedProducts,
            showLoader,
            updateCart,
            activeParentCategory,
            activeSubCategory,
            products,
            paginationData,
            ids
        } = this.state;
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
                            <div className='col-lg-3 col-md-4 col-sm-4 col-12 side-category__grid'>
                                <SidemenuCategories 
                                subCategories={subCategoriesData}
                                parentCategorySlug={parentCategorySlug}
                                updateProducts={this.updateProductsData}
                                displayLoader={this.handleDisplayLoader}
                                activeParentCategory={activeParentCategory}
                                activeSubCategory={activeSubCategory}
                                />
                            </div>
                            <div className='col-lg-9 col-md-8 col-sm-8 col-12 col-reset main-content-wrapper'>
                                <TopStores 
                                sellers={sellersData} 
                                parentCategorySlug={parentCategorySlug}
                                displayLoader={this.handleDisplayLoader}
                                updateProducts={this.updateProductsData}
                                sellersIds={ids}
                                paginationData={paginationData}
                                />
                                <MainContent 
                                products={products}
                                sellersIds={ids}
                                activeParentCategory={activeParentCategory}
                                activeSubCategory={activeSubCategory}
                                paginationData={paginationData}
                                showLoader={showLoader}
                                cartShouldUpdate={this.cartShouldUpdate}
                                metaProductsData={metaProductsData}
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
import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Router from 'next/router';
import Product from '../../reusable/Product';
import Loader from '../../reusable/Loader';
import { API_URL } from '../../../config';
import Breadcrumb from '../../reusable/Breadcrumb';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            firstTimeLoad: true,
            showLoader: false,
            currentPage: 1,
            lastPage: 1
        };
        this.renderProducts = this.renderProducts.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.updateProductsOnPagination = this.updateProductsOnPagination.bind(this);
    }

    componentDidMount() {
        const { products, metaProductsData, paginationData } = this.props;
        if (_.isEmpty(paginationData)) {
            this.setState({
                products,
                firstTimeLoad: false,
                lastPage: metaProductsData.last_page,
                currentPage: metaProductsData.current_page
            });
        } else {
            this.setState({
                products,
                firstTimeLoad: false,
                lastPage: paginationData.last_page,
                currentPage: paginationData.current_page
            });
        }
        
    }

    componentWillReceiveProps(nextProps) {
        const { products, showLoader, metaProductsData } = nextProps;
        if (this.state.products != products) {
            this.setState({
                products: products
            });
        }

        if (this.state.showLoader !== showLoader) {
            this.setState({
                currentPage: 1, // reset pagination
                lastPage: 1,// reset pagination
                showLoader: showLoader
            });
        }
        if (metaProductsData) {
            const { current_page, last_page } = metaProductsData;
            if (current_page && last_page) {
                if (current_page !== this.state.currentPage || last_page !== this.state.lastPage) {
                    this.setState({
                        currentPage: current_page,
                        lastPage: last_page
                    });
                }
            }
        }
    }

    renderProducts() {
        const { products, showLoader} = this.state;
        const { cartShouldUpdate } = this.props;
        if (showLoader) {
            return (
               <Loader />
            );
        }

        if (products.length !== 0) {
            const productsLayout = products.map((product, index) => {
                return (
                    <div 
                    key={`${product.slug}-${index}`}
                    className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'
                    >
                        <Product 
                        product={product} 
                        cartShouldUpdate={cartShouldUpdate}
                        />
                    </div>
                );
            });
            return (
                <div>
                    <div className="row reset-row">
                        {productsLayout}
                    </div>
                </div>
            ) 
        }

        if (products.length === 0) {
            return (
                <div className="empty-category">
                    <p>
                        We have no product in this category
                    </p>
                </div>
            );
        }
        
    }

    async loadMoreProducts() {
        const { currentPage } = this.state;
        const { sellersIds } = this.props;
        const { router: { query } } = Router;

        const ids = sellersIds.toString();

        const { category_slug, sub_cat_slug, sub_last_cat_slug } = query;
        
        let remoteUrl = `${API_URL}/categories/${category_slug}/parent_page`;
        
        if (category_slug !== undefined && sub_cat_slug !== undefined && sub_last_cat_slug === undefined) {
            remoteUrl = `${API_URL}/categories/${sub_cat_slug}/products`
        } 

        if (category_slug !== undefined && sub_cat_slug !== undefined && sub_last_cat_slug !== undefined) {
            remoteUrl = `${API_URL}/categories/${sub_last_cat_slug}/products`;
        }

        if (category_slug !== undefined && sellersIds.length !== 0) {
            remoteUrl = `${API_URL}/categories/${category_slug}/products/sellers?filter=${ids}`;
        }

        // const remoteUrl = `${API_URL}`
        const newPage = Number(currentPage) + 1;
        remoteUrl = sellersIds.length !== 0 ?
        `${API_URL}/categories/${category_slug}/products/sellers?filter=${ids}&page=${newPage}` : 
        `${remoteUrl}?page=${newPage}`
        const res = await fetch(remoteUrl);
        const response = await res.json();
        const { data, meta } = response;
        
        if (data.products) {
            this.updateProductsOnPagination(data.products, meta);
            return;
        } else {
            this.updateProductsOnPagination(data, meta);
        }
    }

    updateProductsOnPagination(data, meta) {
        const { products, currentPage } = this.state;
        const newProducts = products;
        const newPage = Number(currentPage) + 1;
        data.map((product) => {
            newProducts.push(product);
        });
        this.setState({
            products: newProducts,
            currentPage: newPage,
            lastPage: Number(meta.pagination_data.last_page)
        });
    }

    renderBreadCrumb() {
        const { activeParentCategory, activeSubCategory } = this.props;

        return (
            <Breadcrumb>
                <a href="/" className="breadcrumb-link">Home</a>
                    <span> / </span>
                <a href="/" className="breadcrumb-link">Categories</a>
                    <span> / </span>
                <a href="" className="breadcrumb-link">{activeParentCategory}</a>
                    <span> / </span>
                <a href="" className="breadcrumb-current">{activeSubCategory}</a>
            </Breadcrumb>
        )
    }
 
	render() {
        const { lastPage, currentPage, products, showLoader } = this.state;
        const { paginationData } = this.props;
        const lPage = (_.isEmpty(paginationData)) ? lastPage : paginationData.last_page;
        const cPage = (_.isEmpty(paginationData)) ? currentPage : paginationData.current_page;
        const hasMore = ((Number(cPage) < Number(lPage)) && !showLoader ) ? true : false;
		return (
			<InfiniteScroll
            dataLength={products.length}
            next={this.loadMoreProducts}
            hasMore={hasMore}
            loader={<Loader />}
            >
                <div className='main-content'>
                    {this.renderBreadCrumb()}
                    {this.renderProducts()}
                </div>
            </InfiniteScroll>
		);
	}
}

export default MainContent;
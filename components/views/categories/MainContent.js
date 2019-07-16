import InfiniteScroll from 'react-infinite-scroll-component';
import Router from 'next/router';
import Product from '../../reusable/Product';
import Loader from '../../reusable/Loader';
import { API_URL } from '../../../config';
import isObjectEmpty from '../../../helpers/is_object_empty';


class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            firstTimeLoad: true,
            showLoader: false,
            currentPage: 1,
            lastPage: 0
        };
        this.renderProducts = this.renderProducts.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.updateProductsOnPagination = this.updateProductsOnPagination.bind(this);
    }

    componentDidMount() {
        const { products, metaProductsData } = this.props;
        this.setState({
            products,
            firstTimeLoad: false,
            lastPage: metaProductsData.last_page,
            currentPage: metaProductsData.current_page
        });
    }

    componentWillReceiveProps(nextProps) {
        const { updatedProducts, showLoader, paginationData } = nextProps;
        const { firstTimeLoad, products } = this.state;
        if (!firstTimeLoad) {
            if (updatedProducts.length !== products.length) {
                if (updatedProducts.length !== 0) {
                    if (!isObjectEmpty(paginationData)) {
                        this.setState({
                            products: updatedProducts,
                            currentPage: paginationData.current_page,
                            lastPage: paginationData.last_page
                        });
                    } else {
                        this.setState({
                            products: updatedProducts
                        });
                    }
                }
            }

            if (showLoader !== this.state.showLoader) {
                this.setState({
                    showLoader: showLoader
                });
            }
        }
    }

    renderProducts() {
        const { products, showLoader } = this.state;
        const { cartShouldUpdate } = this.props;
        if (showLoader) {
            return (
               <Loader />
            );
        }

        if (products.length !== 0) {
            const productsLayout = products.map((product) => {
                return (
                    <div 
                    key={product.slug}
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
                    <div class="row reset-row">
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

    handlePagesClick () {

    }

    async loadMoreProducts() {
        const { currentPage } = this.state;
        const { router: { query } } = Router;
        const { category_slug, sub_cat_slug, sub_last_cat_slug } = query;
        let remoteUrl = `${API_URL}/categories/${category_slug}/parent_page`;

        if (category_slug !== undefined && sub_cat_slug !== undefined && sub_last_cat_slug === undefined) {
            remoteUrl = `${API_URL}/categories/${sub_cat_slug}/products`
        } 

        if (category_slug !== undefined && sub_cat_slug !== undefined && sub_last_cat_slug !== undefined) {
            remoteUrl = `${API_URL}/categories/${sub_last_cat_slug}/products`;
        }

        // const remoteUrl = `${API_URL}`
        const newPage = Number(currentPage) + 1;
        remoteUrl = `${remoteUrl}?page=${newPage}`
        const res = await fetch(remoteUrl);
        const response = await res.json();
        const { data } = response;
        if (data.products) {
            this.updateProductsOnPagination(data.products);
            return;
        } else {
            this.updateProductsOnPagination(data);
        }
    }

    updateProductsOnPagination(data) {
        const { products, currentPage } = this.state;
        const newProducts = products;
        const newPage = Number(currentPage) + 1;
        data.map((product) => {
            newProducts.push(product);
        });
        this.setState({
            products: newProducts,
            currentPage: newPage
        });
    }
 
	render() {
        const { lastPage, currentPage, products } = this.state;
        const hasMore = (Number(currentPage) < Number(lastPage)) ? true : false;
		return (
			<InfiniteScroll
            dataLength={products.length}
            next={this.loadMoreProducts}
            hasMore={hasMore}
            loader={<Loader />}
            >
                {/* <div>
                    <TopStores />
                </div> */}
                <div className='main-content'>
                   {this.renderProducts()}
                </div>
            </InfiniteScroll>
		);
	}
}

export default MainContent;
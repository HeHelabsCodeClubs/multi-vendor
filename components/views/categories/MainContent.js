import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroll-component';
import Router from 'next/router';
import Product from '../../reusable/Product';
import Loader from '../../reusable/Loader';
import { API_URL } from '../../../config';
import Breadcrumb from '../../reusable/Breadcrumb';
import TopStores from './TopStores';
import StoreItem from './StoreItem';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            firstTimeLoad: true,
            showLoader: false,
            currentPage: 1,
            lastPage: 1,
            loadInitiatedBySellerFilter: false,
            pData: {},
            sellers: [],
            sellersIds: []
        };
        this.renderProducts = this.renderProducts.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.updateProductsOnPagination = this.updateProductsOnPagination.bind(this);
        this.handleDisplayLoader = this.handleDisplayLoader.bind(this);
        this.renderSellers = this.renderSellers.bind(this);
        this.updateSellerIds = this.updateSellerIds.bind(this);
    }

    componentDidMount() {
        const { products, metaProductsData } = this.props;
        this.setState({
            products,
            firstTimeLoad: false,
            lastPage: metaProductsData.last_page,
            currentPage: metaProductsData.current_page,
        });
        
    }

    componentWillReceiveProps(nextProps) {
        const { products, showLoader, metaProductsData, sellers } = nextProps;
        if (this.state.products !== products) {
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

        if (sellers.length !== 0) {
            this.setState({
                sellers
            });
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
                        openCart={this.props.openCart}
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
        const { 
            currentPage, 
            sellersIds, 
            showLoader, 
            hasMore,
            loadInitiatedBySellerFilter 
        } = this.state;

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
        const newPage = loadInitiatedBySellerFilter ? currentPage : Number(currentPage) + 1;
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
        const { products, currentPage, showLoader, hasMore, loadInitiatedBySellerFilter } = this.state;
        const newPage = Number(currentPage) + 1;
        let newProducts = products;
        if (!loadInitiatedBySellerFilter) {
            console.log('np', newProducts);
            console.log('response', data);
            data.map((product) => {
                newProducts.push(product);
            });
        } else {
            newProducts = data;
        }
        
        this.setState({
            products: newProducts,
            currentPage: newPage,
            lastPage: Number(meta.pagination_data.last_page),
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
    handleDisplayLoader() {
        this.setState({
            showLoader: true
        });
    }

    updateSellerIds(seller_id, action) {
        const { sellersIds, currentPage, lastPage } = this.state;
        switch(action) {
            case 'add':
                const existingSellerIds = sellersIds;
                existingSellerIds.push(seller_id);
                this.setState({
                    sellersIds: existingSellerIds,
                    currentPage: 1,
                    lastPage: 1,
                    loadInitiatedBySellerFilter: true
                }, () => {
                    this.loadMoreProducts();
                });
                return;
            case 'remove':
                const updatedSellersIds = [];
                for(let i = 0; i < sellersIds.length; i++) {
                    if (sellersIds[i] !== seller_id) {
                        updatedSellersIds.push(sellersIds[i]);
                    }
                }
                this.setState({
                    sellersIds: updatedSellersIds,
                    currentPage: 1,
                    lastPage: 1,
                    loadInitiatedBySellerFilter: true
                }, () => {
                    this.loadMoreProducts();
                });
                return;
            default: 
            /**
             * Do nothing if action is not recognized
             * 
             */
        }
    }

    renderSellers() {
        const { sellers } = this.state;
        if (sellers.length !== 0) {
            const sellersList = sellers.map((seller) => {
                return (
                    <StoreItem 
                    key={seller.seller_id}
                    seller={seller}
                    updateActiveSellerRecord={this.updateSellerIds}
                    />
                );
            });

            return sellersList;
        }

        return <Loader />;
    }

    
 
	render() {
        const { lastPage, currentPage, products, showLoader, pData } = this.state;
        const { paginationData, sellers, activeParentCategory } = this.props;
        const emptyPaginationDataOnScroll = (_.isEmpty(pData)) ? true : false;
        const pagData = emptyPaginationDataOnScroll === true ? paginationData : pData;
        const lPage = (_.isEmpty(pagData)) ? lastPage : pagData.last_page;
        const cPage = (_.isEmpty(pagData)) ? currentPage : pagData.current_page;
        const hasMore = ((Number(cPage) < Number(lPage)) && !showLoader ) ? true : false;
		return (
            <div>
                <div className='multi-vendor-stores-wrapper'>
                    <div className='stores-wrapper-wrapper'>
                        <div className='col-lg-1 col-md-2 col-sm-2 col-reset line-display stores-title'>Stores: </div>
                        <div className="col-lg-10 col-md-9 col-sm-9 col-reset stores-wrapper">
                            {this.renderSellers()}
                        </div>
                        {/* {visible < sellers.length &&
                            <button onClick={this.loadMore} type="button" className="load-more">More +</button>
                        } */}
                    </div>
                </div>
                <InfiniteScroll
                dataLength={products.length}
                next={this.loadMoreProducts}
                hasMore={hasMore}
                scrollThreshold={0.4}
                loader={<Loader />}
                >
                    <div className='main-content'>
                        {this.renderProducts()}
                    </div>
                </InfiniteScroll>
            </div>
		);
	}
}

export default MainContent;
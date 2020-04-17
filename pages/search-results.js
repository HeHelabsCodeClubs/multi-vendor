import fetch from 'isomorphic-unfetch';
import InfiniteScroll from 'react-infinite-scroll-component';
import Router from 'next/router';
import Global from '../components/reusable/Global';
import Product from '../components/reusable/Product';
import { API_URL } from '../config';
import Breadcrumb from '../components/reusable/Breadcrumb';
import Loader from '../components/reusable/Loader';
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import '../assets/styles/main.scss';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            paginationData: {},
            showLoader: false,
            updateCart: false,
            currentPage: 1,
            lastPage: 0,
            noMatchFound: false,
            searchTerm: ''
        };
        this.cartShouldUpdate = this.cartShouldUpdate.bind(this);
        this.renderProducts = this.renderProducts.bind(this);
        this.renderSearchedTerm = this.renderSearchedTerm.bind(this);
        this.loadMoreProducts = this.loadMoreProducts.bind(this);
        this.updateProductsOnPagination = this.updateProductsOnPagination.bind(this);
    }

    static async getInitialProps({ req, res}) {
        const redirect = res;
        if (req) {
            const searchTerm = req.params.search_term;
            if (!searchTerm) {
                if (redirect) {
                    redirect.writeHead(302, {
                      Location: '/'
                    })
                    redirect.end();
                }
            }

            const remoteUrl = `${API_URL}/products/search-results/${searchTerm}`;
            const res = await fetch(remoteUrl);
            const response = await res.json();
            if (response) {
                const { 
                    data,
                    meta
                } = response; 
                
                return {
                    productsData: data,
                    currentPage: meta.current_page,
                    lastPage: meta.last_page,
                    noMatchFound: (data.length === 0) ? true : false,
                    searchTerm: searchTerm
                };
            }
            
        }
        return {
            noMatchFound: true
        };
    }

    componentDidMount() {
        const { productsData, currentPage, lastPage, noMatchFound, searchTerm } = this.props;
        if (productsData) {
            if (productsData.length !== 0) {
                this.setState({
                    products: productsData,
                    currentPage: Number(currentPage),
                    lastPage: Number(lastPage)
                });
            }
        }

        this.setState({
            noMatchFound: noMatchFound,
            searchTerm: searchTerm
        });
    }

    cartShouldUpdate() {
		this.setState({
			updateCart: true
		});
    }
    
    renderProducts() {
        const { products, noMatchFound } = this.state;
        if (products.length !== 0) {
            const productsLayout = products.map((product) => {
                return (
                    <div 
                    key={product.slug}
                    className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product 
                        product={product} 
                        cartShouldUpdate={this.cartShouldUpdate}
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
            ); 
        }

        if(!noMatchFound && (products.length === 0)) {
            return (
                <Loader />
            );
        }
        
    }

    renderSearchedTerm() {
        const { products, noMatchFound, searchTerm } = this.state;
        const validValue = searchTerm.split('_').join(' ');
        if (products.length !== 0) {
            return (
                <div className='search-results-title'>
                    <h4>Search results for: <span className='item'>{validValue}</span></h4>
                </div>
            ); 
        } 
       
        if (noMatchFound) {
            return (
                <div className='search-results-title'>
                    <h4>No match found for: <span className='item'>{validValue}</span></h4>
                </div>
            );
        }

        return null;
    }

    async loadMoreProducts() {
        const { currentPage, searchTerm } = this.state;
        const newPage = currentPage + 1;
        const remoteUrl = `${API_URL}/products/search-results/${searchTerm}?page=${newPage}`
        const res = await fetch(remoteUrl);
        const response = await res.json();
        const { data } = response;
        if (data) {
            this.updateProductsOnPagination(data);
            return;
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
        // const { 
        //     categoriesData
        // } = this.props;
        const { products, currentPage, lastPage } = this.state;
        const hasMore = (currentPage < lastPage) ? true : false;
		return (
            <GoogleAnalyticsLogger>
			<Global
            updateCart={this.state.updateCart}
            >
				{/* <div className='multi-vendor-categories'>
                    <TopCategories 
                    categories={categoriesData}
                    />
				</div> */}
                <div className='categories-content'>
                    <div className='maximum-width'>
                        <div className='row reset-row'>
                           {this.renderSearchedTerm()}
                        </div>
                        <div className='search-results-breadcrumb'>
                            <Breadcrumb>
                                <a href="/" className="breadcrumb-link">Home</a>
                                    <span> / </span>
                                <a href="" className="breadcrumb-current">Search results</a>
                            </Breadcrumb>
                        </div>
                        <div className='row reset-row'>
                            <div className='col-lg-12 col-md-12 col-sm-12 col-12 col-reset main-content-wrapper search-content-wrapper'>
                                <div className='main-content'>
                                <InfiniteScroll
                                dataLength={products.length}
                                next={this.loadMoreProducts}
                                hasMore={hasMore}
                                loader={<Loader />}
                                >
                                    {this.renderProducts()} 
                                </InfiniteScroll>
                                    {/* <div>
                                        
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
			</Global>
            </GoogleAnalyticsLogger>
		);
	}
}

export default SearchResults;
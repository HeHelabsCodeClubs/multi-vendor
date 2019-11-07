import _ from 'lodash';
import React, { Component } from 'react';
import SpecialProduct from '../../reusable/SpecialProduct';
import { API_URL } from '../../../config';
import Loader from '../../reusable/Loader';

export default class MoreProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            products: [],
            currentPage: 1,
            lastPage: 1,
            catIndex: 0,
            activeCategorySlug: '',
            activeCategoryName: '',
            loadingMoreProducts: false
        };
        this.performAfterCategoriesLoad = this.performAfterCategoriesLoad.bind(this);
        this.getCategoryProducts = this.getCategoryProducts.bind(this);
        this.renderSpecialProducts = this.renderSpecialProducts.bind(this);
        this.shuffleProducts = this.shuffleProducts.bind(this);
        this.renderSectionTitle = this.renderSectionTitle.bind(this);
        this.renderLoadMoreButton = this.renderLoadMoreButton.bind(this);
        this.renderLoaderWrapper =  this.renderLoaderWrapper.bind(this);
        this.perfomAfterProductsLoad = this.perfomAfterProductsLoad.bind(this);
        this.triggerProductLoadMore = this.triggerProductLoadMore.bind(this);
    }
    componentDidMount() {
        const { categories } = this.props;
        this.setState({
            categories
        }, () => this.performAfterCategoriesLoad());
    }

    performAfterCategoriesLoad() {
        const { categories, catIndex } = this.state;
        if (categories.length !== 0) {
            this.shuffleProducts(categories);
            const categorySlug = categories[catIndex].slug;
            this.setState({
                activeCategorySlug: categorySlug,
                activeCategoryName: categories[catIndex].name
            }, () => this.triggerProductLoadMore());
        }
    }

    async getCategoryProducts(callback) {
        const { activeCategorySlug, currentPage } = this.state;
        if (activeCategorySlug !== '') {
            const remoteUrl = `${API_URL}/categories/${activeCategorySlug}/products/?page=${currentPage}&per_page=${12}`;
            const res = await fetch(remoteUrl);
            const response = await res.json();
            //console.log('call', callback);
            //callback(response);
            const { products } = this.state;
            let newProducts = [];
            if (products.length !== 0) {
                newProducts = products;
                response.data.map((product) => {
                    newProducts.push(product);
                });
            } else {
                newProducts = response.data;
            }
            this.setState({
                products: newProducts,
                currentPage: (Number(response.meta.pagination_data.current_page) + 1),
                lastPage: response.meta.pagination_data.last_page,
                loadingMoreProducts: false
            });
        }
    }

    triggerProductLoadMore() {
        /**
         * Display Loader
         */
        this.setState({
            loadingMoreProducts: true
        });

        /**
         * Request products
         */
        this.getCategoryProducts();
        
    }

    perfomAfterProductsLoad(response) {
        const { products } = this.state;
        let newProducts = [];
        if (products.length !== 0) {
            newProducts = products;
            response.data.map((product) => {
                newProducts.push(product);
            });
        } else {
            newProducts = response.data;
        }
        this.setState({
            products: newProducts,
            currentPage: (Number(response.meta.pagination_data.current_page) + 1),
            lastPage: response.meta.pagination_data.last_page,
            loadingMoreProducts: false
        });
    }

    renderSpecialProducts() {
        const { products } = this.state;
        if (products.length !== 0) {
            const productsLayout = products.map((product) => {
                return (
                    <div key={product.slug} className='special-single-product'>
                        <SpecialProduct product={product} />
                    </div>
                );
            });
            return productsLayout;
        }
        return null;
    }

    shuffleProducts(array) {
        var currentIndex = array.length;
        var temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    renderSectionTitle() {
        const { activeCategoryName } = this.state;
        if (activeCategoryName !== '') {
            return (
                <div className='made-in-rwanda-title maximum-width'>
                    {/* {`${activeCategoryName} Products`} */}
                    You May Also Like
                </div>
            );
        }

        return null;
    }
    renderLoadMoreButton() {
        const { currentPage, lastPage, loadingMoreProducts } = this.state;
        if ((Number(currentPage) < Number(lastPage)) && !loadingMoreProducts) {
            return (
                <div className='row load-more-wrapper'>
                    <button
                    type='button'
                    className='load-more-btn'
                    onClick={this.triggerProductLoadMore}
                    >
                        View More
                    </button>
                </div>
            );
        }

        return null;
    }

    renderLoaderWrapper() {
        const { loadingMoreProducts } = this.state;
        if (loadingMoreProducts) {
            return <Loader />;
        }
        return null;
    }
	render() {
        const { products, currentPage, lastPage } = this.state;
        const hasMore = Number(currentPage) < Number(lastPage) ? true : false;

		return (
            <div className='made-in-rwanda-wrapper'>
                {this.renderSectionTitle()}
                <div className='made-in-rwanda-content maximum-width'>
                    <div className='made-in-rwanda-wrapper'>
                    {/* <InfiniteScroll
                    dataLength={products.length}
                    next={this.getCategoryProducts}
                    hasMore={hasMore}
                    loader={<Loader />}
                    > */}
                        <div className='row rwanda-wrapper'>
                            {this.renderSpecialProducts()}
                        </div>
                    {/* </InfiniteScroll> */}
                    </div>
                    {this.renderLoaderWrapper()}
                    {this.renderLoadMoreButton()}
                </div>
            </div>
		);
	}
}
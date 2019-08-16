import React, { Component } from "react";
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { API_URL } from '../../../config';

class StoreItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
            seller: {},
            ids: '',
            showCloseBtn: false
		}
		this.renderStore = this.renderStore.bind(this);
		this.handleSellerClick = this.handleSellerClick.bind(this);
		this.handleUpdateProductsPerFilteredSeller = this.handleUpdateProductsPerFilteredSeller.bind(this);
        this.getSellerProducts = this.getSellerProducts.bind(this);
        this.closeStoreFilter = this.closeStoreFilter.bind(this);
        this.closeBtnLayout = this.closeBtnLayout.bind(this);
	}

	componentDidMount() {
		const { seller } = this.props;
        this.setState({
            seller
        });
	}

	handleSellerClick(e) {
		if (e !== undefined) {
            e.preventDefault();
        }
        this.setState({
            showCloseBtn: true
        });
        const { seller } = this.state;
        const { ids } = this.props;
        ids.push(seller.seller_id);
        const sellersIds = ids.toString();
        this.setState({
            ids: sellersIds
        })
        this.handleUpdateProductsPerFilteredSeller();
        const actionUrl = `/categories?category_slug=${this.props.parentCategorySlug}`;
        const asUrl = `/categories/${this.props.parentCategorySlug}`;
        Router.push(actionUrl, asUrl);
	}
	
	handleUpdateProductsPerFilteredSeller() {
		this.props.displayLoader(() => {
			// update products
		   this.getSellerProducts((newProducts) => {
			   this.props.displayLoader(() => {
				   this.props.updateProducts(newProducts);
			   });
		   });
	   });
	}

	async getSellerProducts(callback) {
        const { ids } = this.state;
        const remoteUrl = `${API_URL}/categories/${this.props.parentCategorySlug}/products/sellers?filter=${ids}`;
        const res = await fetch(remoteUrl);
        const response = await res.json();
        const data = {
            products: response.data,
            meta: response.meta.pagination_data
		};
        callback(data);
    }

    closeStoreFilter() {
        this.setState({
            showCloseBtn: false
        });
        const { seller } = this.state;
        const { ids } = this.props;

        for(let i = 0; i < ids.length; i++){ 
            if ( ids[i] === seller.seller_id) {
                ids.splice(i, 1); 
                const sellersIds = ids.toString();
                this.setState({
                    ids: sellersIds
                })
            }
        }
        
        this.handleUpdateProductsPerFilteredSeller();
        const actionUrl = `/categories?category_slug=${this.props.parentCategorySlug}`;
        const asUrl = `/categories/${this.props.parentCategorySlug}`;
        Router.push(actionUrl, asUrl);
    }

    closeBtnLayout() {
        const { showCloseBtn } = this.state;

        if (showCloseBtn) {
            return (
                <div className='close-store-filter'>
                    <span className='icon-Path-58' onClick={this.closeStoreFilter} />
                </div> 
            );
        }
        return null;
    }

	renderStore() {
		const { seller } = this.state;
		if (seller) {
            return (
                <a 
                href={`/categories/${this.props.parentCategorySlug}`} 
                onClick={this.handleSellerClick}
                >
                    <div className='line-display single-store'>
                        <img src={seller.logo_url} />
                        {this.closeBtnLayout()}
                    </div>
                </a>
            );
		}
	}
	
	render() {
		return this.renderStore();
	}
}

export default StoreItem;

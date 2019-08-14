import React, { Component } from "react";
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import { API_URL } from '../../../config';

class StoreItem extends Component {
	constructor(props) {
		super(props);
		this.state = {
            seller: {},
            ids: ''
		}
		this.renderStore = this.renderStore.bind(this);
		this.handleSellerClick = this.handleSellerClick.bind(this);
		this.handleUpdateProductsPerFilteredSeller = this.handleUpdateProductsPerFilteredSeller.bind(this);
		this.getSellerProducts = this.getSellerProducts.bind(this);
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
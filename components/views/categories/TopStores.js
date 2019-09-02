import React, { Component } from "react";
import StoreItem from "./StoreItem";

class TopStores extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sellers: [],
			visible: 7
		}
		this.renderSellers = this.renderSellers.bind(this);
		this.loadMore = this.loadMore.bind(this);
	}

	componentDidMount() {
		const { sellers } = this.props;
        this.setState({
            sellers
        });
	}

	loadMore() {
		this.setState((prev) => {
		  return {
			  visible: prev.visible + 7
			};
		});
	}

	renderSellers() {
		const { sellers, visible } = this.state;
		const { updateSellers } = this.props;
		const { parentCategorySlug, displayLoader, updateProducts, sellersIds } = this.props;
		
		if (sellers) {
			if (updateSellers === false) {
				const sellersLayout = sellers.slice(0, visible).map((seller) => {
					const { seller_id } = seller;
					return (
						<StoreItem 
						Key={seller_id}
						seller={seller}
						ids={sellersIds}
						parentCategorySlug={parentCategorySlug}
						displayLoader={displayLoader}
						updateProducts={updateProducts}
						/>
					);
				});
				return sellersLayout;
			}
			const sellersLayout = sellers.slice(0, visible).map((seller) => {
				return (
					<StoreItem 
					Key={seller.seller_id}
					seller={seller}
					ids={sellersIds}
					parentCategorySlug={parentCategorySlug}
					displayLoader={displayLoader}
					updateProducts={updateProducts}
					updateSellers={updateSellers}
					/>
				);
			});
			return sellersLayout;
		}
	}
	
	render() {
		const { visible, sellers } = this.state;
		return (
			<div className='multi-vendor-stores-wrapper'>
				<div className='col-lg-1 col-md-2 col-sm-2 col-reset line-display stores-title'>Stores: </div>
				<div className="col-lg-10 col-md-9 col-sm-9 col-reset stores-wrapper">
					{this.renderSellers()}
				</div>
				{visible < sellers.length &&
					<button onClick={this.loadMore} type="button" className="load-more">More +</button>
				}
		  	</div>
		);
	}
}

export default TopStores;
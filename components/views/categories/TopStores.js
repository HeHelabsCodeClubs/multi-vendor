import React, { Component } from "react";
import StoreItem from "./StoreItem";

class TopStores extends Component {
	constructor(props) {
		super(props);
		this.state = {
			sellers: []
		}
		this.renderSellers = this.renderSellers.bind(this);
	}

	componentDidMount() {
		const { sellers } = this.props;
        this.setState({
            sellers
        });
	}

	renderSellers() {
		const { sellers } = this.state;
		const { parentCategorySlug, displayLoader, updateProducts, sellersIds } = this.props;
		if (sellers) {
			const sellersLayout = sellers.map((seller) => {
				return (
					<StoreItem 
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
	}
	
	render() {
		return (
			<div className='multi-vendor-stores-wrapper'>
				<div className='col-lg-1 col-md-2 col-sm-2 col-reset line-display stores-title'>Stores: </div>
				<div className="col-lg-10 col-md-9 col-sm-9 col-reset stores-wrapper">
					{this.renderSellers()}
				</div>
		  	</div>
		);
	}
}

export default TopStores;
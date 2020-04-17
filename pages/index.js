import React from "react";
import Global from '../components/reusable/Global';
import TopStores from '../components/views/homepage/TopStores';
import SpecialOffers from "../components/views/homepage/SpecialOffers";
import MadeInRwanda from "../components/views/homepage/MadeInRwanda";
import Ad from "../components/views/homepage/Ad";
import HomepageCategory from "../components/views/homepage/HomepageCategory";
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import FeaturedSellers from "../components/views/homepage/FeaturedSellers";
import MoreProduct from "../components/views/homepage/MoreProduct";
import GoogleAnalyticsLogger from '../components/google-analytics/GoogleAnalyticsLogger';
import '../assets/styles/main.scss';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updateCart: false,
			openCart: false,
			openCartContent: false
		};
		this.cartShouldUpdate = this.cartShouldUpdate.bind(this);
		this.cartShouldOpen = this.cartShouldOpen.bind(this);
		this.HandleCartContentOpening = this.HandleCartContentOpening.bind(this);
		this.getFeaturedSellers = this.getFeaturedSellers.bind(this);
	}

	cartShouldUpdate() {
		this.setState({
			updateCart: true
		});
	}

	cartShouldOpen() {
		this.setState({
			openCart: true
		});
	}
	/**
	 * This function is better for server side rendering
	 */
	static async getInitialProps() {
		const res = await fetch(`${API_URL}/pages/homepage`)
        const response = await res.json()
		const { 
			data,
			global_featured_seller
		} = response;
        return {
		   promoAds: data.adds.promo.data,
		   type: data.adds.promo.type,
		   eventsAds: data.adds.events.data,
		   eventAddType: data.adds.events.type,
		   categories: data.categories,
		   stores: data.made_in_rwanda_brands.brands,
		   products: data.made_in_rwanda_brands.products,
		   topStores: data.top_stores,
		   sellers: data.featured_sellers,
		   specialOffers: data.special_offers
		};
	}

	getFeaturedSellers() {
		const { sellers, globalSeller } = this.props;
		if (sellers && sellers.length !== 0 && globalSeller) {
			const localFeaturedSellers = sellers;
			localFeaturedSellers.push(globalSeller);
			return localFeaturedSellers;
		}

		if (sellers) {
			return sellers;
		}

		if (globalSeller) {
			return [globalSeller];
		}

		return [];
	}

	HandleCartContentOpening() {
        const { openCartContent } = this.state;
        
        if (openCartContent) {
            this.setState ({
                openCartContent: false
            });
        } else {
            this.setState ({
                openCartContent: true
            })
        }
	}
	
	render() {
		const { 
			promoAds, 
			type, 
			categories, 
			stores, 
			products,
			topStores, 
			eventAddType,
			eventsAds,
			specialOffers,
		} = this.props;
		const {
			openCartContent
		} = this.state;

		const sellers = this.getFeaturedSellers();

		return (
			<GoogleAnalyticsLogger>
				<Global 
				updateCart={this.state.updateCart}
				openCart={openCartContent}
				>
					<div className='main-banners'>
						<Ad type={type} data={promoAds}/>
					</div>
					<div className='categories-scroller'>
						<div className='maximum-width'>
							<HomepageCategory categories={categories} />
						</div>
					</div>
					<div className='special-offers featured-sellers mobile-invisible'>
						<FeaturedSellers sellers={sellers} />
					</div>
					<div className='top-stores'>
						<TopStores topStores={topStores} />
					</div>
					<div className='made-in-rwanda special-offers'>
						<SpecialOffers offers={specialOffers} />
					</div>
					<div className='made-in-rwanda special-offers'>
						<MadeInRwanda 
						stores={stores} products={products} 
						cartShouldUpdate={this.cartShouldUpdate}
						// openCart={this.cartShouldOpen}
						openCart={this.HandleCartContentOpening}
						/>
					</div>
					<div className='special-offers featured-sellers mobile-visible'>
						<FeaturedSellers sellers={sellers} />
					</div>
					<div className='made-in-rwanda special-offers'>
						<Ad type={eventAddType} data={eventsAds}/>
					</div>
					<div className='made-in-rwanda special-offers bottom-moreProducts'>
						<MoreProduct categories={categories} />
					</div>
				</Global>
			</GoogleAnalyticsLogger>
		);
	}
}

export default Index;
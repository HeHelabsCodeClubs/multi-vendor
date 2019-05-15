import React from "react";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/homepage.scss';
import '../assets/styles/layouts/seller.scss';
import TopStores from '../components/views/homepage/TopStores';
import SpecialOffers from "../components/views/homepage/SpecialOffers";
import MadeInRwanda from "../components/views/homepage/MadeInRwanda";
import Ad from "../components/views/homepage/Ad";
import HomepageCategory from "../components/views/homepage/HomepageCategory";
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';
import FeaturedSellers from "../components/views/homepage/FeaturedSellers";

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			promoAds: [],
			type: null,
			categories: [],
			stores: [],
			topStores: [],
			sellers: [],
			specialOffers: []
		}
	}
	/**
	 * This function is better for server side rendering
	 */
	static async getInitialProps() {
		const res = await fetch(`${API_URL}/pages/homepage`)
        const response = await res.json()
		const { 
			data
		} = response;
        return {
		   promoAds: data.adds.promo.data,
		   type: data.adds.promo.type,
		   eventsAds: data.adds.events.data,
		   eventAddType: data.adds.events.type,
		   categories: data.categories,
		   stores: data.made_in_rwanda_brands.brands,
		   topStores: data.top_stores,
		   sellers: data.featured_sellers,
		   specialOffers: data.special_offers
        };
	}
	/**
	 * IMPORTANT!!
	 * 
	 * This one is very bad and will not allow us to do server side rendering
	 * 
	 */
	// async componentDidMount() {
    //     const res = await fetch(`${API_URL}/pages/homepage`)
    //     const data = await res.json()

    //     this.setState({
	// 	   promoAds: data.data.adds.promo.data,
	// 	   type: data.data.adds.promo.type,
	// 	   categories: data.data.categories,
	// 	   stores: data.data.made_in_rwanda_brands.brands,
	// 	   topStores: data.data.top_stores,
	// 	   sellers: data.data.featured_sellers
    //     });
    // }
	render() {
		const { 
			promoAds, 
			type, 
			categories, 
			stores, 
			topStores, 
			sellers,
			eventAddType,
			eventsAds,
			specialOffers
		} = this.props;
		return (
			<Global>
				<div className='main-banners'>
					<Ad type={type} data={promoAds}/>
				</div>
				<div className='categories-scroller'>
					<div className='maximum-width'>
						<HomepageCategory categories={categories} />
					</div>
				</div>
				<div className='special-offers'>
					<FeaturedSellers sellers={sellers} />
				</div>
				<div className='top-stores'>
					<TopStores topStores={topStores} />
				</div>
				<div className='made-in-rwanda special-offers'>
					<SpecialOffers offers={specialOffers} />
				</div>
				<div className='made-in-rwanda special-offers'>
					<MadeInRwanda stores={stores} />
				</div>
				<div className='made-in-rwanda special-offers'>
					<Ad type={eventAddType} data={eventsAds}/>
				</div>
			</Global>
		);
	}
}

export default Index;
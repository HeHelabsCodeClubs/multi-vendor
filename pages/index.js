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
import Suggest from '../components/views/homepage/suggest';
import Modal from 'react-responsive-modal';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updateCart: false,
			openCart: false,
			openCartContent: false,
			open: false
		};
		this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
		this.cartShouldUpdate = this.cartShouldUpdate.bind(this);
		this.cartShouldOpen = this.cartShouldOpen.bind(this);
		this.HandleCartContentOpening = this.HandleCartContentOpening.bind(this);
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
			data
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
	componentDidMount() {
		const { open } = this.state;
		if (!open) {
			this.setState({
				open: true
			});
		}
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
	
	onOpenModal = () => {
		this.setState({ open: true });
	};
	 
	onCloseModal = () => {
		this.setState({ open: false });
	};

	render() {
		const { 
			promoAds, 
			type, 
			categories, 
			stores, 
			products,
			topStores, 
			sellers,
			eventAddType,
			eventsAds,
			specialOffers
		} = this.props;
		const {
			openCartContent,
			open
		} = this.state;

		return (
			<GoogleAnalyticsLogger>
				<Global 
				updateCart={this.state.updateCart}
				openCart={openCartContent}
				>
					<Modal open={open} onClose={this.onCloseModal} center>
						<Suggest />
					</Modal>
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
import React from "react";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/homepage.scss';
import TopStores from '../components/views/homepage/TopStores';
import SpecialOffers from "../components/views/homepage/SpecialOffers";
import MadeInRwanda from "../components/views/homepage/MadeInRwanda";
import Add from "../components/views/homepage/Add";
import HomepageCategory from "../components/views/homepage/HomepageCategory";
import fetch from 'isomorphic-unfetch';
import { API_URL } from '../config';

class Index extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			promoAdds: [],
			categories: []
		}
	}
	async componentDidMount() {
        const res = await fetch(`${API_URL}/pages/homepage`)
        const data = await res.json()

        this.setState({
		   promoAdds: data.data.adds.promo,
		   categories: data.data.categories
        });
        //console.log(`Show data fetched. Count: ${JSON.stringify(data.data.adds.promo)}`)
    }
	render() {
		const { promoAdds, categories } = this.state;
		return (
			<Global>
				<div className='main-banners'>
					<Add type='slider' data={promoAdds}/>
				</div>
				<div className='categories-scroller'>
					<div className='maximum-width'>
						<HomepageCategory categories={categories} />
					</div>
				</div>
				<div className='top-stores'>
					<TopStores />
				</div>
				<div className='special-offers'>
					<SpecialOffers />
				</div>
				<div className='made-in-rwanda'>
					<MadeInRwanda />
				</div>
			</Global>
		);
	}
}

export default Index;
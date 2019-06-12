import Global from '../components/reusable/Global';
import TopInfo from '../components/views/seller/TopInfo';
import SellerCategories from '../components/views/seller/SellerCategories';
import MainContent from '../components/views/seller/MainContent';
import '../assets/styles/layouts/categories.scss';
import '../assets/styles/layouts/seller.scss';

class Seller extends React.Component {
	render() {
		return (
			<Global>
				<div className='multi-vendor-categories'>
                    <TopInfo />
				</div>
                <div className='categories-content'>
                    <div className='maximum-width'>
                        <div className='row reset-row'>
                            <div className='col-lg-3 col-md-4 col-sm-4 col-12'>
                                <SellerCategories />
                            </div>
                            <div className='col-lg-9 col-md-8 col-sm-8 col-12 col-reset main-content-wrapper'>
                                <MainContent />
                            </div>
                        </div>
                    </div>
                </div>
			</Global>
		);
	}
}

export default Seller;
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
                            <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                <SellerCategories />
                            </div>
                            <div className='col-lg-9 col-md-9 col-sm-9 col-12 col-reset main-content-wrapper'>
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
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/categories.scss';
import TopCategories from '../components/views/categories/TopCategories';
import SidemenuCategories from '../components/views/categories/SidemenuCategories';
import MainContent from '../components/views/categories/MainContent';

class Categories extends React.Component {
	render() {
		return (
			<Global>
				<div className='multi-vendor-categories'>
                    <TopCategories />
				</div>
                <div className='categories-content'>
                    <div className='maximum-width'>
                        <div className='row reset-row'>
                            <div className='col-lg-3 col-md-3 col-sm-3 col-12'>
                                <SidemenuCategories />
                            </div>
                            <div className='col-lg-9 col-md-9 col-sm-9 col-12'>
                                <MainContent />
                            </div>
                        </div>
                    </div>
                </div>
			</Global>
		);
	}
}

export default Categories;
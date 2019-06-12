import Ad from './Ad';
import Product from '../../reusable/Product';

class MainContent extends React.Component {
	render() {

		return (
			<div>
                <div className='row reset-row main-seller-banner'>
                    <Ad />
                </div>
                <div className='row reset-row main-content'>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'>
                        <Product />
                    </div>
                </div>
            </div>
		);
	}
}

export default MainContent;
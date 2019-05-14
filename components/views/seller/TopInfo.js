import React, { Component } from 'react';

class TopInfo extends Component {
	render() {
		return (
			<div className='maximum-width'>
                <div className='row reset-row multi-vendor-seller-wrapper'>
                    <div className='col-lg-3 col-md-3 col-sm-3 col-12 seller-logo-container'>
                        <a href=''>
                            <div className='seller-logo'>
                                <img src='https://res.cloudinary.com/hehe/image/upload/v1556532890/multi-vendor/NoPath.png' />
                            </div>
                        </a>
                    </div>
                    <div className='col-lg-9 col-md-9 col-sm-9 col-12'>
                        <div>
                            <span className='line-display'>
                                <div className='store-name'><span className='title'>Store:</span> UZURI K&Y</div>
                                <div className='store-category'>Clothing & Fashion</div>
                            </span>
                            <span className='line-display store-start-date'>
                                This store has been open since <br /> Jan 14, 2019 
                            </span>
                            <span className='line-display store-link'>
                                <a href=''>visit UZURIKY.rw ></a>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default TopInfo;
import React, { Component } from 'react';

class TopStores extends Component {

    renderTopStores(topStores) {
		const storesLayout = topStores.map((topStore) => {
			return (
                <div className='col-lg-2 col-md-2 col-sm-3 col-3 col-reset category' key={topStore.image_url}>
                    <a href='/categories'>
                        <img src={topStore.image_url} />
                        <h4>{topStore.tag_name}</h4>
                    </a>
                </div>
			)
		});
		return storesLayout;
    }
    
	render() {
		return (
			<div className='top-stores-wrapper'>
                <div className='top-stores-title maximum-width'>Shop on Kigali's Top Stores</div>
                <div className='top-stores-content maximum-width'>
                    <div className='stores-wrapper'>
                        <div className='row reset-row'>
                            {this.renderTopStores(this.props.topStores)}
                        </div>
                        {/* <div className='view-more-btn'>
                            <button>View more</button>
                        </div> */}
                    </div>
                </div>
            </div>
		);
	}
}

export default TopStores;
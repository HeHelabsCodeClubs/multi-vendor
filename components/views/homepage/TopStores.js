import React, { Component } from 'react';
import Link from 'next/link';

class TopStores extends Component {
    renderTopStores(topStores) {
		const storesLayout = topStores.map((topStore) => {
			return (
                <div className='category' key={topStore.image_url}>
                        <a href={`/categories/${topStore.category_slug}`}>
                            <img src={topStore.image_url} />
                        </a>
                </div>
			);
		});
		return storesLayout;
    }
	render() {
		return (
			<div className='top-stores-wrapper'>
                <div className='top-stores-title maximum-width'>Shop At Kigali's Top Stores</div>
                <div className='top-stores-content maximum-width'>
                    <div className='stores-wrapper'>
                        <div className='row reset-row category-wrapper'>
                            {this.renderTopStores(this.props.topStores)}
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default TopStores;
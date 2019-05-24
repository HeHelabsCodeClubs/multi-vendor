import React from 'react';

export default (product) => {
    const { has_discount, is_popular, discount_percent } = product;
    const discount = Number(has_discount);
    const popularity = Number(is_popular);
    if ( discount === 1 && popularity === 1 ) {
        return (
            <div className='top-icons'>
                <span className='hot'><span className='icon-Path-54'></span>hot</span>
                <span className='discount'>{`${discount_percent}% OFF`}</span>
            </div>
        );
    }

    if ( discount === 1 && popularity !== 1) {
        return (
            <div className='top-icons'>
                <span className='discount'>{`${discount_percent}% OFF`}</span>
            </div>
        );
    }

    if (discount !== 1 && popularity === 1) {
        return (
            <div className='top-icons'>
                <span className='hot'><span className='icon-Path-54'></span>hot</span>
            </div>
        );
    }
    
    return null;
}
import React from 'react';

export default (product) => {
    const { has_discount, price, special_price } = product;
    const discount = Number(has_discount);
    if (discount === 1) {
        return (
            <span className='price-cart'>
                <span className='price'>{`Rwf ${special_price}`}</span>
                <span className='initial-price'>&nbsp;{`Rwf ${price}`}</span>
            </span>
        );
    }

    return (
        <span className='price-cart'>
            <span className='price'>{`Rwf ${special_price}`}</span>
        </span>
    );
}
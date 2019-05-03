import Link from 'next/link';

class OrderSummary extends React.Component {

	render() {
		return (
            <div className='order-summary-wrapper'>
                <div className='order-summary'>
                    <div className='order-summary-title'>Order Summary</div>
                    <div className='white-background'>
                        <div className='line'>
                            <span className='title'>9 item(s)</span>
                            <span className='t-price'>Rwf 70000</span>
                        </div>
                        <div className='line'>
                            <span className='title'>Total shipping:</span>
                            <span className='s-price'>Rwf 2100</span>
                        </div>
                    </div>
                </div>
                <div className='products'>
                    <div className='order-summary-title'>Products</div>
                    <div className='white-background'>
                        <div className='checkout-cart-header'>
                            <div className='store-cart-content'>
                                <img className='store-logo' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png'/>
                                <span className='store-name'>Mart</span>
                            </div>
                            <span className='store-items'>(3 Items from Mart store)</span>
                            
                        </div>
                        <div className='cart-product'>
                            <div className='line'>
                                <span className='title'>Cabbage</span>
                                <span className='u-price'>Rwf 200</span>
                            </div>
                            <div className='product-att'>qty: 2 piieces</div>
                            <div className='product-att'>Unit price: Rwf 100</div>
                        </div>
                        <div className='cart-product'>
                            <div className='line'>
                                <span className='title'>Cabbage</span>
                                <span className='u-price'>Rwf 200</span>
                            </div>
                            <div className='product-att'>qty: 2 piieces</div>
                            <div className='product-att'>Unit price: Rwf 100</div>
                        </div>
                        <div className='cart-product'>
                            <div className='line'>
                                <span className='title'>Cabbage</span>
                                <span className='u-price'>Rwf 200</span>
                            </div>
                            <div className='product-att'>qty: 2 piieces</div>
                            <div className='product-att'>Unit price: Rwf 100</div>
                        </div>
                        <div className='gift-block'>
                            <div>
                                <input type='text' placeholder='Gift certificate or promo code' />
                                <button>Apply</button>
                            </div>
                        </div>
                        <div>
                            <div className='subtotal'><span className='light-title'>Subtotal:</span> Rwf 1000</div>
                            <div className='shipping'><span className='light-title'>Shipping:</span>  Rwf 100</div>
                            <div className='total'><span className='total-t'><span className='light-title'>Total:</span>  Rwf 1100</span></div>
                        </div>
                    </div>
                    <div className='white-background'>
                        <div className='checkout-cart-header'>
                            <div className='store-cart-content'>
                                <img className='store-logo' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png'/>
                                <span className='store-name'>Mart</span>
                            </div>
                            <span className='store-items'>(3 Items from Mart store)</span>
                            
                        </div>
                        <div className='cart-product'>
                            <div className='line'>
                                <span className='title'>Cabbage</span>
                                <span className='u-price'>Rwf 200</span>
                            </div>
                            <div className='product-att'>qty: 2 piieces</div>
                            <div className='product-att'>Unit price: Rwf 100</div>
                        </div>
                        <div className='cart-product'>
                            <div className='line'>
                                <span className='title'>Cabbage</span>
                                <span className='u-price'>Rwf 200</span>
                            </div>
                            <div className='product-att'>qty: 2 piieces</div>
                            <div className='product-att'>Unit price: Rwf 100</div>
                        </div>
                        <div className='cart-product'>
                            <div className='line'>
                                <span className='title'>Cabbage</span>
                                <span className='u-price'>Rwf 200</span>
                            </div>
                            <div className='product-att'>qty: 2 piieces</div>
                            <div className='product-att'>Unit price: Rwf 100</div>
                        </div>
                        <div className='gift-block'>
                            <div>
                                <input type='text' placeholder='Gift certificate or promo code' />
                                <button>Apply</button>
                            </div>
                        </div>
                        <div>
                            <div className='subtotal'><span className='light-title'>Subtotal:</span> Rwf 1000</div>
                            <div className='shipping'><span className='light-title'>Shipping:</span>  Rwf 100</div>
                            <div className='total'><span className='total-t'><span className='light-title'>Total:</span>  Rwf 1100</span></div>
                        </div>
                    </div>
                </div>
            </div>
		);
	}
}

export default OrderSummary;
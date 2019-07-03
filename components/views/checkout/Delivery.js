import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Select2 from 'react-select2-wrapper';

class Delivery extends React.Component {

	render() {
		return (
            <div className='account-info-wrapper'>
                <div className='payment-section'>
					<div className='account-info-title'>Payment</div>
				</div>
				<div className='delivery-content'>
					<div className='store-logo'>
						<div className="left-block">
							<img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
							<span className='store-name'><span className='name'>Mart</span>(3 Items from Mart store)</span>
						</div>
						<div className="right-block">
							<a className="btn_store-cartProducts">Show Products</a>
						</div>
					</div>
					<div>							
						<div class="store-cartProducts">
							<div className='cart-product'>
								<div className='row reset-row'>
									<div className='col-lg-9 col-md-9 col-sm-8 col-8 col-reset'>
										<div className='title'>Cabbage</div>
										<div className='product-att'>qty: 2 pieces</div>
										<div className='product-att'>Unit price: Rwf 100</div>
									</div>
									<div className='col-lg-3 col-md-3 col-sm-4 col-4 col-reset'>
										<div className='u-price'>Rwf 200</div>
									</div>
								</div>
							</div>
							<div className='cart-product'>
								<div className='row reset-row'>
									<div className='col-lg-9 col-md-9 col-sm-8 col-8 col-reset'>
										<div className='title'>Cabbage</div>
										<div className='product-att'>qty: 2 pieces</div>
										<div className='product-att'>Unit price: Rwf 100</div>
									</div>
									<div className='col-lg-3 col-md-3 col-sm-4 col-4 col-reset'>
										<div className='u-price'>Rwf 200</div>
									</div>
								</div>
							</div>
							<div className='cart-product'>
								<div className='row reset-row'>
									<div className='col-lg-9 col-md-9 col-sm-8 col-8 col-reset'>
										<div className='title'>Cabbage</div>
										<div className='product-att'>qty: 2 pieces</div>
										<div className='product-att'>Unit price: Rwf 100</div>
									</div>
									<div className='col-lg-3 col-md-3 col-sm-4 col-4 col-reset'>
										<div className='u-price'>Rwf 200</div>
									</div>
								</div>
							</div>
						</div>
						<div className='total-price'>
							<div className='subtotal'>
								<span className='t-title'>Subtotal: </span>
								<span className='t-content'>Rwf 21,345</span>	
							</div>
							<div className='shipping-grid'>
								<span className='shipping-title'>Shipping method</span>
								<span className='shipping-dropdown'>
									<Select2
										defaultValue={2}
										data={[
											{ text: 'WHS', id: 1 },
											{ text: 'another WHS', id: 2 },
											{ text: 'other WHS', id: 3}
										]}
									/>
								</span>
								<span className='shipping'>
									<span className='t-title'>Subtotal: </span>
									<span className='t-content'>Rwf 21,345</span>
								</span>
							</div>
							<div className='total-grid checkout-total-grid row reset-row'>
								<span>
									<span className='dur-title'>Estimated duration </span> 
									<span className='dur-content'>2days</span>
								</span>
								<span className='total'>
									<span className='t-title'>Subtotal: </span>
									<span className='t-content'>Rwf 21,345</span>
								</span>
							</div>
						</div>						
					</div>
				</div>
            </div>
		);
	}
}

export default Delivery;
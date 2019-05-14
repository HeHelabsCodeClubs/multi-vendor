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
						<img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
						<span className='store-name'>Mart (3 Items from Mart store)</span>
					</div>
					<Tabs>
						<TabList>
							<Tab><h5><span className="table-title">Shipping method by product</span></h5></Tab>
							<Tab><h5><span className="table-title">Use the same shipping methond to all</span></h5></Tab>
						</TabList>
						<TabPanel>
							<div>
								<div className='cart-product'>
									<div className='line'>
										<span className='title'>Cabbage</span>
										<span className='u-price'>Rwf 200</span>
										<span>
											<Select2
                                                data={[
                                                    { text: 'WHS same day', id: 1 },
                                                    { text: 'WHS next day', id: 2 },
                                                    { text: 'WHS three days', id: 3}
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
										</span>
									</div>
									<div className='product-att'>qty: 2 piieces</div>
									<div className='product-att'>Unit price: Rwf 100</div>
								</div>
								<div className='cart-product'>
									<div className='line'>
										<span className='title'>Cabbage</span>
										<span className='u-price'>Rwf 200</span>
										<span>
											<Select2
                                                data={[
                                                    { text: 'WHS same day', id: 1 },
                                                    { text: 'WHS next day', id: 2 },
                                                    { text: 'WHS three days', id: 3}
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
										</span>
									</div>
									<div className='product-att'>qty: 2 piieces</div>
									<div className='product-att'>Unit price: Rwf 100</div>
								</div>
								<div className='cart-product'>
									<div className='line'>
										<span className='title'>Cabbage</span>
										<span className='u-price'>Rwf 200</span>
										<span>
											<Select2
                                                data={[
                                                    { text: 'WHS same day', id: 1 },
                                                    { text: 'WHS next day', id: 2 },
                                                    { text: 'WHS three days', id: 3}
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
										</span>
									</div>
									<div className='product-att'>qty: 2 piieces</div>
									<div className='product-att'>Unit price: Rwf 100</div>
								</div>
								<div className='total-price'>
                                    <div className='subtotal'>Sutotal: Rwf 21,345</div>
                                    <div className='total-grid'>
                                        <span className='total'>Total: Rwf 45,475</span>
                                    </div>
                                </div>
							</div>
						</TabPanel>
						<TabPanel>
							<div>
								<div className='cart-product'>
									<div className='line'>
										<span className='title'>Cabbage</span>
										<span className='u-price'>Rwf 200</span>
										<span>
											<Select2
                                                data={[
                                                    { text: 'WHS same day', id: 1 },
                                                    { text: 'WHS next day', id: 2 },
                                                    { text: 'WHS three days', id: 3}
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
										</span>
									</div>
									<div className='product-att'>qty: 2 pieces</div>
									<div className='product-att'>Unit price: Rwf 100</div>
								</div>
								<div className='cart-product'>
									<div className='line'>
										<span className='title'>Cabbage</span>
										<span className='u-price'>Rwf 200</span>
										<span>
											<Select2
                                                data={[
                                                    { text: 'WHS same day', id: 1 },
                                                    { text: 'WHS next day', id: 2 },
                                                    { text: 'WHS three days', id: 3}
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
										</span>
									</div>
									<div className='product-att'>qty: 2 pieces</div>
									<div className='product-att'>Unit price: Rwf 100</div>
								</div>
								<div className='cart-product'>
									<div className='line'>
										<span className='title'>Cabbage</span>
										<span className='u-price'>Rwf 200</span>
										<span>
											<Select2
                                                data={[
                                                    { text: 'WHS same day', id: 1 },
                                                    { text: 'WHS next day', id: 2 },
                                                    { text: 'WHS three days', id: 3}
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
										</span>
									</div>
									<div className='product-att'>qty: 2 pieces</div>
									<div className='product-att'>Unit price: Rwf 100</div>
								</div>
								<div className='total-price'>
                                    <div className='subtotal'>Sutotal: Rwf 21,345</div>
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
                                        <span className='shipping'>Total: Rwf 21,345</span>
                                    </div>
                                    <div className='total-grid'>
                                        <span className='total'>Total: Rwf 45,475</span>
                                    </div>
                                </div>
							</div>
						</TabPanel>
					</Tabs>
				</div>
            </div>
		);
	}
}

export default Delivery;
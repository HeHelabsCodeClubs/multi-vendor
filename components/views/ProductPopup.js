import Link from 'next/link'; 
import Modal from 'react-responsive-modal';
import Select2 from 'react-select2-wrapper';
import Product from '../reusable/Product';

class ProductPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
    }
    onOpenModal() {
        this.setState({ 
            open: true 
        });
    };

    onCloseModal () {
        this.setState({ 
            open: false 
        });
    };
	render() {
        const { open } = this.state;
		return (
            <div>
                <div className='popup-wrapper'>
                    <div className='product-details-wrapper'>
                        <div className='row reset-row'>
                            <div className='col-lg-5 col-md-5 col-sm-5 col-12 images-wrapper'>
                                <img className='big-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                <div className='row'>
                                    <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                        <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                        <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                        <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                    </div>
                                    <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                        <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                    </div>
                                </div>
                            </div>
                            <div className='col-lg-7 col-md-7 col-sm-7 col-12 description-wrapper'>
                                <div className='details'>
                                    <div className='product-name'>Maya Sandal</div>
                                    <div className='top-icons'>
                                        <span className='hot'><span className='icon-Path-54'></span>hot</span>
                                        <span className='discount'>50% OFF</span>
                                    </div>
                                    <div className='product-detail'>
                                        <span className='details-title'>Price:</span>
                                        <span className='initial-price'>Rwf 10000</span>
                                        <span className='price'>Rwf 5000</span>
                                        <span className='details-title'>/peace</span>
                                        <span className='details-title'>You save Rwf 5000</span>
                                    </div>
                                    <div className='product-detail'>
                                        <span className='details-title'>Color:</span>
                                        <span className='select-dropdown'>
                                            <Select2
                                                data={[
                                                    { text: 'Red', id: 1 },
                                                    { text: 'Blue', id: 2 },
                                                    { text: 'Green', id: 3},
                                                    { text: 'White', id: 4 }
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className='product-detail'>
                                        <span className='details-title'>Size:</span>
                                        <span className='select-dropdown'>
                                            <Select2
                                                data={[
                                                    { text: '37', id: 1 },
                                                    { text: '38', id: 2 },
                                                    { text: '39', id: 3},
                                                    { text: '40', id: 4 }
                                                ]}
                                                options={
                                                    { placeholder: 'Select' }
                                                }
                                            />
                                        </span>
                                    </div>
                                    <div className='product-detail'>
                                        <span className='details-title'>Quantity:</span>
                                        <span className='qty-increment'>
                                            <span className='decrement'>-</span>
                                            <span className='number'>12</span>
                                            <span className='increment'>+</span>
                                        </span>
                                        <span className='details-title'>(28 peaces available)</span>
                                    </div>
                                    <div className='product-detail'>
                                        <span className='orange-btn'>
                                            <button>Add to Cart</button>
                                        </span>
                                        <span className='white-btn'>
                                            <button>Direct Buy</button>
                                        </span>
                                        <span className='white-btn'>
                                            <button>Add to Wishlist</button>
                                        </span>
                                    </div>
                                    <div className='product-detail'>
                                        <span className='details-title'>Price:</span>
                                        <span className='product-store'>
                                            <span className='store-img'>
                                                <img src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556532890/multi-vendor/NoPath_-_Copy.png' />
                                            </span>
                                            <span className='store-content'>
                                                <div className='content'>View more from <span className='black'>poshcreative store </span>here</div>
                                                <div className='content bottom'>or visit <span className='orange'>www.poshcreative.rw </span></div>
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className='description-details'>
                                    <div className='desc-title'>Product Details</div>
                                    <div className='desc-content'>
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 

Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <div className='products-title'>Related Items</div>
                <div className='row reset-row popup-products'>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                </div>
                <div className='products-title'>Often bought with</div>
                <div className='row reset-row popup-products'>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                        <Product />
                    </div>
                </div>
            </div>
		);
	}
}

export default ProductPopup;

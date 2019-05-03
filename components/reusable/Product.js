import Link from 'next/link'; 
import Modal from 'react-responsive-modal';
import '../../assets/styles/layouts/product.scss';

class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }
    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
	render() {
        const { open } = this.state;
		return (
			<div className='single-product' onClick={this.onOpenModal}>
                <Link href=''>
                    <a>
                        <img className='product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288624/multi-vendor/prod_3_2x.png' />
                        <div className='top-icons'>
                            <span className='hot'><span className='icon-Path-54'></span>hot</span>
                            <span className='discount'>50% OFF</span>
                        </div>
                        <div className='product-description'>
                            <div className='store-logo'>
                                <img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
                                <span className='store-name'>Mart</span>
                            </div>
                            <div className='product-name'>Full detailed Product title - and info about it... for home use only</div>
                            <div className='price-cart'>
                                <span>
                                    <span className='price'>Rwf 5000</span>
                                    <span className='initial-price'>Rwf 10000</span>
                                </span>
                                <span className='add-to-cart'>
                                    <button><span className='icon-Path-63'></span></button>
                                </span>
                            </div>
                        </div>
                    </a>
                </Link>  
                <Modal open={open} onClose={this.onCloseModal} center>
                    <div className='popup-wrapper'>
                        <div className='product-wrapper'>
                            <div className='row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-12'>
                                    me
                                </div>
                                <div className='col-lg-7 col-md-7 col-sm-7 col-12'>
                                        you
                                </div>
                            </div>  
                        </div>
                    </div>
                </Modal>          
            </div>
		);
	}
}

export default Product;
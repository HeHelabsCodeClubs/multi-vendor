import Link from 'next/link'; 
import Modal from 'react-responsive-modal';
import Select2 from 'react-select2-wrapper';
import '../../assets/styles/layouts/product.scss';
import ProductPopup from '../views/ProductPopup';

class Product extends React.Component {
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
                <div className='single-product' onClick={this.onOpenModal}>
                    <Link href=''>
                        <a>
                            <img className='product-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                            <div className='top-icons'>
                                <span className='hot'><span className='icon-Path-54'></span>hot</span>
                                <span className='discount'>50% OFF</span>
                            </div>
                            <div className='product-description'>
                                <div className='store-logo'>
                                    <img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288678/multi-vendor/shop-icon-4_2x.png' />
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
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ProductPopup />
                </Modal>
            </div>
		);
	}
}

export default Product;

import Link from 'next/link'; 
import Modal from 'react-responsive-modal';
import Select2 from 'react-select2-wrapper';
import '../../assets/styles/layouts/product.scss';
import ProductPopup from '../views/ProductPopup';

class SpecialProduct extends React.Component {
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
            <div className='special-single-product-wrapper'>
                <div className='single-product' onClick={this.onOpenModal}>
                    <Link href=''>
                        <a>
                            <img className='product-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                            <div className='top-icons'>
                                <span className='hot'><span className='icon-Path-54'></span>hot</span>
                                <span className='discount'>50% OFF</span>
                            </div>
                            <div className='product-description'>
                                <div className='price-cart'>
                                    <span className='price'>Rwf 5000</span>
                                    <span className='initial-price'>Rwf 10000</span>
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

export default SpecialProduct;

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
        const {
            productIcons,
            specialPrice,
            price,
            productImage,
            hotIcon
        } = this.props;

		return (
            <div className='special-single-product-wrapper'>
                <div className='single-product' onClick={this.onOpenModal}>
                    <Link href=''>
                        <a>
                            <img className='product-img' src={productImage} />
                            {productIcons}
                            <div className='product-description'>
                                <div className='price-cart'>
                                    <span className='price'>{specialPrice}</span>
                                    <span className='initial-price'>{price}</span>
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

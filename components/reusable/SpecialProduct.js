import Modal from 'react-responsive-modal';
import '../../assets/styles/layouts/product.scss';
import ProductPopup from '../views/ProductPopup';
import ImageLoader from './ImageLoader';

class SpecialProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
        this.onOpenModal = this.onOpenModal.bind(this);
        this.onCloseModal = this.onCloseModal.bind(this);
        this.renderProduct = this.renderProduct.bind(this);
        this.renderProductIdentifier = this.renderProductIdentifier.bind(this);
        this.renderProductPrice = this.renderProductPrice.bind(this);
        this.showProduct = this.showProduct.bind(this);
    }
    onOpenModal() {
        this.setState({ 
            open: true 
        });
    };

    onCloseModal() {
        this.setState({ 
            open: false 
        });
    };

    renderProductIdentifier(product) {
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

    renderProductPrice(product) {
        const { has_discount, price, special_price } = product;
        const discount = Number(has_discount);
        if (discount === 1) {
            return (
                <div className='price-cart'>
                    <span className='price'>{`Rwf ${special_price}`}</span>
                    <span className='initial-price'>{`Rwf ${price}`}</span>
                </div>
            );
        }

        return (
            <div className='price-cart'>
                <span className='price'>{`Rwf ${special_price}`}</span>
            </div>
        );
    }
    showProduct(e, product) {
        e.preventDefault();
        this.setState({
            open: true
        });
        console.log('clicked');
    }

    renderProduct(product) {
        if (product) {
            return (
                <a href=''>
                    <ImageLoader 
                    imageClassName='product-img' 
                    imageUrl={product.image_url}
                    placeholderHeight={300}
                    placeholderBackgroundColor='#ffffff'
                    />
                    {this.renderProductIdentifier(product)}
                    <div className='product-description'>
                        {this.renderProductPrice(product)}
                    </div>
                </a>          
            );
        }
    }
	render() {
        const { open } = this.state;
        const { product } = this.props;
		return (
            <div className='special-single-product-wrapper'>
                <div className='single-product' onClick={this.onOpenModal}>
                    {this.renderProduct(product)}
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ProductPopup />
                </Modal>
            </div>
		);
	}
}

export default SpecialProduct;

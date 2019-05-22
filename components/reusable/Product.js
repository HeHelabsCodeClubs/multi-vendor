
import Modal from 'react-responsive-modal';
import '../../assets/styles/layouts/product.scss';
import ProductPopup from '../views/ProductPopup';
import ImageLoader from './ImageLoader';

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
                <span>
                    <span className='price'>{`Rwf ${special_price}`}</span>
                    <span className='initial-price'>{`Rwf ${price}`}</span>
                </span>
            );
        }

        return (
            <span>
                <span className='price'>{`Rwf ${price}`}</span>
            </span>
        );
    }

    renderProduct(product) {
        if (product) {
            const productDescription = product.description !== '' ? product.description : 'No description';
            return (
                <a href='/productpage'>
                    {/* <img className='product-img' src={product.image_url} /> */}
                    <ImageLoader 
                        imageClassName='product-img' 
                        imageUrl={product.image_url}
                        placeholderHeight={300}
                        placeholderBackgroundColor='#f5f5f5'
                    />
                    {this.renderProductIdentifier(product)}
                    <div className='product-description'>
                        <div className='store-logo'>
                            <img className='store-img' src={product.store.icon} />
                            <span className='store-name'>{product.store.name}</span>
                        </div>
                        <div className='product-name'>{productDescription}</div>
                        <div className='price-cart'>
                            {this.renderProductPrice(product)}
                            <span className='add-to-cart'>
                                <button><span className='icon-Path-63'></span></button>
                            </span>
                        </div>
                    </div>
                </a>            
            );
        }
        return (
            <a href='/productpage'>
                <ImageLoader 
                    imageClassName='product-img' 
                    imageUrl='https://res.cloudinary.com/hehe/image/upload/v1556288623/multi-vendor/prod_2_2x.png'
                    placeholderHeight={300}
                    placeholderBackgroundColor='#f5f5f5'
                />
                <div className='top-icons'>
                    <span className='hot'><span className='icon-Path-54'></span>hot</span>
                    <span className='discount'>50% OFF</span>
                </div>
                <div className='product-description'>
                    <div className='store-logo'>
                        <img className='store-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
                        <span className='store-name'>Amata</span>
                    </div>
                    <div className='product-name'>Amata ni meza</div>
                    <div className='price-cart'>
                        <span>
                            <span className='price'>Rwf 500</span>
                            <span className='initial-price'>Rwf 1000</span>
                        </span>
                        <span className='add-to-cart'>
                            <button><span className='icon-Path-63'></span></button>
                        </span>
                    </div>
                </div>
            </a>
        )
    }

	render() {
        const { open } = this.state;
        const { product } = this.props;
		return (
            <div>
                <div className='single-product'>
                    {this.renderProduct(product)}           
                </div>
                <Modal open={open} onClose={this.onCloseModal} center>
                    <ProductPopup />
                </Modal>
            </div>
		);
	}
}

export default Product;

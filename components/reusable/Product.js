
import '../../assets/styles/layouts/product.scss';
import ImageLoader from './ImageLoader';
import renderProductIdentifier from '../../helpers/render_product_identifier';
import renderProductPrice from '../../helpers/render_product_price';
import limitString from '../../helpers/limit_string';
import StockIncrementor from './StockIncrementer';
import addProductToCart from '../../helpers/add_product_to_cart';
import { performActionIfProductNotInCart } from '../../helpers/cart_functionality_helpers';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayQuantityIncrementor: false,
            selectedQuantity: 1,
            incrementInitial: false
        };
        this.renderProduct = this.renderProduct.bind(this);
        this.renderProductClickAction = this.renderProductClickAction.bind(this);
        this.renderQuantityIncrementor = this.renderQuantityIncrementor.bind(this);
        this.renderProductToCartButton = this.renderProductToCartButton.bind(this);
        this.updateSelectedQuantity = this.updateSelectedQuantity.bind(this);
        this.incrementCartItemProduct = this.incrementCartItemProduct.bind(this);
    }

    incrementCartItemProduct(product) {
        this.setState({
            incrementInitial: true
        });
        this.renderQuantityIncrementor(product);
    }

    renderQuantityIncrementor(product) {
        const { selectedQuantity, displayQuantityIncrementor } = this.state;

        /**
         * Adding the selected quantity to the existing product data
         * 
         */
        product.quantity = selectedQuantity;

        /**
         * Try to add product to the cart
         */
    
        try {
            performActionIfProductNotInCart(product.store.slug, product.slug, () => {
                addProductToCart(product, () => {
                    this.props.cartShouldUpdate();
                });
            });
            if (!displayQuantityIncrementor) {
                this.setState({
                    displayQuantityIncrementor: true
                });
            }
        } catch(err) {
            /**
             * Console error
             */
            if (err) {
                console.log('an error happened');
            }
        }
        
    }

    updateSelectedQuantity(quantity) {
        this.setState({
            selectedQuantity: quantity
        });
    }

    renderProductToCartButton(product) {
        const { incrementInitial, displayQuantityIncrementor } = this.state;
        if (!displayQuantityIncrementor) {
            return (
                <span className='add-to-cart'>
                    <button 
                    type='button'
                    onClick={() => this.incrementCartItemProduct(product)}>
                        <span className='icon-Path-63'></span>
                    </button>
                </span>
            );
        }

        return (
            <StockIncrementor 
            stock={product.stock}
            layout='incrementor'
            getSelectedQuantity={this.updateSelectedQuantity}
            updateCartOnChange={true}
            product={product}
            incrementInitial={incrementInitial}
            runOnCartChange={this.props.cartShouldUpdate}
            />
        );
    }

    renderProductClickAction(product) {
        if (product) {
            const { has_attributes, store, slug } = product;
            if (Number(has_attributes) == 0) {
                return this.renderProductToCartButton(product);
            }
            return (
                <span className='add-to-cart select-options'>
                    <a href={`/sellers/${store.slug}/products/${slug}`}>
                        <button><span className="select-btn__icon icon-Ellipsis_vertical"></span><span className="select-btn__txt">Select options</span></button>
                    </a>
                </span>
            );
        }
    }
    renderProduct(product) {
        if (product) {
            const { description, name } = product;
            const productDescription = (description !== '') ? limitString(description, 10) : '';
            const displayedProductTitle = (productDescription !== '') ? `${name} - ${productDescription}` : name;
            console.log('product store slug', product.store.slug);
            return (
                <div>
                    <a href={`/sellers/${product.store.slug}/products/${product.slug}`}>
                        <ImageLoader 
                            imageClassName='product-img' 
                            imageUrl={product.image_url}
                            placeholderHeight={300}
                            placeholderBackgroundColor='#f5f5f5'
                        />
                    </a>
                    {renderProductIdentifier(product)}
                    <div className='product-description'>
                        <div className='store-logo'>
                            <img className='store-img' src={product.store.icon} />
                            <span className='store-name'>{product.store.name}</span>
                        </div>
                        <div className='product-name'>{displayedProductTitle}</div>
                        <div className='price-cart single-price-cart'>
                            {renderProductPrice(product)}
                            {this.renderProductClickAction(product)}
                        </div>
                    </div>
                </div>            
            );
        }
        
    }

	render() {
        const { product } = this.props;
		return (
            <div>
                <div className='single-product'>
                    {this.renderProduct(product)}           
                </div>
            </div>
		);
	}
}

export default Product;

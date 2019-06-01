
import '../../assets/styles/layouts/product.scss';
import ImageLoader from './ImageLoader';
import renderProductIdentifier from '../../helpers/render_product_identifier';
import renderProductPrice from '../../helpers/render_product_price';
import limitString from '../../helpers/limit_string';
import StockIncrementor from './StockIncrementer';


class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displayQuantityIncrementor: false
        };
        this.renderProduct = this.renderProduct.bind(this);
        this.renderProductClickAction = this.renderProductClickAction.bind(this);
        this.renderQuantityIncrementor = this.renderQuantityIncrementor.bind(this);
        this.renderProductToCartButton = this.renderProductToCartButton.bind(this);
    }

    renderQuantityIncrementor(product) {
        this.setState({
            displayQuantityIncrementor: true
        });
    }

    renderProductToCartButton(product) {
        if (!this.state.displayQuantityIncrementor) {
            return (
                <span className='add-to-cart'>
                    <button 
                    type='button'
                    onClick={() => this.renderQuantityIncrementor(product)}>
                        <span className='icon-Path-63'></span>
                    </button>
                </span>
            );
        }
        return (
            <StockIncrementor 
            stock={product.stock} 
            layout='incrementor'
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
                        <button>Select options</button>
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

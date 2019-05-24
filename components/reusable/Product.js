
import '../../assets/styles/layouts/product.scss';
import ImageLoader from './ImageLoader';
import renderProductIdentifier from '../../helpers/render_product_identifier';
import renderProductPrice from '../../helpers/render_product_price';

class Product extends React.Component {
    constructor(props) {
        super(props);
    }
    renderProduct(product) {
        if (product) {
            return (
                <a href={`sellers/${product.store.slug}/products/${product.slug}`}>
                    {/* <img className='product-img' src={product.image_url} /> */}
                    <ImageLoader 
                        imageClassName='product-img' 
                        imageUrl={product.image_url}
                        placeholderHeight={300}
                        placeholderBackgroundColor='#f5f5f5'
                    />
                    {renderProductIdentifier(product)}
                    <div className='product-description'>
                        <div className='store-logo'>
                            <img className='store-img' src={product.store.icon} />
                            <span className='store-name'>{product.store.name}</span>
                        </div>
                        <div className='product-name'>{`${product.name} - ${product.description}`}</div>
                        <div className='price-cart'>
                            {renderProductPrice(product)}
                            <span className='add-to-cart'>
                                <button><span className='icon-Path-63'></span></button>
                            </span>
                        </div>
                    </div>
                </a>            
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

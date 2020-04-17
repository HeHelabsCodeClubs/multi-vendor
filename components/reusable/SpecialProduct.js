import ImageLoader from './ImageLoader';
import renderProductIdentifier from '../../helpers/render_product_identifier';
import renderProductPrice from '../../helpers/render_product_price';

class SpecialProduct extends React.Component {
    constructor(props) {
        super(props);
        this.renderProduct = this.renderProduct.bind(this);
    }

    renderProduct(product) {
        if (product) {
            return (
                <a href={`sellers/${product.store.slug}/products/${product.slug}`}>
                    <ImageLoader 
                    imageClassName='product-img' 
                    imageUrl={product.image_url}
                    placeholderHeight={300}
                    placeholderBackgroundColor='#ffffff'
                    />
                    {renderProductIdentifier(product)}
                    <div className='product-description'>
                        {renderProductPrice(product)}
                    </div>
                </a>        
            );
        }
    }
	render() {
        const { product } = this.props;
		return (
            <div className='special-single-product-wrapper'>
                <div className='single-product'>
                    {this.renderProduct(product)}
                </div>
            </div>
		);
	}
}

export default SpecialProduct;

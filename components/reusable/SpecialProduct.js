import Link from 'next/link';
import Router from 'next/router';
import ImageLoader from './ImageLoader';
import renderProductIdentifier from '../../helpers/render_product_identifier';
import renderProductPrice from '../../helpers/render_product_price';

class SpecialProduct extends React.Component {
    constructor(props) {
        super(props);
        this.renderProduct = this.renderProduct.bind(this);
        this.handlePageProductRedirection = this.handlePageProductRedirection.bind(this);
    }

    handlePageProductRedirection(e) {
        if (e) {
            e.preventDefault();
        }
        const { product } = this.props;
        Router.push(`/sellers/${product.store.slug}/products/${product.slug}`)
    }

    renderProduct(product) {
        if (product) {
            return (
                <Link
                href={`sellers?seller=${product.store.slug}&static=products&slug=${product.slug}`}
                as={`sellers/${product.store.slug}/products/${product.slug}`}
                >
                <a 
                //href={`sellers/${product.store.slug}/products/${product.slug}`}
                //onClick={this.handlePageProductRedirection}
                >
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
            </Link>     
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

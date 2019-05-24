import fetch from 'isomorphic-unfetch';
import Select2 from 'react-select2-wrapper';
import Product from '../components/reusable/Product';
import Global from '../components/reusable/Global';
import { API_URL } from '../config';
import renderProductIdentifier from '../helpers/render_product_identifier';
import renderProductPrice from '../helpers/render_product_price';
import getFormattedStoreUrl from '../helpers/get_formatted_store_url';
import StockIncrementor from '../components/reusable/StockIncrementer';
import ImageLoader from '../components/reusable/ImageLoader';
 
class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.renderProductMetaData = this.renderProductMetaData.bind(this);
        this.renderProductAttributes = this.renderProductAttributes.bind(this);
        this.renderAttributeSelectOption = this.renderAttributeSelectOption.bind(this);
        this.renderProductStore = this.renderProductStore.bind(this);
        this.renderProductExclusiveStoreLink = this.renderProductExclusiveStoreLink.bind(this);
        this.renderProductDescription = this.renderProductDescription.bind(this);
        this.renderProductUnitDescription = this.renderProductUnitDescription.bind(this);
        this.renderProductDiscountedPrice = this.renderProductDiscountedPrice.bind(this);
    }

    static async getInitialProps({ query }) {
		const res = await fetch(`${API_URL}/sellers/${query.seller}/products/${query.slug}`)
        const response = await res.json()
		const { 
			data
        } = response;
        return {
            productData: data
        };
    }
    
    renderProductMetaData(product) {
        if (product) {
            return (
                <div>
                    <div className='product-name'>{product.name}</div>
                        {renderProductIdentifier(product)}
                        <div className='product-detail'>
                            <span className='details-title'>Price:</span>
                            {renderProductPrice(product)}
                            {this.renderProductUnitDescription(product.attributes)}
                            {this.renderProductDiscountedPrice(product)}
                        </div>
                </div>
            )
        }
    }

    renderProductDiscountedPrice(product) {
        if (product) {
            const { has_discount, price, special_price } = product;
            if (has_discount) {
                const discountedPrice = price - special_price;
                return (
                    <span className='details-title'>{`You save Rwf ${discountedPrice}`}</span>
                );
            }
        }
    }

    renderProductUnitDescription(attributes) {
        if (attributes) {
            const { descquantity } = attributes;
            if (descquantity && descquantity!== '') {
                return (
                    <span className='details-title'>&nbsp; {descquantity}</span>
                );
            }
        }
    }

    renderProductAttributes(attributes) {
        if (attributes) {
            const { options } = attributes;
            if (options) {
                const attributesLayout = options.map((option) => {
                    switch(option.type) {
                        case 'select':
                            return this.renderAttributeSelectOption(option);
                        default:
                            return null;
                    }
                })

                return attributesLayout;
            }
        }
    }

    renderAttributeSelectOption(option) {
        const SelectorData = option.data.map((option_item) => {
            return {
                text: option_item.title,
                id: option_item.option_id
            };
        });
        return (
            <div className='product-detail' key={option.title}>
                <span className='details-title'>{`${option.title}:`}</span>
                <span className='select-dropdown'>
                    <Select2
                        data={SelectorData}
                        options={
                            { placeholder: 'Select' }
                        }
                    />
                </span>
            </div>
        );
    }

    renderProductStore(has_store_url, store) {
        if (store) {
            return (
                <div className='product-detail'>
                    <span className='details-title'>Store:</span>
                    <span className='product-store'>
                        <span className='store-img'>
                            <ImageLoader 
                            imageUrl={store.icon}
                            placeholderBackgroundColor='#ffffff'
                            />
                        </span>
                        <span className='store-content'>
                            <div className='content'>
                                View more from &nbsp; <span className='black'> {store.name} store 
                                </span>&nbsp; here
                            </div>
                            {this.renderProductExclusiveStoreLink(has_store_url, store)}
                        </span>
                    </span>
                </div>
            );
        }
    }

    renderProductExclusiveStoreLink(has_store_url, store) {
        if (Number(has_store_url) == 1) {
            return (
                <a 
                target='_blank' 
                className='content bottom'
                href={store.url}
                >
                    or visit &nbsp; <span className='orange'> {getFormattedStoreUrl(store.url)}
                    </span>
                </a>
            );
        }
    }

    renderProductDescription(productData) {
        if (productData) {
            const { attributes } = productData;
            if (attributes) {
                const { short_description, description, descquantity } = attributes;
                if ((short_description !== '') || (description !== '')) {
                    if (descquantity && (descquantity !== short_description) && (descquantity !== description)) {
                        const displayedDescription = description !== '' ? description : short_description;
                        return (
                            <div className='description-details'>
                                <div className='desc-title'>Product Details</div>
                                <p className='desc-content'>
                                    {displayedDescription}
                                </p>
                            </div>
                        );
                    }
                }
            }
        }
    }


	render() {
        const { productData } = this.props;
		return (
            <Global>
                <div>
                    <div className='popup-wrapper'>
                        <div className='product-details-wrapper'>
                            <div className='row reset-row'>
                                <div className='col-lg-5 col-md-5 col-sm-5 col-12 images-wrapper'>
                                    <img className='big-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                    <div className='row'>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                            <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                            <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                            <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                        </div>
                                        <div className='col-lg-3 col-md-3 col-sm-3 col-3'>
                                            <img className='small-prod-img' src='https://res.cloudinary.com/hehe/image/upload/q_auto,f_auto,fl_lossy/v1556288624/multi-vendor/prod_3_2x.png' />
                                        </div>
                                    </div>
                                </div>
                                <div className='col-lg-7 col-md-7 col-sm-7 col-12 description-wrapper'>
                                    <div className='details'>
                                        {this.renderProductMetaData(productData)}
                                        {this.renderProductAttributes(productData.attributes)}
                                        <StockIncrementor stock={productData.stock} />
                                        <div className='product-detail'>
                                            <span className='orange-btn'>
                                                <button>Add to Cart</button>
                                            </span>
                                            <span className='white-btn'>
                                                <button>Direct Buy</button>
                                            </span>
                                            <span className='white-btn'>
                                                <button>Add to Wishlist</button>
                                            </span>
                                        </div>
                                        {this.renderProductStore(productData.belongs_to_exclusive_store, productData.store)}
                                    </div>
                                   {this.renderProductDescription(productData)}
                                </div>
                            </div>  
                        </div>
                    </div>
                    <div className='products-title'>Related Items</div>
                    <div className='row reset-row popup-products'>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                    </div>
                    <div className='products-title'>Often bought with</div>
                    <div className='row reset-row popup-products'>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                        <div className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'>
                            <Product />
                        </div>
                    </div>
                </div>
            </Global>
		);
	}
}

export default ProductPage;

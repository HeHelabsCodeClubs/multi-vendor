import fetch from 'isomorphic-unfetch';
import Select2 from 'react-select2-wrapper';
import Slider from "react-slick";
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
        this.state = {
            nav1: null,
            nav2: null
        };
        this.renderProductMetaData = this.renderProductMetaData.bind(this);
        this.renderProductAttributes = this.renderProductAttributes.bind(this);
        this.renderAttributeSelectOption = this.renderAttributeSelectOption.bind(this);
        this.renderProductStore = this.renderProductStore.bind(this);
        this.renderProductExclusiveStoreLink = this.renderProductExclusiveStoreLink.bind(this);
        this.renderProductDescription = this.renderProductDescription.bind(this);
        this.renderProductUnitDescription = this.renderProductUnitDescription.bind(this);
        this.renderProductDiscountedPrice = this.renderProductDiscountedPrice.bind(this);
        this.renderProductImages = this.renderProductImages.bind(this);
        this.getSlidesToShow = this.getSlidesToShow.bind(this);
        this.renderSimilarProducts = this.renderSimilarProducts.bind(this);
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
    componentDidMount() {
        this.setState({
          nav1: this.slider1,
          nav2: this.slider2
        });
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

    getSlidesToShow(images) {
        if(images.length >= 4) {
            return 4;
        }

        return images.length;
    }

    renderProductImages(productData) {
        if (productData) {
            const { images } = productData;
            if (images) {
                const mainSliderImages = images.map((image) => {
                    return (
                        <div key={image.image_url}>
                            <ImageLoader 
                            className='big-prod-img' 
                            imageUrl={image.image_url} 
                            />
                        </div>
                    );
                });

                const thumbnailImages = images.map((image) => {
                    return (
                        <div key={image.image_url}>
                            <ImageLoader 
                            className='small-prod-img' 
                            imageUrl={image.image_url}
                            />
                        </div>
                    );
                });

                return (
                    <div>
                        <div className='slide-for'>
                            <Slider
                            asNavFor= {this.state.nav2}
                            ref= {slider => (this.slider1 = slider)}
                            slidesToShow={1}
                            slidesToScroll={1}
                            arrows={false}
                            fade={true}
                            >
                              {mainSliderImages}  
                            </Slider>
                        </div>
                        <div className='slide-nav'>
                            <Slider
                            //infinite={false}
                            asNavFor={this.state.nav1}
                            ref={slider => (this.slider2 = slider)}
                            slidesToShow={this.getSlidesToShow(images)}
                            slidesToScroll={1}
                            dots={false}
                            focusOnSelect={true}
                            rows={1}
                            >
                                {thumbnailImages}
                            </Slider>
                        </div>
                    </div>
                );
            }
        }
        
    }

    renderSimilarProducts(products, type) {
        if (products) {
            const sectionTitle = type === 'related' ? 'Related Items' : 'Often bought with';
            const similarProductsLayout = products.map((product) => {
                return (
                    <div 
                    className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'
                    key={product.slug}
                    >
                        <Product product={product} />
                    </div>
                );
            })

            return (
                <div>
                    <div className='products-title'>{sectionTitle}</div>
                    <div className='row reset-row popup-products'>
                        {similarProductsLayout}
                    </div>
                </div>
            )
        }
    }


	render() {
        const { productData } = this.props;
		return (
            <Global>
                <div className='maximum-width'>
                    <div className='single-product-page'>
                        <div className='popup-wrapper'>
                            <div className='product-details-wrapper'>
                                <div className='row reset-row'>
                                    <div className='col-lg-5 col-md-5 col-sm-5 col-12 images-wrapper'>
                                        {this.renderProductImages(productData)}
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
                        {this.renderSimilarProducts(productData.related_products, 'related')}
                        {this.renderSimilarProducts(productData.cross_sell_products, 'often_bought_with')}
                    </div>
                </div>
            </Global>
		);
	}
}

export default ProductPage;

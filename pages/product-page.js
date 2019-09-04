import _ from 'lodash';
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import Slider from "react-slick";
import { notify } from 'react-notify-toast';
import Product from '../components/reusable/Product';
import Global from '../components/reusable/Global';
import { API_URL, ALERT_TIMEOUT, NOT_ALLOWED_TO_GO_IN_CART } from '../config';
import renderProductIdentifier from '../helpers/render_product_identifier';
import renderProductPrice from '../helpers/render_product_price';
import getFormattedStoreUrl from '../helpers/get_formatted_store_url';
import StockIncrementor from '../components/reusable/StockIncrementer';
import ImageLoader from '../components/reusable/ImageLoader';
import addProductToCart from '../helpers/add_product_to_cart';
import AttributeOptionSelector from '../components/reusable/AttributeOptionSelector';
import isObjectEmpty from '../helpers/is_object_empty';
import { getClientAuthToken } from '../helpers/auth';
import { getCartItems } from '../helpers/cart_functionality_helpers';
import Breadcrumb from '../components/reusable/Breadcrumb';
import {isProductOutOfStock } from '../helpers/cart_functionality_helpers';
import Head from 'next/head';
 
class ProductPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null,
            updateCart: false,
            selectedProductQuantity: 1,
            selectedAttributes: {},
            resetSelectedAttribute: false,
            addToCartSubmitStatus: 'initial',
            cartItemsAvailable: false,
            openCartContent: false
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
        this.saveProductToCart = this.saveProductToCart.bind(this);
        this.updateSelectedProductQuantity = this.updateSelectedProductQuantity.bind(this);
        this.saveSelectedAttributeValue = this.saveSelectedAttributeValue.bind(this);
        this.updateExistingSelectedAttributes = this.updateExistingSelectedAttributes.bind(this);
        this.validateAttributeOptions = this.validateAttributeOptions.bind(this);
        this.getAddToCartButtonText = this.getAddToCartButtonText.bind(this);
        this.performAfterAddingProductToCart = this.performAfterAddingProductToCart.bind(this);
        this.handleDirectBuy = this.handleDirectBuy.bind(this);
        this.getDirectBuyButton = this.getDirectBuyButton.bind(this);
        this.HandleCartContentOpening = this.HandleCartContentOpening.bind(this);
        this.productIsAllowedToGoInCart = this.productIsAllowedToGoInCart.bind(this);
        this.productIsNotAllowedToGoInCart = this.productIsNotAllowedToGoInCart.bind(this);
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

        getCartItems((items) => {
            if (!_.isEmpty(items)) {
                this.setState({
                    cartItemsAvailable: true
                });
            } else {
                this.setState({
                    cartItemsAvailable: false
                });
            }
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
                    <Head>
                        <title>{product.attributes.meta_title}</title>
                        <meta name="description" content={`${product.attributes.meta_description}`} />
                        <meta name="keywords" content={`${product.attributes.meta_keywords}`} />
                    </Head>
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

    saveSelectedAttributeValue(e) {
        if (e !== undefined) {
            try{
                const attributeValue = JSON.parse(e.target.value);
                const { selectedAttributes } = this.state;
                if (isObjectEmpty(selectedAttributes)) {
                    this.updateExistingSelectedAttributes(attributeValue);
                } else {
                    if (selectedAttributes.hasOwnProperty(attributeValue.option_name)) {
                        this.updateExistingSelectedAttributes(attributeValue);
                    } else {
                        this.updateExistingSelectedAttributes(attributeValue);
                    }
                }
            } catch(err) {
                
            }
            
        }
        
    }

    updateExistingSelectedAttributes(attributeValue) {
        const { selectedAttributes } = this.state;
        const newAttributes = selectedAttributes;
        newAttributes[attributeValue.option_name] = attributeValue.data;
        this.setState({
            selectedAttributes: newAttributes
        });
    }

    renderAttributeSelectOption(option) {
        if (option) {
            const { resetSelectedAttribute } = this.state;
            return (
                <AttributeOptionSelector
                resetSelectedValue={resetSelectedAttribute} 
                option={option}
                getSelectedAttributeValue={this.saveSelectedAttributeValue} 
                />
            );
        }
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
                const displayedDescription = description !== '' ? description : short_description;
                if ((short_description !== '') || (description !== '')) {
                    if (descquantity && (descquantity !== short_description) && (descquantity !== description)) {
                        return (
                            <div className='description-details'>
                                <div className='desc-title'>Product Details</div>
                                <p className='desc-content'>
                                    {displayedDescription}
                                </p>
                            </div>
                        );
                    }

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

    getSlidesToShow(images) {
        if (images.length === 1) {
            return 1;
        }
        
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
                            placeholderHeight={600} 
                            placeholderBackgroundColor='#ffffff'
                            />
                        </div>
                    );
                });

                let thumbnailImages = [];
                if (images.length > 1) {
                    thumbnailImages = images.map((image) => {
                        return (
                            <div key={image.image_url}>
                                <ImageLoader 
                                className='small-prod-img' 
                                imageUrl={image.image_url}
                                placeholderHeight={100}
                                placeholderBackgroundColor='#ffffff'
                                />
                            </div>
                        );
                    });
                }

                if (thumbnailImages.length < 1) {
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
                        </div>
                    );
                }
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
            if (products.length > 0) {
                const sectionTitle = type === 'related' ? 'Related items' : 'Often bought with';
                const similarProductsLayout = products.map((product) => {
                    return (
                        <div 
                        className='product_item'
                        key={product.slug}
                        >
                            <Product product={product} />
                        </div>
                    );
                });
    
                return (
                    <div>
                        <div className='products-title'>{sectionTitle}</div>
                        <div className='row reset-row popup-products'>
                            {similarProductsLayout}
                        </div>
                    </div>
                );
            }
        }
    }

    updateSelectedProductQuantity(quantity) {
        this.setState({
            selectedProductQuantity: quantity
        });
    }

    saveProductToCart(product) {
        const { selectedProductQuantity, selectedAttributes, addToCartSubmitStatus } = this.state;
        

        if (Number(product.has_attributes) === 1) {
            /**
             * Validate selected attributes if they require validation
             */
            const errors = this.validateAttributeOptions(product.attributes.options);
            if (errors.length !== 0) {
                notify.show(errors[0], 'error', ALERT_TIMEOUT);
                return;
            }
        }


        if (addToCartSubmitStatus === 'initial') {
            this.setState({
                addToCartSubmitStatus: 'submitting'
            });

            setTimeout(() => {
                product.quantity = selectedProductQuantity;
                if (Number(product.has_attributes) === 1) {
                    product.selected_options = selectedAttributes;
                }
                const productOptions = [];
                if (Number(product.has_attributes) === 1) {
                    Object.keys(product.selected_options).forEach((key) => {
                        productOptions.push({
                            attribute_id: product.selected_options[key].attribute_id,
                            option_id: product.selected_options[key].option_id
                        });
                    });
                }

                const { name } = product;

                /**
                 * First check if product is out of stock or not
                 */
                isProductOutOfStock(product.slug, productOptions, () => this.productIsAllowedToGoInCart(product), () => { this.productIsNotAllowedToGoInCart(name) });
            }, 2000);
        }
    }

    productIsAllowedToGoInCart(product) {
        addProductToCart(product, () => {
            this.performAfterAddingProductToCart(product)
        });
    }

    productIsNotAllowedToGoInCart(product_name) {
        this.setState({
            addToCartSubmitStatus: 'initial'
        });
        const errorMessage = `${product_name} ${NOT_ALLOWED_TO_GO_IN_CART}`;
        notify.show(errorMessage, 'error', ALERT_TIMEOUT);
    }

    HandleCartContentOpening() {
        const { openCartContent } = this.state;
        
        if (openCartContent) {
            this.setState ({
                openCartContent: false
            });
        } else {
            this.setState ({
                openCartContent: true
            })
        }
    }

    performAfterAddingProductToCart(product) {

        this.setState({
            updateCart: true,
            addToCartSubmitStatus: 'submitted'
        });

        // Display message to user
        const successMessage = `${product.name} was added to your shopping cart. Visit your shopping cart to checkout`;
        notify.show(successMessage, 'success', ALERT_TIMEOUT);

        // open cart content sidebar 
        this.HandleCartContentOpening();
        setTimeout(
            () => {
                this.HandleCartContentOpening();
            },
            500
        );

        setTimeout(() => {
            this.setState({
                resetSelectedAttribute: true,
                selectedAttributes: {},
                addToCartSubmitStatus: 'initial'
            });
            setTimeout(() => {
                this.setState({
                    resetSelectedAttribute: false
                });
            }, 500);
        }, 2000);
    }
    validateAttributeOptions(attributeOptions) {
        const { selectedAttributes } = this.state;
        const errors = [];
        for (let i = 0; i < attributeOptions.length; i++) {
            const { is_required, title } = attributeOptions[i];
            if (Number(is_required) === 1) {
                if (selectedAttributes[title] === undefined) {
                    errors.push(`Please select ${title} to proceed`);
                }
            }
        }
        return errors;
    }

    getAddToCartButtonText() {
        const { addToCartSubmitStatus } = this.state;
        switch(addToCartSubmitStatus) {
            case 'submitting':
                return 'Adding to Cart';
            case 'submitted':
                return 'Added to Cart';
            default:
                return 'Add to Cart';
        }
    }

    getDirectBuyButton() {
        const { cartItemsAvailable } = this.state;
        if (!cartItemsAvailable) {
            return null;
        } else {
            return (
                <button 
                className='white-btn direct-buy__btn'
                type='submit'
                onClick={this.handleDirectBuy}
                >
                    Direct Buy
                </button>
            );
        }
    }

    handleDirectBuy() {
        const token = getClientAuthToken();
        if (token) {
            Router.push('/checkout/addresses');
            return;
        }

        Router.push('/checkout/account');
    }

    renderBreadCrumb() {
        const { activeParentCategory, activeSubCategory, productData } = this.props;

        return (
            <Breadcrumb>
                <a href="/" className="breadcrumb-link">Home</a>
                    <span> / </span>
                <a href="" className="breadcrumb-link">{productData.name}</a>
            </Breadcrumb>
        )
    }

	render() {
        const { productData } = this.props;
        const { openCartContent} = this.state;
		return (
            <div>
                <Global 
                updateCart={this.state.updateCart}
                openCart = {openCartContent}
                >
                    <div className='maximum-width'>
                        <div className='single-product-page'>
                            <div className='popup-wrapper'>
                                <div className='product-details-wrapper'>
                                    {this.renderBreadCrumb()}
                                    <div className='row reset-row'>
                                        <div className='col-lg-5 col-md-5 col-sm-5 col-12 images-wrapper'>
                                            {this.renderProductImages(productData)}
                                        </div>
                                        <div className='col-lg-7 col-md-7 col-sm-7 col-12 description-wrapper'>
                                            <div className='details'>
                                                {this.renderProductMetaData(productData)}
                                                
                                                {this.renderProductAttributes(productData.attributes)}
                                                <StockIncrementor 
                                                stock={productData.stock}
                                                getSelectedQuantity={this.updateSelectedProductQuantity} 
                                                />
                                                <div className='product-detail'>
                                                    <button
                                                    type='button'
                                                    className='orange-btn'
                                                    onClick={() => this.saveProductToCart(productData)}
                                                    >
                                                    {this.getAddToCartButtonText()}
                                                    </button>
                                                    {this.getDirectBuyButton()}
                                                    {/* <button className='white-btn'>Add to Wishlist</button> */}
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
            </div>
		);
	}
}

export default ProductPage;

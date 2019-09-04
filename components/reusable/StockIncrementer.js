import React, { Component } from 'react';
import addProductToCart from '../../helpers/add_product_to_cart';
import isObjectEmpty from '../../helpers/is_object_empty';
import { 
    getCartProductQuantityValue, 
    getProductAttributeOptions 
} from '../../helpers/cart_functionality_helpers';

class StockIncrementor extends Component {
    constructor(props) {
        super(props);
        this.errorMessageRef = React.createRef();
        this.state = {
            initialStockIncrement: 1,
            stock: 0,
            errorMessage: '',
            productAttributeOptions: {} // for only products with attribute options
        };
        this.renderIncrementor = this.renderIncrementor.bind(this);
        this.incrementStock = this.incrementStock.bind(this);
        this.decrementStock = this.decrementStock.bind(this);
        this.renderLayout = this.renderLayout.bind(this);
        this.displayIncrementError = this.displayIncrementError.bind(this);
        this.saveProductToCartOnChange = this.saveProductToCartOnChange.bind(this);
        this.updateToInitialQuantity = this.updateToInitialQuantity.bind(this);
        this.shouldUpdateInititalQuantity = this.shouldUpdateInititalQuantity.bind(this);
    }

    componentDidMount() {
        this.shouldUpdateInititalQuantity();
        const { stock } = this.props;
        this.setState({
            stock: Number(stock)
        });
    }

    componentWillReceiveProps(nextProps) {
        const { updateInitial } = nextProps;
        if (updateInitial) {
            this.shouldUpdateInititalQuantity();
        }
    }

    shouldUpdateInititalQuantity() {
        const { product, index } = this.props;
        if (product) {
            try {
                const { has_attributes } = product;
                const productIndex = Number(has_attributes) === 1 ? index : undefined; 
                getCartProductQuantityValue(
                    product,
                    this.updateToInitialQuantity,
                    productIndex
                );

                if (productIndex !== undefined) {
                    getProductAttributeOptions(
                        product,
                        productIndex,
                        (attributeOptions) => {
                            this.setState({
                                productAttributeOptions: attributeOptions
                            });
                        }
                    )
                }
            } catch(err) {
                console.log(err);
            }
        }
    }

    updateToInitialQuantity(quantity) {
        let newQuantity = Number(quantity);
        if (this.props.incrementInitial) {
            newQuantity = newQuantity + 1;
            this.saveProductToCartOnChange(newQuantity);
        }
        this.setState({
            initialStockIncrement: newQuantity
        });
    }

    incrementStock() {
        const { initialStockIncrement, stock } = this.state;
        if (initialStockIncrement !== stock) {
            const newStock = initialStockIncrement + 1;
            if (this.props.getSelectedQuantity !== undefined) {
                this.props.getSelectedQuantity(newStock);
            }
            /**
             * Check if we have to add product to cart as we increment
             */
            this.saveProductToCartOnChange(newStock);

            this.setState({
                initialStockIncrement: newStock
            });
        }

        if (initialStockIncrement === stock) {
            this.setState({
                errorMessage: `Only up to ${stock} items`
            });

            setTimeout(() => {
                this.setState({
                    errorMessage: ''
                });
            }, 1000);
        }
    }

    decrementStock() {
        const { initialStockIncrement} = this.state;
        if (initialStockIncrement !== 1) {
            const newStock = initialStockIncrement - 1;
            if (this.props.getSelectedQuantity !== undefined) {
                this.props.getSelectedQuantity(newStock);
            }
            /**
             * Check if we have to add product to cart as we increment
             */
            this.saveProductToCartOnChange(newStock);

            this.setState({
                initialStockIncrement: newStock
            });
        } 

        if (initialStockIncrement === 1) {
            this.setState({
                errorMessage: 'At least 1 item' 
            });
            setTimeout(() => {
                this.setState({
                    errorMessage: ''
                });
            }, 1000);
        }
    }

    saveProductToCartOnChange(newStock) {
        const { updateCartOnChange, product, runOnCartChange, index } = this.props;
        if (updateCartOnChange) {
            if (product) {
                product.quantity = newStock;
                const { productAttributeOptions } = this.state;
                if (!isObjectEmpty(productAttributeOptions)) {
                    product.selected_options = productAttributeOptions;
                }

                if (index !== undefined) {
                    product.index = index;
                }
                
                addProductToCart(product, ()=> {
                    if (runOnCartChange !== undefined) {
                        runOnCartChange();
                    }
                });
            }
        }
    }

    displayIncrementError() {
        const { errorMessage } = this.state;
        if (errorMessage !== '') {
            return (
                <div
                className='quantity-error-container'
                >
                    <h5>
                        {errorMessage}
                    </h5>
                </div>
            );
        }
    }

    renderIncrementor(initial) {
        const layoutClass = (this.props.layout !== 'incrementor') ? 'qty-increment' : 'qty-increment only';

        return (
            <span 
            className={layoutClass}
            >
                <button 
                type='button'
                onClick={this.decrementStock} 
                className='decrement'>
                    -
                </button>
                    <span className='number'>{initial}</span>
                <button 
                type='button' 
                onClick={this.incrementStock}
                className='increment'>
                    +
                </button>
            </span>
        );
        
    }

    renderLayout(defaultLayout) {
        const { initialStockIncrement, stock, errorMessage } = this.state;
        const wrapperClass = (errorMessage !== '') ? 'product-detail error' : 'product-detail';
        switch(defaultLayout) {
            case 'incrementor':
                return (
                    <div className={wrapperClass}>
                        {this.displayIncrementError()}
                        {this.renderIncrementor(initialStockIncrement)}
                    </div>
                );
            default:
                return (
                    <div className={wrapperClass}>
                        <span className='details-title'>Quantity:</span>
                        {this.renderIncrementor(initialStockIncrement)}
                        <span className='details-title'>{`(${stock} pieces available)`}</span>
                    </div>
                );
        }
    }

    render() {
        const { layout } = this.props;
        return this.renderLayout(layout);
    }
}

export default StockIncrementor;
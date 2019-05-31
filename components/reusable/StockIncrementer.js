import React, { Component } from 'react';
import ReactTooltip from 'react-tooltip'

class StockIncrementor extends Component {
    constructor(props) {
        super(props);
        this.errorMessageRef = React.createRef();
        this.state = {
            initialStockIncrement: 1,
            stock: 0,
            errorMessage: 'Only up to 49 items'
        };
        this.renderIncrementor = this.renderIncrementor.bind(this);
        this.incrementStock = this.incrementStock.bind(this);
        this.decrementStock = this.decrementStock.bind(this);
        this.renderLayout = this.renderLayout.bind(this);
        this.displayIncrementError = this.displayIncrementError.bind(this);
    }

    componentWillMount() {
        const { stock } = this.props;
        this.setState({
            stock: Number(stock)
        });
    }

    incrementStock() {
        const { initialStockIncrement, stock } = this.state;
        if (initialStockIncrement !== stock) {
            const newStock = initialStockIncrement + 1;
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
            }, 2000);
        }
    }

    decrementStock() {
        const { initialStockIncrement} = this.state;
        if (initialStockIncrement !== 1) {
            const newStock = initialStockIncrement - 1;
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
            }, 2000);
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
        const { initialStockIncrement, stock } = this.state;
        switch(defaultLayout) {
            case 'incrementor':
                return (
                    <div className='product-detail'>
                        {this.displayIncrementError()}
                        {this.renderIncrementor(initialStockIncrement)}
                    </div>
                );
            default:
                return (
                    <div className='product-detail'>
                        <span className='details-title'>Quantity:</span>
                        {this.renderIncrementor(initialStockIncrement)}
                        <span className='details-title'>{`(${stock} peaces available)`}</span>
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
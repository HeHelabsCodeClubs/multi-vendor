import React, { Component } from 'react';

class StockIncrementor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            initialStockIncrement: 1,
            stock: 0
        };
        this.renderIncrementor = this.renderIncrementor.bind(this);
        this.incrementStock = this.incrementStock.bind(this);
        this.decrementStock = this.decrementStock.bind(this);
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
    }

    decrementStock() {
        const { initialStockIncrement} = this.state;
        if (initialStockIncrement !== 1) {
            const newStock = initialStockIncrement - 1;
            this.setState({
                initialStockIncrement: newStock
            });
        } 
    }

    renderIncrementor(initial) {
        return (
            <span className='qty-increment'>
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

    render() {
        const { initialStockIncrement, stock } = this.state;
        return (
            <div className='product-detail'>
                <span className='details-title'>Quantity:</span>
                {this.renderIncrementor(initialStockIncrement)}
                <span className='details-title'>{`(${stock} peaces available)`}</span>
            </div>
        )
    }
}

export default StockIncrementor;
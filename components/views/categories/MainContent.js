import TopStores from './TopStores';
import Product from '../../reusable/Product';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: []
        };
        this.renderProducts = this.renderProducts.bind(this);
    }

    componentDidMount() {
        const { products } = this.props;
        this.setState({
            products
        });
    }

    renderProducts() {
        const { products } = this.state;
        if (products.length !== 0) {
            const productsLayout = products.map((product) => {
                return (
                    <div 
                    key={product.slug}
                    className='col-lg-3 col-md-3 col-sm-4 col-6 col-reset'
                    >
                        <Product product={product} />
                    </div>
                );
            });
            return productsLayout;
        }
        return (
            <div className="empty-category">
                <p>
                    We have no product in this category
                </p>
            </div>
        );
    }
 
	render() {
		return (
			<div>
                <div>
                    <TopStores />
                </div>
                <div className='row reset-row main-content'>
                   {this.renderProducts()}
                </div>
            </div>
		);
	}
}

export default MainContent;
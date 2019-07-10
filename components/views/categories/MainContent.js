import TopStores from './TopStores';
import Product from '../../reusable/Product';
import Loader from '../../reusable/Loader';

class MainContent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            firstTimeLoad: true,
            showLoader: false
        };
        this.renderProducts = this.renderProducts.bind(this);
    }

    componentDidMount() {
        const { products } = this.props;
        this.setState({
            products,
            firstTimeLoad: false
        });
    }

    componentWillReceiveProps(nextProps) {
        const { updatedProducts, showLoader } = nextProps;
        const { firstTimeLoad, products } = this.state;

        if (!firstTimeLoad) {
            if (updatedProducts.length !== products.length) {
                this.setState({
                    products: updatedProducts
                });
            }

            if (showLoader !== this.state.showLoader) {
                this.setState({
                    showLoader: showLoader
                });
            }
        }
    }

    renderProducts() {
        const { products, showLoader } = this.state;
        const { cartShouldUpdate } = this.props;
        if (showLoader) {
            return (
               <Loader />
            );
        }

        if (products.length !== 0) {
            const productsLayout = products.map((product) => {
                return (
                    <div 
                    key={product.slug}
                    className='col-lg-3 col-md-4 col-sm-6 col-6 col-reset'
                    >
                        <Product 
                        product={product} 
                        cartShouldUpdate={cartShouldUpdate}
                        />
                    </div>
                );
            });
            return (
                <div>
                    <div class="row reset-row">
                        {productsLayout}
                    </div>
                </div>
            ) 
        }

        if (products.length === 0) {
            return (
                <div className="empty-category">
                    <p>
                        We have no product in this category
                    </p>
                </div>
            );
        }
        
    }

    handlePagesClick () {

    }

    loadMoreProducts() {
        this.setState({
            currentPage: metaProductsData.current_page,
            lastPage: metaProductsData.last_page
        });
    }
 
	render() {
		return (
			<div>
                <div>
                    <TopStores />
                </div>
                <div className='main-content'>
                   {this.renderProducts()}
                </div>
            </div>
		);
	}
}

export default MainContent;
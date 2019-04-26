import Link from 'next/link'; 

class Product extends React.Component {
	render() {
		return (
			<div className=''>
                <img className='product-img' src='https://res.cloudinary.com/hehe/image/upload/v1556288624/multi-vendor/prod_3_2x.png' />
                <div className='store-logo'>
                    <img className='' src='https://res.cloudinary.com/hehe/image/upload/v1556288678/multi-vendor/shop-icon-4_2x.png' />
                </div>
                <div className='product-name'>Full detailed Product title - and info about it... for home use only</div>
                <div>
                    <span className='price'>Rwf 5000</span>
                    <span className='initial-price'>Rwf 10000</span>
                    <span className='add-to-cart'>
                        <button><span className='icon-Path-63'></span></button>
                    </span>
                </div>
            </div>
		);
	}
}

export default Product;
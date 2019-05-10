import SideMenu from 'react-sidemenu';


const items = [
    { divider: true, label: 'Uzuri Categories', value: 'main-nav' },
    {
        label: 'Womens clothing' , value: 'clothing',
        children: [
            {label: 'Dresses', value: 'Dresses'},
            { label: 'Sweaters', value: 'Sweaters' },
            { label: 'Jumpsuits', value: 'Jumpsuits' },
            { label: 'Bodysuits', value: 'Bodysuits' },
            { label: 'Blouses & Shirts', value: 'Blouses' }
        ]
    },
    {
        label: 'Shoes', value: 'shoes',
        children: [
            {label: 'Open shoes', value: 'open'},
            { label: 'Closed shoes', value: 'close' }
        ]
    },
    { label: 'Bags', value: 'bags' },
    { label: 'Jewelry & Accessories', value: 'accessories' }
];

class SellerCategories extends React.Component {
    render() {
        return (
            <div>
                <div className='seller-category-search'>
                    <div className='search-wrapper'>
                        <input type="text" placeholder="Search in uzuri" />
                        <button type="submit"><span className="icon-Path-64"></span></button>
                    </div>
                </div>
                <SideMenu items={items} />
            </div>
        );
    }
}

export default SellerCategories;
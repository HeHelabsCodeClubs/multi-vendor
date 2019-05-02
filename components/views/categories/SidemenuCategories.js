import SideMenu from 'react-sidemenu';


const items = [
    { divider: true, label: 'All Categories', value: 'main-nav' },
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

class SidemenuCategories extends React.Component {
    render() {

        return (
            <div>
                <SideMenu items={items} />
            </div>
        );
    }
}

export default SidemenuCategories;
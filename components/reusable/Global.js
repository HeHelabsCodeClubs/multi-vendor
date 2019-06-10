import Header from './header/Header';
import Footer from './Footer';
import '../../assets/styles/layouts/header.scss';

const Global = props => (
    <div className='site-wrapper'>
        <Header />
            {props.children}
        <Footer />
    </div>
);

export default Global;
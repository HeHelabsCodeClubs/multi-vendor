import Header from './Header'
import '../../assets/styles/layouts/header.scss';

const Global = props => (
    <div className='site-wrapper'>
        <Header />
        {props.children}
    </div>
)

export default Global;
import Header from './Header'
import '../../assets/styles/layouts/header.scss';

const Global = props => (
    <div>
        <Header />
        {props.children}
    </div>
)

export default Global;
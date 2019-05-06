import Link from 'next/link';
import ProductPopup from '../ProductPopup';

class Billing extends React.Component {

	render() {
		return (
            <div className='account-info-wrapper'>
				<div className='account-info-title'>Shipping address</div>
				<form className='row reset-row signin-form' >
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='First name' />
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='Last name' />
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='email' placeholder='Email' />
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='Phone' />
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='City' />
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='Neighborhood' />
					</div>
					<div className=' col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='Street no' />
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12 input-field'>
						<input type='text' placeholder='House no' />
					</div>
					<div className='col-lg-6 col-md-6 col-sm-6 col-12'>
						<div className='input-checkbox'>
							<span className='remember'>Address type</span>
							<span className='remember'><input type='checkbox' />Residential</span>
							<span className='remember'><input type='checkbox' />Commercial</span>
						</div>
						<div className='input-checkbox'>
							<span className='remember'><input type='checkbox' />Billing and shipping address are the same</span>
						</div>
					</div>
				</form>
            </div>
		);
	}
}

export default Billing;
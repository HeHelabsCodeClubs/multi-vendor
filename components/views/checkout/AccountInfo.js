import Link from 'next/link';

class AccountInfo extends React.Component {

	render() {
		return (
            <div className='account-info-wrapper'>
                <div className='row reset-row'>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-12 signin-block'>
                        <div className='account-info-title'>Returning customer</div>
                        <form className='signin-form' >
                            <div className='input-field'>
                                <input type='email' placeholder='Email' />
                            </div>
                            <div className='input-field'>
                                <input type='password' placeholder='Password' />
                            </div>
                            <div className='signin-content'>
                                <div className='content'><Link href=''><a>Forgot your password?</a></Link></div>
                                <div className='content'>or <Link href=''><a>Register for a new HeHe account</a></Link></div>
                            </div>
                            <div className='input-checkbox'>
                                <span className='remember'><input type='checkbox' />Remember me</span>
                                <button className='auth-button'>Sign In</button>
                            </div>
                        </form>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-12 signup-block'>
                        <div className='account-info-title'>New customer</div>
                        <div className='register-content'>
                            <div className='content'>Create a permanent HeHe account <br />and use it for checkout</div>
                        </div>
                        <button className='auth-button'>Register</button>
                    </div>
                </div>
            </div>
		);
	}
}

export default AccountInfo;
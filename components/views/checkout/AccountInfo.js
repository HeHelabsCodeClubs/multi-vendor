import Link from 'next/link';
import SignInForm from '../signin/SignInForm';
import SignupForm from '../signup/SignupForm';
import Breadcrumb from '../../reusable/Breadcrumb';
import '../../../assets/styles/layouts/landing.scss';
import '../../../assets/styles/layouts/auth.scss';

class AccountInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userWantsToRegister: false
        };
        this.displayRegistrationForm = this.displayRegistrationForm.bind(this);
        this.renderBreadCrumbs = this.renderBreadCrumbs.bind(this);
    }

    displayRegistrationForm() {
        this.setState({
            userWantsToRegister: true
        });
    }

    renderRegistrationLayout() {
        const { userWantsToRegister } = this.state;
        if (!userWantsToRegister) {
            return (
                <div className='col-lg-6 col-md-6 col-sm-6 col-12 signup-block'>
                    <div className='account-info-title'>New customer</div>
                    <div className='register-content'>
                        <div className='content'>Create a permanent HeHe account <br />and use it for checkout</div>
                    </div>
                    <button 
                    className='auth-button'
                    type='button'
                    onClick={this.displayRegistrationForm}
                    >
                        Register
                    </button>
                </div>
            );
        }

        return (
            <div className='col-lg-6 col-md-6 col-sm-6 col-12 signup-block'>
                <div className='landing-wrapper'>
                    <div className='auth-content'>
                        <SignupForm />
                    </div>
                </div>
            </div>
        );
    }

    renderBreadCrumbs() {
        const { showBreadCrumbs } = this.props;
        if (showBreadCrumbs) {
            return (
                <Breadcrumb>
					<a href="/" className="breadcrumb-link">Home</a>
						<span> / </span>
					<a href="#" className="breadcrumb-link">Checkout</a>
						<span> / </span>
					<a href="#" className="breadcrumb-current">account</a>
				</Breadcrumb>
            );
        }
        return null;
    }

	render() {
		return (
            <div className='account-info-wrapper'>
                {this.renderBreadCrumbs()}
                <div className='row reset-row'>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-12 signin-block'>
                        <div className='landing-wrapper'>
                            <div className='auth-content'>
                                <SignInForm 
                                actionTitle='Returning customer'
                                redirectPageAfterLogin='checkout/addresses'
                                displayForgotPasswordLayout={true}
                                />
                            </div>
                        </div>
                    </div>
                    {this.renderRegistrationLayout()}
                </div>
            </div>
		);
	}
}

export default AccountInfo;
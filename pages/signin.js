import '../assets/styles/layouts/landing.scss';
import '../assets/styles/layouts/auth.scss';
import '../assets/styles/layouts/header.scss';
import SignInForm from '../components/views/signin/SignInForm';
import Header from '../components/reusable/header/Header'

export default function Signin() {
    return (   
        <div className='landing-main-wrapper'>
            <Header /> 
            <div className='content-wrapper'>
                <div className='col-12'>
                    <div className='landing-wrapper'>
                        <div className='auth-content'>
                            <SignInForm 
                            showBreadCrumbs={true}
                            displayRegistrationLayout={true}
                            actiontTitle='Sign in'
                            redirectPageAfterLogin='/'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
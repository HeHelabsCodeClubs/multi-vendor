import '../assets/styles/layouts/landing.scss';

export default function Index() {
    return (
        <div className='landing-main-wrapper'>
            <div className='col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
                <div className='landing-wrapper'>
                    <div className='top-part'>
                        <img src='' />
                        <div className='landing-title'>
                            Shop with confidence
                        </div>
                        <div className='landing-content'>
                            Purchase from just click to delivery on competitive price and Pay with the world's most popular and secure payment methods.
                        </div>
                    </div>
                    <div className='middle-part'>
                        <div className='selector'>
                            <select>
                                <option></option>
                            </select>
                        </div>
                        <div className='continue-button'>
                            <button>Continue</button>
                        </div>
                        <div className='landing-content-bottom'>
                            Already have an account? <span className='login-link'>Login</span>
                        </div>
                    </div>
                    <div className='bottom-part'>
                        <span>Delivered in as little as 1 hour</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
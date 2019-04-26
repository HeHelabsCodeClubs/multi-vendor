import Link from 'next/link';
import Select2 from 'react-select2-wrapper';
import '../assets/styles/layouts/landing.scss';

export default function Index() {
    return (
        <div className='landing-main-wrapper'>
            <div className='col-lg-6 col-md-6 col-sm-8 col-xs-10 offset-lg-3 offset-md-3 offset-sm-2 offset-xs-1'>
                <div className='landing-wrapper'>
                    <div className='top-part'>
                        <img src='https://res.cloudinary.com/hehe/image/upload/v1556120378/multi-vendor/HeHe_Logo_Original_portrait.svg' />
                        <div className='landing-title'>
                            Shop with confidence
                        </div>
                        <div className='landing-content top'>
                            Purchase from just click to delivery on competitive price and Pay with the world's most popular and secure payment methods.
                        </div>
                    </div>
                    <div className='middle-part'>
                        <div className='selector'>
                            <label className='landing-label'>Select Location</label>
                            <Select2
                                defaultValue={2}
                                data={[
                                    { text: 'Kigali, Kacyiru', id: 1 },
                                    { text: 'Kigali, Kimironko', id: 2 },
                                    { text: 'Kigali, Kanombe', id: 3},
                                    { text: 'Kigali, Town', id: 4 }
                                ]}
                            />
                        </div>
                        <div className='continue-button'>
                            <button>Continue</button>
                        </div>
                        <div className='landing-content bottom'>
                            Already have an account? <span className='login-link'><Link href='/homepage'><a>Login</a></Link></span>
                        </div>
                    </div>
                    <div className='bottom-part landing-footer'>
                        <span className='landing-footer-icon icon-Path-65'></span>
                        <span>Delivered in as little as 1 hour</span>
                        <span className='landing-footer-icon icon-Path-66'></span>
                    </div>
                </div>
            </div>
        </div>
    )
}
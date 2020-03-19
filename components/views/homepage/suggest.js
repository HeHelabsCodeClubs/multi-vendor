import SignInForm from '../../../components/views/signin/SignInForm';
import PopUpWrapper from '../../../components/reusable/PopUpWrapper';
import InputField from '../../../components/reusable/InputField';
import GoogleAnalyticsLogger from '../../../components/google-analytics/GoogleAnalyticsLogger';
import '../../../assets/styles/main.scss';

class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestion: '',
            suggestStatus: 'initial'
        };
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.getSuggestButtonText = this.getSuggestButtonText.bind(this);
    }

    getSuggestButtonText() {
        const { loginStatus } = this.state;
        switch(loginStatus) {
            case 'suggesting':
                return 'Suggesting...';
            case 'submitted':
                return 'Suggested';
            default:
                return 'Suggest';
        }
    }
    
    getInputFieldValue(fieldStateName, newValue) {
        this.setState({
            [fieldStateName]: newValue
        });
    }

    handleFormSubmission(e) {
        e.preventDefault();
        const {
            suggestion,
            suggestStatus
        } = this.state;

        /**
         * Hide display box if it was displayed due to api errors
         */
        this.setState({
            inputIsInvalid: false
        });

        /**
         * Validation
         */
        
        // const customerValidationRules = [
        //     [
        //         {
        //             type: 'empty',
        //             context: 'Suggestion',
        //             inputStateValue: suggestion,
        //             inputStateName: 'suggestion'
        //         }
        //     ]
        // ];

        // if (!this.validateInputFields(customerValidationRules)) {
        //     return;
        // }

        if (suggestStatus === 'initial') {
            this.setState({
                suggestStatus: 'Suggesting'
            });

            fetch(`https://vendor-dashboard.hehe.rw/api/customers/email/suggest`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    suggestion: suggestion,
                    customer_name: ''
                })
            }).then(async (res) => {
                try {
                    const response = await res.json();
                    this.handleResponse(response);
                    
                } catch (err) {
                    console.log('error');
                    console.log(err);
                }
            });
        }
    }

    render() {
        return (
            <GoogleAnalyticsLogger>
                <div className=''>
                    {/* <PopUpWrapper/> */}
                    
                    <div className=''>
                        <div className=''>
                            <div className='landing-wrapper'>
                                <div className='auth-content'>
                                    <form className='auth-form suggest-form' onSubmit={this.handleFormSubmission}>
                                        <div className='greeting'>Hello, <span className='name'>Jenny</span></div>
                                        <div className='question'>Any Store or Service you would like to reach through us?</div>
                                        <div className='input'>
                                            <InputField 
                                                typeOfInput='text_field'
                                                type='text' 
                                                id='suggestion'
                                                name='suggestion'
                                                placeholder='Type here'
                                                updateInputFieldValue={this.getInputFieldValue}
                                                // inputWithError={inputWithError}
                                            />
                                            <div className='auth-button'>
                                                <button type="submit" className="auth-default-btn">
                                                    {this.getSuggestButtonText()}
                                                </button>
                                            </div>
                                        </div>
                                        <div className='later-button'>
                                            <button type="submit" className="" onClick={this.props.closeModal}>
                                               Later
                                            </button>
                                        </div>
                                    </form>
                                </div>
                                <div className='bottom-section'>
                                    <div>Enjoy Shipping on <a href='https://shypt.hehe.rw/'>www.shypt.hehe.rw</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </GoogleAnalyticsLogger>
        );
    }
}

export default Suggest;
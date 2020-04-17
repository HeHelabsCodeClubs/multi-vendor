import MessageDisplayer from '../../reusable/MessageDisplayer';
import InputField from '../../../components/reusable/InputField';
import { getUserAuthenticatedInfo } from '../../../helpers/auth';
import { API_URL } from '../../../config';
import GoogleAnalyticsLogger from '../../../components/google-analytics/GoogleAnalyticsLogger';

class Suggest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestion: '',
            suggestStatus: 'initial',
            authUser: {},
            errorMessage: '',
            messageType: 'error'
        };
        this.getInputFieldValue = this.getInputFieldValue.bind(this);
        this.handleFormSubmission = this.handleFormSubmission.bind(this);
        this.getSuggestButtonText = this.getSuggestButtonText.bind(this);
        this.renderPopUpSuggestTitle = this.renderPopUpSuggestTitle.bind(this);
    }
    componentDidMount() {
        getUserAuthenticatedInfo((user) => {
            if (user !== null) {
                this.setState({
                    authUser: user
                });
            }
        });
    }

    getSuggestButtonText() {
        const { suggestStatus } = this.state;
        switch(suggestStatus) {
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
            authUser
        } = this.state;
        /**
         * Hide display box if it was displayed due to api errors
         */
        this.setState({
            inputIsInvalid: false
        });

        if (suggestion === '' || !suggestion) {
            this.setState({
                errorMessage: 'Please fill in your suggestion',
                messageType: 'error',
                inputIsInvalid: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        inputIsInvalid: false
                    })
                }, 1000);
            });
            return;
        }

        
        this.setState({
            suggestStatus: 'suggesting'
        });
            

        const requestData = {
            suggestion: suggestion
        };

        if (Object.keys(authUser).length !== 0) {
            requestData.customer_name = `${authUser.first_name} ${authUser.last_name}`;
            requestData.customer_email = authUser.email;
        }

        fetch(`${API_URL}/customers/email/suggest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(requestData)
        }).then(async (res) => {
            try {
                const response = await res.json();
                if (response.status === 'success') {
                    this.setState({
                        suggestStatus: 'submitted',
                        errorMessage: 'Your suggestion was successfully received!',
                        messageType: 'success',
                        inputIsInvalid: true
                    }, () => {
                        setTimeout(() => {
                            this.props.closeModal();
                        }, 5000);
                    });
                }
                
            } catch (err) {
                console.log('error');
                console.log(err);
                this.props.closeModal();
            }
        });
        
    }

    renderPopUpSuggestTitle() {
        const { authUser } = this.state;

        if (Object.keys(authUser).length !== 0) {
            return (
            <div className='greeting'>Hello, <span className='name'>{authUser.first_name}</span></div>
            );
        }
       
        return (
            <div className='greeting'>Hello</div>
        );
    }

    render() {

        const {
            inputIsInvalid,
            errorMessage,
            messageType
        } = this.state;

        return (
            <GoogleAnalyticsLogger>
                <div className=''>
                    {/* <PopUpWrapper/> */}
                    
                    <div className=''>
                        <div className=''>
                            <div className='landing-wrapper'>
                                <div className='auth-content'>
                                <MessageDisplayer 
                display={inputIsInvalid ? true : false }
                errorMessage={errorMessage}
                type={messageType}
                />
                                    <form className='auth-form suggest-form' onSubmit={this.handleFormSubmission}>
                                        {this.renderPopUpSuggestTitle()}
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
                                            <button type="button" className="" onClick={this.props.closeModal}>
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
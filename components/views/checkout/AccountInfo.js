import { reduxForm, Field, reset } from 'redux-form';
import RenderField from '../../reusable/RenderField';

class AccountInfo extends React.Component {

    renderInput(field) {
        return (
            <RenderField fieldInput={field} />
        );
    }

	render() {
		return (
            <div className='account-info-wrapper'>
                <div className='row reset-row'>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                        <div className='account-info-title'>Returning customer</div>
                        <form onSubmit={handleSubmit(this.submit)}>
                            <Field 
                                name='email'
                                type="input"
                                kind='text'
                            />
                        </form>
                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-6 col-12'>
                        <div className='account-info-title'>New customer</div>
                    </div>
                </div>
            </div>
		);
	}
}

export default reduxForm({
    form: 'Signupform'
})(AccountInfo);
import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';
import Switch from 'react-switch';

export default class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.typeOfInput !== 'checkbox' ? '' : false,
            hasError: false
        };
        this.renderInputField = this.renderInputField.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputFieldShouldDisplayError = this.inputFieldShouldDisplayError.bind(this);
    }

    componentDidMount() {
        // change input value to default value if provided
        const { defaultInputValue } = this.props;
        if (defaultInputValue !== undefined) {
            this.setState({
                inputValue: defaultInputValue
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { inputWithError } = nextProps;
        this.inputFieldShouldDisplayError(inputWithError);
    }

    inputFieldShouldDisplayError(inputWithError) {
        if (inputWithError === this.props.name) {
            this.setState({
                hasError: true
            });
            return;
        }
        this.setState({
            hasError: false
        });
    }

    handleInputChange(e) {
        if (e.preventDefault !== undefined) {
            e.preventDefault();
        }
        const { name, updateInputFieldValue } = this.props;
        const newInputFieldValue = e.target === undefined ? e : e.target.value;
        updateInputFieldValue(name, newInputFieldValue);
        this.setState({
            inputValue: newInputFieldValue
        });
    }

    renderInputField() {
        const { 
            type,
            id,
            classN,
            name,
            placeholder,
            typeOfInput,
            selectorData,
            fieldText
        } = this.props;
        const { inputValue, hasError } = this.state;
        const inputClassName = hasError ? `${classN} is-invalid`: classN;
        if (typeOfInput === 'text_field') {
            return (
                <div className='input-field'>
                    <input 
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder} 
                    value={inputValue}
                    className={inputClassName}
                    onChange={this.handleInputChange}
                    />
                </div>
            );
        }

        if (typeOfInput === 'selector') {
            return (
                <div className ={hasError ? 'input-field is-invalid' : 'input-field'}>
                    <Select2
                    id={id}
                    name={name}
                    data={selectorData}
                    options={{
                        placeholder: placeholder
                    }}
                    value={inputValue}
                    className='test-select'
                    onChange={this.handleInputChange}
                    />
                </div> 
            );
        }

        if (typeOfInput === 'checkbox') {
            return (
                <div className='checkbox-field'>
                    {/* <input 
                        type={type} 
                        id={id}
                        name={name}
                        checked={inputValue}
                        onChange={this.handleInputChange} 
                    /> */}
                    <Switch 
                    id={id}
                    name={name}
                    checked={inputValue}
                    onChange={this.handleInputChange}
                    />
                    <a
                    className={inputClassName}
                    onClick={(e) => {
                        e.preventDefault();
                        if (inputValue) {
                            this.handleInputChange(false);
                            return;
                        }
                        this.handleInputChange(true);
                    }}
                    >
                    
                    {fieldText}
                    </a>
                </div>
            ); 
        }

        return null;
        
    }

    render() {
        return this.renderInputField();
    }
}
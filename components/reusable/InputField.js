import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';

export default class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.typeOfInput !== 'checkbox' ? '' : 0,
            hasError: false
        };
        this.renderInputField = this.renderInputField.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputFieldShouldDisplayError = this.inputFieldShouldDisplayError.bind(this);
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
        e.preventDefault();
        const { name, updateInputFieldValue } = this.props;
        const newInputFieldValue = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
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
                    <input 
                        type={type} 
                        id={id}
                        name={name}
                        checked={inputValue}
                        onChange={this.handleInputChange} 
                    />
                    <span
                    className={inputClassName}
                    >
                    {fieldText}
                    </span>
                </div>
            ); 
        }

        return null;
        
    }

    render() {
        return this.renderInputField();
    }
}
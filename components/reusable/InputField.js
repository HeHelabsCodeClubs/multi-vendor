import React, { Component } from 'react';
import Switch from 'react-switch';

// testing deployment

export default class InputField extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: this.props.typeOfInput !== 'checkbox' ? '' : false,
            hasError: false,
            wasGivenDefaultValue: false
        };
        this.renderInputField = this.renderInputField.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.inputFieldShouldDisplayError = this.inputFieldShouldDisplayError.bind(this);
        this.renderInputLabel = this.renderInputLabel.bind(this);
        this.renderSelect = this.renderSelect.bind(this);
    }

    componentDidMount() {
        // change input value to default value if provided
        const { defaultInputValue } = this.props;
        if (defaultInputValue) {
            this.setState({
                inputValue: defaultInputValue
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        const { defaultInputValue, inputWithError } = nextProps;
        const { wasGivenDefaultValue, hasError } = this.state;
        if (defaultInputValue && !wasGivenDefaultValue ) {
            this.setState({
                inputValue: defaultInputValue,
                wasGivenDefaultValue: true
            });
        }

        if (inputWithError !== '' && !hasError) {
            this.setState({
                hasError: true
            });
        }

        if (inputWithError === '' && hasError) {
            this.setState({
                hasError: false
            });
        }
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
        const { inputValue } = this.state;
        const { name, updateInputFieldValue } = this.props;
        const newInputFieldValue = (e.target === undefined) ? e : ((name === 'phone' && !inputValue.includes('250')) ? `250${e.target.value}` : e.target.value);
        updateInputFieldValue(name, newInputFieldValue);
        this.setState({
            inputValue: newInputFieldValue
        });
    }

    renderInputLabel() {
        const { hideLabel, name, placeholder } = this.props;
        if (hideLabel) {
            return null
        }

        return (
            <label htmlFor={name}>
                {placeholder}
            </label>
        );
    }

    renderSelect(selectorData, placeholder) {
        const optionsLayout = [
            <option 
            key='placeholder---'
            value=""
            selected 
            disabled
            hidden
            >
            {placeholder}
            </option>
        ];
        selectorData.map((selectorItem) => {
            optionsLayout.push(
                <option key={selectorItem.id} value={selectorItem.id}>
                    {selectorItem.text}
                </option>
            );
        });

        return optionsLayout
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
            fieldText,
            hasLabel,
            InnerContent,
            inputWrapperClassName
        } = this.props;
        const { inputValue, hasError } = this.state;
        //const inputClassName = hasError ? `${classN} is-invalid`: classN;
        let inputClassName = typeOfInput !== 'selector' ? 'input-field' : 'input-field';
        if (name === this.props.inputWithError) {
            if (hasError) {
                inputClassName = 'input-field is-invalid';
            }
        }
        const renderLabel = (hasLabel || hasLabel === undefined) ? this.renderInputLabel : null;
        if (typeOfInput === 'text_field') {
            return (
                <div className={`input-field ${inputWrapperClassName}`}>
                    {renderLabel ? renderLabel() : renderLabel}
                    <input 
                    type={type}
                    id={id}
                    name={name}
                    placeholder={placeholder} 
                    value={inputValue}
                    className={`${inputClassName} ${classN}`}
                    onChange={this.handleInputChange}
                    />
                    {InnerContent ? InnerContent : null}
                </div>
            );
        }

        if (typeOfInput === 'selector') {
            
            return (
                <div className ={inputClassName}>
                    {renderLabel ? renderLabel() : renderLabel}
                    <select 
                    value={inputValue}
                    id={id}
                    name={name}
                    onChange={this.handleInputChange}
                    className={inputClassName}
                    >
                        {this.renderSelect(selectorData, placeholder)}
                    </select>
                    {InnerContent ? InnerContent : null}
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
                    // onClick={(e) => {
                    //     e.preventDefault();
                    //     if (inputValue) {
                    //         this.handleInputChange(false);
                    //         return;
                    //     }
                    //     this.handleInputChange(true);
                    // }}
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
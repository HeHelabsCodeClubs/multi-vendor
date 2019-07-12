import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';





class SearchDropdown extends Component {
    
    constructor() {
        super();
        this.state = {
          value: '',
          suggestions: [],
          products: [
                {
                    productName: 'Headphones Beats',
                    sellerName: '',
                    productSlug: '',
                    sellerSlug: '',
                    parentCategory: '', 
                },
                {
                    productName: 'Headphones Ofia',
                    sellerName: '',
                    productSlug: '',
                    sellerSlug: '',
                    parentCategory: '',
                },
                {
                    productName: 'Headphones Phillips',
                    sellerName: '', 
                    productSlug: '',
                    sellerSlug: '',
                    parentCategory: '',
                },
                {
                    productName: 'Headsets Ofia',
                    sellerName: '', 
                    productSlug: '',
                    sellerSlug: '',
                    parentCategory: '',
                },
                {
                    productName: 'Laptop Dell',
                    sellerName:'',
                    productSlug: '',
                    sellerSlug: '',
                    parentCategory: '',
                },
                {
                    productName: 'Laptop hp',
                    sellerName: '',
                    productSlug: '',
                    sellerSlug: '',
                    parentCategory: '',
                }
            ]
        };
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);

    }
    
    
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.products.filter(prdts =>
          prdts.productName.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    
    getSuggestionValue(suggestion) {
        console.log('suggestion', suggestion.productName);
    };
    
   renderSuggestion(suggestion) {
        return(
            <div>
                <a href="#">{suggestion.productName} in Electronics</a>
            </div>
        );
   }
   

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        });
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
          suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
          suggestions: []
        });
    };


    render () {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search store or product',
            value,
            onChange: this.onChange
        };

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
            />
        );
    }
}

export default SearchDropdown;
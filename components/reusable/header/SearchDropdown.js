import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import { API_URL } from '../../../config';

class SearchDropdown extends Component {
    
    constructor() {
        super();
        this.state = {
          value: '',
          suggestions: [],
          products: []
        };
        this.getSuggestions = this.getSuggestions.bind(this);
        this.getSuggestionValue = this.getSuggestionValue.bind(this);
        this.renderSuggestion = this.renderSuggestion.bind(this);
        this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
        this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
        this.onChange = this.onChange.bind(this);

    }
    
    
    getSuggestions(value) {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
       
        return inputLength === 0 ? [] : this.state.products;
        // .filter(prdts =>
        //   prdts.name.toLowerCase().slice(0, inputLength) == inputValue
        // );
    };
    
    getSuggestionValue(suggestion) {
        return suggestion.name;
    };
    
   renderSuggestion(suggestion) {
       let categoryName = '';
       const { name, categories } = suggestion;
       if (categories) {
            if (categories.length !== 0) {
                const catLength = categories.length;
                categoryName = categories[catLength - 1].name;
            }
       }
       
       let displayName = (categoryName !== '') ? (
           <span className='wrapper'>
               <span>{name}</span> in <span>{categoryName}</span>
           </span>
           
       ) : (
        <span className='wrapper'>
            <span>{name}</span>
        </span>
       );
       const { value } = this.state;
       const validValue = value.toLowerCase().split(' ').join('_');
        return(
            <div>
                {/* links */}
                <a href={`/search-results/${validValue}`}>{displayName}</a>
            </div>
        );
   }
   

    onChange = (event, { newValue }) => {
        this.setState({
          value: newValue
        }, () => {
            this.props.updateParentSearchTerm(newValue);
        });
    };

    async onSuggestionsFetchRequested({ value }){
        if(value.length !== 0) {
            const res = await fetch(`${API_URL}/products/search/${value}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            });
            const response = await res.json();
            if (response.data) {
                this.setState({
                    products: response.data,
                }, () => {
                    this.setState({
                        suggestions: this.getSuggestions(value)
                    });
                });
            }
        }
    };

    onSuggestionsClearRequested(){
        this.setState({
          suggestions: []
        });
    };


    render () {
        const { value, suggestions } = this.state;
        const inputProps = {
            placeholder: 'Search for product',
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
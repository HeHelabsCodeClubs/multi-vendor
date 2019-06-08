import React, { Component } from 'react';
import Select2 from 'react-select2-wrapper';

export default class AttributeOptionSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectorValue: ''
        };
        this.renderSelector = this.renderSelector.bind(this);
        this.renderContent = this.renderContent.bind(this);
        this.updateSelectorValue = this.updateSelectorValue.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { resetSelectedValue } = nextProps;
        if (resetSelectedValue) {
            this.setState({
                selectorValue: ''
            });
        }
    }

    updateSelectorValue(e) {
        if (e) {
            this.setState({
                selectorValue: e.target.value
            });
            this.props.getSelectedAttributeValue(e);
        }
    }
    

    renderSelector(option) {
        if (option) {
            const SelectorData = option.data.map((option_item) => {
                const dataToGet = {
                    option_name: option.title,
                    data: {
                        attribute_id: option_item.attribute_id,
                        option_id: option_item.option_id,
                        title: option_item.title
                    }
                };
                return {
                    text: option_item.title,
                    id: JSON.stringify(dataToGet)
                };
            });
            return (
                <Select2
                    data={SelectorData}
                    options={
                        { placeholder: 'Select' }
                    }
                    value={this.state.selectorValue}
                    onChange={this.updateSelectorValue}
                />
            );
        }
    }

    renderContent(option) {
        if (option) {
            return (
                <div className='product-detail' key={option.title}>
                    <span className='details-title'>{`${option.title}:`}</span>
                    <span className='select-dropdown'>
                       {this.renderSelector(option)}
                    </span>
                </div>
            );
        }
    }

    render() {
        return this.renderContent(this.props.option);
    }
}
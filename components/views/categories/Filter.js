import React, { Component } from "react";
import fetch from 'isomorphic-unfetch';
import Router from 'next/router';
import isObjectEmpty from '../../../helpers/is_object_empty';
import { API_URL } from '../../../config';

export default class  Filter extends Component {
    constructor (props) {
        super(props);
        this.state = {
        };
    }

    render() { 
        return (
            <div>me</div>
        )
    }
}
import React, { Component } from "react";

export default class  MenuItemCategory extends Component {
    constructor (props) {
        super(props);
        this.state = {
            isMenuItemActive: false
        };
    }

    render () {
        const itemClass = this.state.isMenuItemActive ? 'active' : ''; 
        return (
            <div className={`item item-level-1 ${itemClass}`}>
                        <div className="item-title">
                            <span>
                                <a href="" className="item-label">Womens' Clothing <i className="fa fa-chevron-left"></i></a>
                            </span>
                        </div>
                        <div className="children active">
                            <div className="item item-level-2">
                                <div className="item-title">
                                    <span>
                                        <span className="item-label">Dresses</span>
                                    </span>
                                </div>
                            </div>
                            <div className="item item-level-2">
                                <div className="item-title">
                                    <span>
                                        <span className="item-label">Dresses</span>
                                    </span>
                                </div>
                            </div>
                            <div className="item item-level-2">
                                <div className="item-title">
                                    <span>
                                        <span className="item-label">Dresses</span>
                                    </span>
                                </div>
                            </div>
                            <div className="item item-level-2">
                                <div className="item-title">
                                    <span>
                                        <span className="item-label">Dresses</span>
                                    </span>
                                </div>
                            </div>
                            <div className="item item-level-2">
                                <div className="item-title">
                                    <span>
                                        <span className="item-label">Dresses</span>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
        )
    }
}
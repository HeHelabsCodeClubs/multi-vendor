import React, { Component } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { isPageVisited } from '../../../helpers/checkout_page_visits';

export default class CheckoutPageSection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sectionClass: 'single-process'
        };
        this.getLinkClass = this.getLinkClass.bind(this);
        this.updateToVistedSectionClass = this.updateToVistedSectionClass.bind(this);
        this.renderSectionLayout = this.renderSectionLayout.bind(this);

    }
    componentDidMount() {
        this.getLinkClass();
    }
    componentWillReceiveProps() {
        this.getLinkClass();
    }
    updateToVistedSectionClass(isVisited) {
        if (isVisited === 1) {
            this.setState({
                sectionClass: 'single-process done'
            });
        } else {
            this.setState({
                sectionClass: 'single-process'
            });
        }
    }
    getLinkClass() {
        const { router: { query: { page } } } = Router
        const { pageName } = this.props;
        if (pageName === page) {
            this.setState({
                sectionClass: 'single-process active'
            });
            return;
        }

        // update to visited class if the section was visited
        isPageVisited(page, (isVisited) => {
            this.updateToVistedSectionClass(isVisited);
        });
    }

    renderSectionLayout() {
        const { title, pageName, doOnClick } = this.props;
        const { sectionClass } = this.state;
        if (doOnClick === undefined) {
            return(
                <Link
                href={`/checkout?page=${pageName}`}
                as={`/checkout/${pageName}`}   
                >
                    <a 
                    className={sectionClass} 
                    >
                        <h5 className='process-name'>{title}</h5>
                    </a>
                </Link>
            );
        }

        return(
            <a 
            className={sectionClass}
            onClick={(e) => { e.preventDefault(); doOnClick() }} 
            >
                <h5 className='process-name'>{title}</h5>
            </a>
        );
        
    }

    render() {
        return this.renderSectionLayout();
    }
}
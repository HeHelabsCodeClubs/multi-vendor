// import React, { Component } from 'react';
// import Router from 'next/router';
// import OrderRow from "../profile/OrderRow";
// import OrderDetail from "../profile/OrderDetail";
// import Invoice from './Invoice';
// import UserDetail from './UserDetail';

// class ContentProfile extends Component {
//     constructor() {
//         super();
//         this.state = {
//             activeContent: 'orders'
//         }
//         //this.decideContentToShow = this.decideContentToShow.bind(this);
//         this.changeActiveContent = this.changeActiveContent.bind(this);
//     }
//     // componentDidMount() {
//     //     this.decideContentToShow();
//     // }

//     // componentWillReceiveProps(nextProps) {
//     //     this.decideContentToShow();
//     // }

//     // decideContentToShow() {
//     //     const { router: { query: { page } } } = Router;
//     //     const { activeContent } = this.state;

//     //     if (activeContent) {
//     //         switch(activeContent) {
//     //             // case 'orders':
//     //             //     this.setState({
//     //             //         activeContent: 'orders'
//     //             //     });
//     //             //     break;

//     //             case 'singleOrder':
//     //                 this.setState({
//     //                     activeContent: 'singleOrder'
//     //                 });
//     //                 break;
                
//     //             default:
//     //                 // Redirect to 404 page
//     //         }
//     //     }
//     // }

//     changeActiveContent() {
//         const { activeContent } = this.state;

//         if (activeContent === 'orders') {
//             this.setState({
//                 activeContent: 'singleOrder'
//             });
//         }
//     }

//     renderContent() {
//         const { activeContent } = this.state;
//         const { customerOrders } = this.props;
//         console.log(activeContent);
//         switch(activeContent) {
//             case 'orders':
//                 return <OrderRow 
//                 orders={customerOrders} 
//                 changeActiveContent={() => this.changeActiveContent()}
//                 />
            
//             case 'singleOrder':
//                 <OrderDetail />
            
//             default:
//                 // Redirect to 404 page
//         }

//     }

//     render () {
//         const { orderId } = this.props;
//         return (
//             <div>
//                 {this.renderContent()}
//                 <OrderDetail 
//                     orderId={orderId}
//                 />
//             </div>
//         );
//     }
// }

// export default ContentProfile;
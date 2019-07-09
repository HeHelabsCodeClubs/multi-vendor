import React, { Component } from 'react';
import SideProfile from "../components/views/profile/SideProfile";
import ContentProfile from "../components/views/profile/ContentProfile";
import Global from '../components/reusable/Global';
import '../assets/styles/layouts/profile.scss';

class Profile extends Component {
    render () {
        return (
            <Global>
                <div className="row reset-row profile-page">
                    <div className="col-lg-3 col-md-3 col-sm-5 col-12 sidemenu">
                        <SideProfile />
                    </div>

                    <div className="col-lg-9 col-md-9 col-sm-7 col-12 main-content">
                        <ContentProfile />
                        
                    </div>
                </div>
            </Global>
        );
    }
}

export default Profile;
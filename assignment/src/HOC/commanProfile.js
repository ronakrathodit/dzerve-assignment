import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import PageLoader from "../atom/pageloader";
import OnboardApi from '../services/onboarding';
//import { Redirect } from 'react-router-dom';
import { getprofile } from '../store/Action/master';
import { connect } from 'react-redux';
let Api = new OnboardApi();

export const MasterHOC = (ChildComponent, fetchData, dataName) => {
    class HOComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        componentDidMount() {
            // let layout = { "uuid": this.props.uuid }
            // Api.GetProfileData(layout).then(res => {
            //     console.log(res)
            // })


        }
        componentDidUpdate(prevProps, prevState) {
            if (this.props.profileData !== prevProps.profileData) {

            }
        }

        render() {

            if (this.props.pstatus) {
                return <PageLoader />
            }

            if (this.props.profileData !== null) {
                let { FormStage } = this.props.profileData;
                console.log(FormStage, 'dataprofile')
                // if (FormStage === "K") {
                //     return <Redirect to="/onboarding/kyc" />
                // }
                // if (FormStage === "B") {
                //     return <Redirect to="/onboarding/BankDetail" />
                // }
                // if (FormStage === "C") {
                //     return <Redirect to="/onboarding/docupload" />
                // }
                // if (FormStage === "A") {
                //     return <Redirect to="/onboarding/addreessDetail" />
                // }
                // if (FormStage === "D") {
                //     return <Redirect to="/thankyou" />
                // }
            }
            console.log(this.props.uuid, 'profileHOC', this.props.profileData)

            return <ChildComponent profile={this.props.profileData} {...this.props} />;

        }
    }
    //console.log(this.props,'classout')
    const mapStateToProps = state => {
        return {
            uuid: state.Auth.uuid,
            pstatus: state.profile.profileStatus,
            profileData: state.profile.profileData


        }
    }
    const mapDispatchToProps = dispatch => {
        return {
            profileCall: (data) => dispatch(getprofile(data))
        }
    }
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(HOComponent));
};

import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import PageLoader from "../atom/pageloader";
import OnboardApi from '../services/onboarding';
//import { Redirect } from 'react-router-dom';
import { getprofile, getProfileSuccess } from '../store/Action/master';
import { SignOut } from './signOut';
import { connect } from 'react-redux';
let Api = new OnboardApi();

export const MasterHOC = (ChildComponent, fetchData, dataName) => {
    class HOComponent extends Component {
        constructor(props) {
            super(props)
            this.state = {
                data: null,
            };
        }

        componentDidMount() {
            window.scrollTo(0, 0)
            if (this.props.profileData === null) {


                let layout = { "uuid": this.props.uuid }
                Api.GetProfileData(layout).then(res => {
                    console.log(res, 'profilepage')
                    let fullRes = res.response;

                    if (res.success) {

                        this.props.getProfileSuccess(fullRes)
                        this.setState({
                            data: fullRes
                        })



                    } else {
                        SignOut(res)
                        this.props.getProfileSuccess(fullRes)
                        this.setState({
                            data: fullRes
                        })
                    }
                    let { FormStage, IsBuyAllowed,IsMFUser } = fullRes;

                    if (!IsBuyAllowed) {
                        if(IsMFUser){
                              this.props.history.push('/onboarding/preview');
                        }else{
                            if (FormStage === "K") {
                                this.props.history.push("/onboarding/kyc")
                            }
                            if (FormStage === "B") {
                                this.props.history.push("/onboarding/BankDetail")
                            }
                            if (FormStage === "C") {
                                this.props.history.push("/onboarding/docupload")
                            }
                            if (FormStage === "A") {
                                this.props.history.push("/onboarding/addressDetail")
                            }
                            if (FormStage === "D") {
                                this.props.history.push("/thankyou")
                            }
                        }
                        
                    } else {

                        
                    }



                })


            }

        }
        componentDidUpdate(prevProps, prevState) {
            if (this.props.profileData !== prevProps.profileData) {

            }
        }

        render() {

            if (this.props.profileData === null) {
                return <PageLoader />
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
            profileCall: (data) => dispatch(getprofile(data)),
            getProfileSuccess: (data) => dispatch(getProfileSuccess(data))
        }
    }
    return withRouter(connect(mapStateToProps, mapDispatchToProps)(HOComponent));
};

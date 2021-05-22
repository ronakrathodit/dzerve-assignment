import React,{useState,useEffect,Fragment} from 'react';
import Input from './input';
import {emailText,numberText,pwdText} from '../../../helper/method';
import {formSubmit,MsgClear} from '../../../store/Action/master';
import {useSelector, useDispatch} from 'react-redux';
import ApiAll from '../../../services/loginApi';
import {withRouter,Redirect} from 'react-router-dom';
let  api= new ApiAll();

const Landing=(props)=>{
    let dispatch=useDispatch();
    let getState=useSelector(state=>state.Auth.userInfo);
    let getSuccess=useSelector(state=>state.Auth.pageSuccess);
    const [state,setState]=useState({uniqueId:"",pwd:"",Cpwd:""}) // form state
    const [error,setError]=useState({});
    const [emailCheck,setEmailCheck]=useState(null); // email or phone number bases on true false
    const [userCheck,setUserCheck]=useState(null); // check existing user
    const [msg,setMsg]=useState(''); // api false msg
    

    // Change handler
    const ChangeInput=(name,value)=>{
        let allState={...state}
        if(name==="uniqueId"){
            setEmailCheck(null);
        }
        allState[name]=value
        setState(allState)
    }
    
    useEffect(()=>{          
        if(getState!==""){
            setMsg(getState)
            setTimeout(function(){ 
                dispatch(MsgClear(""))
            }, 1000);
        }else{
            setMsg('')
        }
    },[getState])

    // blur handler   
    const validate=(name,value)=>{
        let type =name;
        let errorMsg={...error};
        if(type==="uniqueId"){
            let emailCheck=null;
            if(value===""){
                errorMsg['uniqueIdError']="Please enter email id/mobile number"
            }else if(numberText(value)){
                if(value.length!==10){
                    errorMsg['uniqueIdError']="Please enter 10 digit mobile number";
                    emailCheck=null;
                }else{
                    errorMsg['uniqueIdError']="";
                    emailCheck=false;
                }
            }else{
                let EmailCheck= emailText(value);
                if(!EmailCheck){
                    errorMsg['uniqueIdError']="Please enter email id/mobile number"
                    emailCheck=null;
                }else{
                    errorMsg['uniqueIdError']="";
                    emailCheck=true;
                }
            }
            setEmailCheck(emailCheck)
            setError(errorMsg)
        }
        if(type==="pwd"){
            if(value===""){
                errorMsg['pwdError']="Please enter password"
            }else if(!pwdText(value)){
                errorMsg['pwdError']="Entered password doesn't not match criteria "
            }else{
                errorMsg['pwdError']="";
            }
            setError(errorMsg)           
        }   

        if(type==="Cpwd"){
            if(value===""){
                errorMsg['CpwdError']="Please enter password"
            }else if(!pwdText(value)){
                errorMsg['CpwdError']="Entered password doesnt not match criteria"
            }
            else if(value!==state.pwd){
                errorMsg['CpwdError']="Password and confirm password field should be match"   
            }
            else{
                errorMsg['CpwdError']="";
            }
            setError(errorMsg)
        }
    } 
 
    const FormValid=()=>{
        let isValid=false;
        let errorMsg={...error};
        let {uniqueId,pwd,Cpwd}=state;
        let ECheck= emailText(uniqueId);
        
        let pwdcheck=pwdText(pwd);
        let pwdcheck1=pwdText(Cpwd);

        if(uniqueId===""){
            errorMsg['uniqueIdError'] = "Please enter email id/mobile number"
        }else if(emailCheck && !ECheck){
            errorMsg['uniqueIdError'] = "Please enter a valid email id/mobile number"
        } else if(!emailCheck && uniqueId.length!==10){
            errorMsg['uniqueIdError'] = "Please enter a valid email id/mobile number"
        } else if(pwd===""){
            errorMsg['pwdError']="Please enter password"
        } else if(!pwdcheck){
            errorMsg['pwdError']="Entered password does not match criteria"
        } else if(Cpwd===""){
            errorMsg['CpwdError']="Please enter password"
        }else if(!pwdcheck1){
            errorMsg['CpwdError']="Entered password does not match criteria"
        }else if(pwd!==state.pwd){
            errorMsg['CpwdError']="Password and confirm password field should be match"   
        }else if(uniqueId===state.Cpwd){
            errorMsg['CpwdError']="Entered password does not match criteria"   
        }else{
            errorMsg['uniqueIdError']="";
            errorMsg['pwdError']="";
            errorMsg['CpwdError']="";
            isValid=true;
        }
        setError(errorMsg)
        return isValid;
    }  
   
    
    const submitbtn=()=>{
        let checkF=FormValid();
        if(checkF){
            let payload = {    
                "emailid": emailCheck?state.uniqueId:"",
                "mobileno":!emailCheck?state.uniqueId:"",
                "type": emailCheck?"emailid":"mobileno",
                "password": state.Cpwd            
            }          
            dispatch(formSubmit(payload))
        }      
    }   
  
    console.log(msg,'MSG')
    return(
        <div className="container">  
        <h3 style={{textAlign: "center"}}>Change Password</h3>
        {getSuccess?
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">Password update successfully.</h5>
                </div>
            </div>
        :
        <form>                               
            <Input
                label="Email Id / Mobile Number"
                type='text'
                name="uniqueId"
                value={state.uniqueId}
                onChange={ChangeInput}
                validate={validate}
                error={error['uniqueIdError']}
            />           
            <Fragment> 
                <Input
                    label="Password"
                    type='password'
                    name="pwd"
                    value={state.pwd}
                    onChange={ChangeInput}
                    validate={validate}
                    error={error['pwdError']}
                />
                <Input
                    label="Confirm Password"
                    type='password'
                    name="Cpwd"
                    value={state.Cpwd}
                    onChange={ChangeInput}
                    validate={validate}
                    error={error['CpwdError']}
                />
                <p> Note:</p>
                <ul>
                    <li>Min:1 lowercase and 1 uppercase alphabet</li>
                    <li>Min: 1 number</li>
                    <li>Min: 1 special character</li>
                    <li>8-16 character length</li>
                    <li>Shouldn’t be the same as uniqueId</li>
                    <li>Shouldn’t be the same as last password</li>
                </ul>                    
            </Fragment> 
            {msg!==""?<div class="alert alert-warning">{msg}</div>:null}                
            <fieldset>
                {getState.fStatus? "Please Wait": null}   
                <button name="submit" type="button" onClick={submitbtn} id="contact-submit" data-submit="...Sending">Submit</button>
            </fieldset>
        </form>
        }
    </div>
    )
}
export default withRouter(Landing)
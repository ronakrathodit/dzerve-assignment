exports.validateForm1 = async (params) => {
    var retResp = {};
    if(!params.hasOwnProperty('type')){
        retResp.success = false;
        retResp.result = "Type parameter is mandatory.";
        return retResp;
    }
    if(params.type === ""){
        retResp.success = false;
        retResp.result = "Type value is mandatory.";
        return retResp;
    }
    if(params.type === "emailid"){        
        if(!params.hasOwnProperty('emailid')){
            retResp.success = false;
            retResp.result = "Email Id parameter is mandatory.";
            return retResp;
        }
        if(params.emailid === ""){
            retResp.success = false;
            retResp.result = "Email Id value is mandatory.";
            return retResp;
        }
    }else{
        if(!params.hasOwnProperty('mobileno')){
            retResp.success = false;
            retResp.result = "Mobile Number parameter is mandatory.";
            return retResp;
        }
        if(params.mobileno === ""){
            retResp.success = false;
            retResp.result = "Mobile Number value is mandatory.";
            return retResp;
        }    
    }
    
    if(!params.hasOwnProperty('password')){
        retResp.success = false;
        retResp.result = "Password parameter is mandatory.";
        return retResp;
    }
    if(params.password === ""){
        retResp.success = false;
        retResp.result = "Password value is mandatory.";
        return retResp;
    }
    
    return {"success": true, "response": ""};
}

exports.validateForm2 = async (params) => {
    var retResp = {};
    if(!params.hasOwnProperty('type')){
        retResp.success = false;
        retResp.result = "Type parameter is mandatory.";
        return retResp;
    }
    if(params.type === ""){
        retResp.success = false;
        retResp.result = "Type value is mandatory.";
        return retResp;
    }
    if(params.type === "emailid"){        
        if(!params.hasOwnProperty('emailid')){
            retResp.success = false;
            retResp.result = "Email Id parameter is mandatory.";
            return retResp;
        }
        if(params.emailid === ""){
            retResp.success = false;
            retResp.result = "Email Id value is mandatory.";
            return retResp;
        }
    }else{
        if(!params.hasOwnProperty('mobileno')){
            retResp.success = false;
            retResp.result = "Mobile Number parameter is mandatory.";
            return retResp;
        }
        if(params.mobileno === ""){
            retResp.success = false;
            retResp.result = "Mobile Number value is mandatory.";
            return retResp;
        }    
    }
    
    return {"success": true, "result": ""};
}
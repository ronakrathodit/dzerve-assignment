const validationService = require('../services/validationService');
const profileModel = require('../models/profile');

exports.userExist = async (req, res) => {
	try {    	
    	let validateReq = await validationService.validateForm2(req.body);        
        if(!validateReq.success){            
            res.json(validateReq);
            return false;
        }

        let emailid = req.body.emailid;      
    	let mobileno = req.body.mobileno;      
    	let type = req.body.type; 
    	let password = req.body.password; 

    	var userExist = {};
    	if(emailid!==""){
    		userExist["emailid"] = emailid;    	
    	}else{
    		userExist["mobileno"] = mobileno;    		
    	}
    	let userExistResp = await profileModel.userExist(userExist);
    	if(Object.keys(userExistResp.response).length > 0){    		
    		res.json({"success": true, "result": "User exists", "data": userExistResp.response[0]});
    	}else{
    		res.json({"success": false, "result": "User details not available."});	
    	}
    } catch (error) {
        res.json({"success": false, "result": error});
    }   	
}

exports.changePassword = async (req, res) => {
    try {    	
    	let validateReq = await validationService.validateForm1(req.body);        
        if(!validateReq.success){            
            res.json(validateReq);
            return false;
        }
    	let emailid = req.body.emailid;      
    	let mobileno = req.body.mobileno;      
    	let type = req.body.type; 
    	let password = req.body.password; 

    	var userExist = {};
    	if(emailid !== ""){
    		userExist["emailid"] = emailid;    	
    	}else{
    		userExist["mobileno"] = mobileno;    		
    	}
    	
    	let userExistResp = await profileModel.userExist(userExist); 
    	if(!userExistResp.success){
    		res.json({"success": false, "result": "Some error occurred."});	
    	}else{
	    	if(Object.keys(userExistResp.response).length > 0){
	    		let checkPassword = await profileModel.checkPassword({password: password, ...userExist});    		
	    		if(Object.keys(checkPassword.response).length > 0){    			
	    			res.json({"success": false, "result": "Password cannot be same as previous password."});    			
	    		}else{
	    			let updateResp = await profileModel.updatePassword({password: password}, userExist)	
	    			res.json({"success": true, "result": "Password updated successfully."});
	    		}    		    		
	    	}else{
	    		res.json({"success": false, "result": "User details not available."});	
	    	} 
    	}            
    } catch (error) {        
        res.json({"success": false, "result": error});
    }
}
import  { GET_PENDING, GET_SUCCESS, GET_FAIL,MSG_CLEAR } from '../Action/type';

let initialize = {
    fStatus:false,
    pageSuccess:false,
    userInfo:"",

}

export default function Getmaster(state = initialize, action) {
    switch (action.type) {
        case GET_PENDING:
            return {
                ...state,
                fStatus: true

            }
        case GET_SUCCESS:
            return {
                ...state,
                fStatus: false,
                pageSuccess:true,
                userInfo: action.paylaod

            }
        case GET_FAIL:
            return {
                ...state,
                fStatus: false,
                pageSuccess:false,
                userInfo: action.paylaod
                //userInfo: action.paylaod

            }
        case MSG_CLEAR:  
        return {
            ...state,  
            userInfo:""}
        
        default:
            return state
    }
}
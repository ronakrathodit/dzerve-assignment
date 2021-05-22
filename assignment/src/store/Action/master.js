import { GET_PENDING,MSG_CLEAR} from './type';

export function formSubmit(data) {
    
    return {
        type: GET_PENDING,
        payload:data
    }
}

export function MsgClear(data) {
    
    return {
        type: MSG_CLEAR,
        payload:data
    }
}

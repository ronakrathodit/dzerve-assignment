
import { GET_PENDING, GET_SUCCESS, GET_FAIL } from '../store/Action/type';
import { takeLatest, call, put } from 'redux-saga/effects';
import Api from '../services/loginApi';
let getApi = new Api();

async function getFetch(res) {

    let data = await getApi.updatePassword(res);
    return data
}

function* fetchUser(action) {
    console.log('mastersaga')
    let { payload } = action;
    let getData = yield call(getFetch, payload);
    let data = getData.result;
    if (getData.success) {
        
        yield put({ type: GET_SUCCESS, paylaod: data })

    } else {
       
        yield put({ type: GET_FAIL, paylaod: data })
    }
    console.log(getData, 'getData')
    
}

export function* getformSubmit() {
    yield takeLatest(GET_PENDING, fetchUser);
}
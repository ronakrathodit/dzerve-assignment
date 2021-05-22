import { fork } from 'redux-saga/effects';

import { getformSubmit } from './formAction';


export default function* rootSaga() {
   
    yield fork(getformSubmit)

    
}
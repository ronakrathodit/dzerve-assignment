import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga'
// import thunk from 'redux-thunk';
import Rootreducer from './Reducer';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


import mySaga from '../Saga';
import { composeWithDevTools } from "redux-devtools-extension";


const sagaMiddleware = createSagaMiddleware()
const persistedReducer = persistReducer(
    {
        key: 'root1',
        blacklist: [''],
        whitelist: ['', ''],
        storage,

    },
    Rootreducer

)

const Store = createStore(persistedReducer, {}, compose(

    applyMiddleware(sagaMiddleware),
    composeWithDevTools(),
    //window.devToolsExtension ? window.devToolsExtension() : f => f
));

const persistor = persistStore(Store);
sagaMiddleware.run(mySaga)
export { Store, persistor }




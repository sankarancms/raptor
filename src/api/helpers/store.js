import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import reducers from './reducers';

const initialState = {};

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000'
});

const middleware = [thunk.withExtraArgument(axiosInstance)];

const store = (type = 'client') => {
    if (type == 'client') {
        return createStore(
            reducers,
            initialState,
            compose(
                applyMiddleware(...middleware),
                window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
            )
        );
    }
    return createStore(
        reducers,
        initialState,
        applyMiddleware(...middleware)
    );
}

export default store;

import axios from 'axios';
export const FETCH_USERS = 'FETCH_USERS';
export const FETCH_CONFIGS = 'FETCH_CONFIGS';

const instance = axios.create({
    baseURL: 'http://localhost:5000/api'
});

export const fetchUsers = () => async dispatch => {
    const res = await instance.get('/users/all');
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

export const fetchConfigs = () => async dispatch => {
    const res = await instance.get('/admin/settings');
    dispatch({
        type: FETCH_CONFIGS,
        payload: res
    });
};

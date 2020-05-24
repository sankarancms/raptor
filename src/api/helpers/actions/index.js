import axios from 'axios';
export const FETCH_USERS = 'FETCH_USERS';
export const fetchUsers = () => async dispatch => {
    const res = await axios.get('/api/users/all');
    dispatch({
        type: FETCH_USERS,
        payload: res
    });
};

import { FETCH_CONFIGS } from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case FETCH_CONFIGS:
            return action.payload.data;
        default:
            return state;
    }
}

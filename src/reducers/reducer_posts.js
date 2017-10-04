import { FETCH_POSTS, FETCH_POST, DELETE_POST } from '../actions';
import _ from 'lodash';

export default function (state = {}, action) {
    switch (action.type) {
        case FETCH_POST:

            // const post = action.payload.data;
            // const newState = { ...state };
            // newState[post.id] = post;
            // return newState;

            //below is ES6 equivalent of the above ES5 code
            return { ...state, [action.payload.data.id]: action.payload.data };
        case FETCH_POSTS:
            return _.mapKeys(action.payload.data, 'id');
        case DELETE_POST:
        //we probably dont have to deal with this case, because once deleted,
        //we redirect user to posts page where we fetch and load all the posts again.
        //But sometimes users are on slow internet connection and inorder for them
        //to not see the deleted post once redirected to posts page, we make sure to
        //remove the posts from the local state            
        return _.omit(state, action.payload);
        default:
            return state;
    }
}
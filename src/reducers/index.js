import * as actionTypes from '../actions/types'
import { combineReducers } from 'redux'

const initialUserState = {
    currentUser: null,
    isLoading: true
}

const user_reducer = (state = initialUserState, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false
            }
        case actionTypes.CLEAR_USER:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state
    }
}

const initialPostsState = {
    posts: null,
    isLoading: true
}

const posts_reducer = (state = initialPostsState, action) =>{
    switch(action.type){
        case actionTypes.GET_POSTS: 
            return{
                posts: action.payload.posts,
                isLoading: false
            }
        default: 
            return state
    }

}


const rootReducer = combineReducers({
    user: user_reducer,
    posts: posts_reducer
})

export default rootReducer

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import Spinner from './Spinner'

import './index.css';
import App from './components/App';
import Register from './components/auth/register'
import Login from './components/auth/login'
import * as serviceWorker from './serviceWorker';
import firebase from './firebase'
import  rootReducer from './reducers'
import {setUser, clearUser,getPosts} from './actions'
import MainBlog from './components/NewsFeeds/MainBlog'
import Post from './components/Post/Post.js'
import User from './components/User/User'
const store = createStore(rootReducer, composeWithDevTools())

class Root extends React.Component{ 

    componentDidMount(){
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.props.setUser(user)
                //  this.props.history.push("/")
            }else{
                this.props.history.push('/login');
                this.props.clearUser();
            }
        })
    
        const posts = this.getPostsFromFirebase()
            //          this.props.getPosts(posts)
        posts.then(val =>{
            let arr = Object.keys(val).map(key =>{
                return val[key]
            })
            
            this.props.getPosts(arr);
        })

        const users = this.getUsersFromFirebase();
        users.then(val =>{
            let usersLoaded = Object.keys(val).map(key =>{
                return val[key];
            })

            this.setState({users: usersLoaded})
        })
    }

    getPostsFromFirebase = async () =>{
        const postRef = firebase.database().ref('posts')
        const postsLoaded = () =>{
            return new Promise((reslove,reject)=>{
                postRef.once('value',posts=>{
                    reslove(posts.val())
                })

            })
        }

        return await postsLoaded();

    }

    getUsersFromFirebase = async () =>{
        const userRef = firebase.database().ref('users');
        const usersLoaded = () =>{
            return new Promise((reslove,reject) =>{
                userRef.once('value', users =>{
                    reslove(users.val())
                })
            })
        }
        return await usersLoaded();
    }

    
    state = {
        users: null,
    }


    render(){
        return this.props.isLoading ? <Spinner /> : (
          
            <Switch> 
                <Route exact path='/' component={App} />
                <Route path='/register' component={Register} />
                <Route path='/login' component={Login} />
                <Route path='/create-blog' component={MainBlog}  />

                {
                    this.props.posts ? this.props.posts.map(post =>(
                        <Route key={post.postId}  path={`/posts/${post.postId}`} render={props => <Post {...props} post={post} /> }  />
                    ))  : ''

                }

                {
                    this.state.users ? this.state.users.map((user,key) =>(
                        <Route key={user.uid} path={`/user/${user.uid}`} render={props => <User {...props} user={user} />}  />
                        
                    )) : ''
                }

            </Switch>

        );
    }
}

const mapStateFromProps = state => ({
    isLoading: state.user.isLoading,
    posts: state.posts.posts
})


const RootWithAuth = withRouter(connect(mapStateFromProps,{setUser,clearUser,getPosts})(Root))

ReactDOM.render(
    <Provider store={store}>
    <Router>
        <RootWithAuth />
    </Router>
    </Provider>
    , document.getElementById('root'));



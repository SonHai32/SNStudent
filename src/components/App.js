import React from 'react';
import {connect} from 'react-redux'
import './App.css';
import {  Grid,Responsive} from 'semantic-ui-react';
import HeaderPanel from './Header/header'
import SidePanelLeft from './SidePanel/SidePanelLeft'
import SidePanelRight from './SidePanel/SidePanelRight'
import NewsFeeds from './NewsFeeds/NewsFeeds'
import MainBlog from './NewsFeeds/MainBlog'
import Post from './Post/Post'
import Posts from './NewsFeeds/Posts'
import Footer from './Footer/Footer'
import MainHeader from './Header/MainHeader'
const App = ({currentUser,posts}) =>(

    <div className='container' style={{background: '#FFFFFF'}} >
        <MainHeader />
    
        <Posts posts={posts} />
        
        
        {posts ? <Footer />: ''}
    </div>
   
)

const mapStateToProps = state =>({
    currentUser: state.user.currentUser,
    posts: state.posts.posts
})

export default connect(mapStateToProps)(App);

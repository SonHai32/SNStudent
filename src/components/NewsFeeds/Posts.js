import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {Segment} from 'semantic-ui-react'
class Posts extends React.Component{
    state = {
        posts: this.props.posts
    }
    render(){

        return(
            <Segment >
                {
                   this.props.posts ? this.props.posts.map((post,key)=>(
                       <div key = {post.postId}>
                        <Link key={post.postId}  to={`/posts/${post.postId}`} >
                            aaaa
                        </Link>
                    </div>
                   ))  : ''
                }
            </Segment>
        
        )
        
    }
    
}

export default Posts 

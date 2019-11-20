import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom'
class MostRecentPost extends React.Component{
    render(){
        return(
        <div className='recent-posts-container' >
            <div className='recent-posts-title'>
                <span>Top bài viết nổi bật </span>
            </div>
            {this.props.posts.splice(0,4).map((post,key) =>(
                <div key={`recent-posts-contents-key-4${key}`} className='recent-posts-contents flex'>
                    <div key={`recent-post-key-${key}`} className='recent-post flex' >
                        <div key={`star-icon-key-${key}`} className='star-icon'>
                            {console.log(post)}
                            <i key={`i-key-${key}`} class="fas fa-star"></i>
                        </div>
                        <div key={`recent-post-author-key-${key}`} className='recent-post-author flex'>
                            <div key={`recent-post-author-name-key-${key}`} className='recent-post-author-name'>
                                <Link key={`link-key-user-${key}`} to={`/users`}> {post.createdBy}</Link>
                            </div>
                            <div key={`recent-post-title-key-${key}`} className='recent-post-title'>
                                <Link key={`link-to-post-key-${key}`} to={`/posts/${post.postId}`}>{post.title}</Link>
                            </div>
                            <div key={`recent-post-day-key-${key}`} className='recent-post-day-created'>
                                {moment(post.timestamp).format("DD/MM/YYYY")}      
                            </div>
                        </div>
                    </div>
                </div>

            ))}
        </div>
    )

    }
}

export default MostRecentPost

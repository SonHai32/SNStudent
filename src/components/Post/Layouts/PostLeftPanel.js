import React from 'react'
import "./style.css"
import {Link} from 'react-router-dom'
import {Label,Divider} from 'semantic-ui-react'
class PostLeftPanel extends React.Component{
    state = {
        post: this.props.post
    } 
    render(){
        const {post} = this.state;
        return(
            <div class='left-panel'>

                <div className='author-panel flex flex-column'>
                    <div className='avatar'>
                        <img className='author-img' src={post.avatarUrl} />
                    </div>   
                    <div className='author-name text-bold blue'>   
                        <Link to={`/profile/${post.userUID}`} >{post.createdBy}</Link>
                    </div>

                </div>
                <div className='author-info flex flex-row noselect'>
                    <div className='info right-divider'>
                        <div className='author-post-total border background-blue'>
                            0 Bài viết
                        </div>
                    </div>
                    <div className='info left-divider'>
                        <div className='author-follower-total border background-blue'>
                            0 Người theo dõi
                        </div>
                    </div>
                </div>
                <Divider />
                <div className='author-posts flex flex-column'>
                    <h3>Bài viết</h3>
                    <div className='post-list flex flex-column'>
                        <ul>
                            <li>
                                <Link>Bài viết 1</Link>
                            </li>
                            <li>
                                <Link>Bài viết 2</Link>
                            </li>
                        </ul>
                    </div>
                    <h3>
                        Bài viết liên quan
                    </h3>
                </div>
            </div>   
        )
    }
    
}

export default PostLeftPanel;

import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Segment} from 'semantic-ui-react'
import hljs from 'highlight.js'
import showdown from 'showdown'
import moment from 'moment'
class Posts extends React.Component{

    mdParser = (md) =>{
        const   converter = new showdown.Converter();
        const  html = converter.makeHtml(md);
        const reg = /\<p\>(.*?)<\/p>/g
        //let text = reg.exec(html)[1];
        let text = html.replace(/<.*?>/g,"")
        if(text && text.length > 600){
            text = text.slice(0, 600)
        }
        return text +' ...';
    }

    

    state = {
        posts: this.props.posts
    }


    render(){

        return(
            
            <div className='main-content'>
                {this.props.posts ?
                    (
                        <div className='blog-items'>
                            <div className='blog-nav flex'>
                                <h3>
                                    Bài viết mới
                                </h3>
                                <h3>
                                    Bài viết nổi bật
                                </h3>
                            </div>
                            {this.props.posts.map((post, key) =>(
                                <div key={`blog-post-key-${key}`} className='blog-post flex'>
                                    <div key={`blog-post-title-${key}`}  className='post-title'>
                                        <h4 key={`h-key-${key}`} >
                                            <Link to={`/posts/${post.postId}`}>{post.title}</Link>
                                        </h4>    
                                    </div>
                                    <div key={`post-contents-key-${key}`} className='post-contents'>
                                        <span>{this.mdParser(post.content)}</span>
                                    </div>
                                    {post.tags ? (
                                        
                                         <div key={`post-tagged-key-${key}`}  className='post-tagged flex'>
                                             {post.tags.map((tag,key) =>(
                                                <div className='tag-label'> 
                                                    <a href={`/tags/${tag}`} >{tag}</a>   
                                                </div>
                                             ))}
                                         </div>
                                    ) : ''} 
                                    <div key={`post-author-key-${key}`}  className='post-author flex'>
                                        <div className='author-avatar'>
                                            <img src={post.avatarUrl} className='circle-avatar' />
                                        </div>
                                        <div key={`author-post-stats-key-${key}`} className='author-post-stats flex'>
                                            <div key={`author-post-stats-name-key-${key}`} className='author-post-stats-name'>
                                                <a key={`user-link-key-${key}`}  href={`/users/id${post.userUID.slice(0,5)}name${post.createdBy}`}>{post.createdBy} </a>
                                            </div>
                                            <div key={`author-post-stats-day-created-key-${key}`} className='author-post-stats-day-created'>
                                                <span key={`day-key-${key}`}> Đã viết vào {moment(post.timestamp).format('DD/MM/YYYY')}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <span className='line-break' ></span>
                                </div>
                            ))}

                        </div>
                    )                
                : ''}
            </div>
        
        )
        
    }
    
}

export default Posts 

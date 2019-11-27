import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Segment} from 'semantic-ui-react'
import hljs from 'highlight.js'
import showdown from 'showdown'
import moment from 'moment'
import MostRecentPost from './MostRecentPosts'
import Footer from '../Footer/Footer'
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

    

   
    render(){

        return(
            
            <div className='main-content'>
                {this.props.posts ?
                    (
                        
                        <div className='blog-items'>

                            <MostRecentPost posts={this.props.posts} />
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
                                            <a href={`/posts/${post.postId}`}>{post.title}</a>
                                        </h4>    
                                    </div>
                                    <div key={`post-contents-key-${key}`} className='post-contents'>
                                        <span key={`span-post-contents-key-${key}`}>{this.mdParser(post.content)}</span>
                                    </div>
                                    {post.tags ? (
                                        
                                         <div key={`post-tagged-key-${key}`}  className='post-tagged flex'>
                                             {post.tags.map((tag,key) =>(
                                                <div key={`tag-label-key${key}`} className='tag-label'> 
                                                    <a key={`link-tag-key-${key}`} href={`/tags/${tag}`} >{tag}</a>   
                                                </div>
                                             ))}
                                         </div>
                                    ) : ''} 
                                    <div key={`post-author-key-${key}`}  className='post-author flex'>
                                        <div key={`author-avatar-key-${key}`} className='author-avatar'>
                                            <img key={`avat-img-key-${key}`} src={post.avatarUrl} className='circle-avatar' />
                                        </div>
                                        <div key={`author-post-stats-key-${key}`} className='author-post-stats flex'>
                                            <div key={`author-post-stats-name-key-${key}`} className='author-post-stats-name'>
                                                <a key={`user-link-key-${key}`}  href={`/users/id${post.userUID}`}>{post.createdBy} </a>
                                            </div>
                                            <div key={`author-post-stats-day-created-key-${key}`} className='author-post-stats-day-created'>
                                                <span key={`day-key-${key}`}> Đã viết vào {moment(post.timestamp).format('DD/MM/YYYY')}</span>
                                            </div>
                                        </div>

                                    </div>
                                    <span key={`line-break-key-${key}`}  className='line-break' ></span>
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

import React from 'react'
import {Link} from 'react-router-dom'
import {Grid,Segment} from 'semantic-ui-react'
import hljs from 'highlight.js'
import showdown from 'showdown'
class Posts extends React.Component{

    mdParser = (md) =>{
        const   converter = new showdown.Converter();
        const  html = converter.makeHtml(md);
        const reg = /\<p\>(.*?)<\/p>/g
        //let text = reg.exec(html)[1];
        let text = html.replace(/<.*?>/g,"")
        if(text && text.length > 180){
            text = text.slice(0, 180)
        }
        return text +' ...';
    }

    

    state = {
        posts: this.props.posts
    }


    render(){

        return(
            
            <div className='wrapped'>
                {this.props.posts ?
                    (
                    
//                         <div class="main">
//                             <div className='new-blog'>
//                                 <h2>bài viết mới</h2>
//                                 <div className="blog-contents">
//                                     {
//                                         this.props.posts.slice(0,8).map((post,key) =>(
//                                             <div className="blog-post" onClick={()=>{
//                                                 window.location.href = `/posts/${post.postId}`
//                                             }} >
//                                                 <div className="post-container">
//                                                     <div className="post-title noselect">
//                                                         <h3>  {post.title} </h3>
//                                                         
//                                                     </div>
//                                                     <div className="post-content">
//                                                         <h5>
//                                                             {this.mdParser(post.content)}
//                                                         </h5>
//                                                     </div>
//                                                 </div>    
//                                             </div>
//                                         ))
//                                     }
//                                 </div>
//                             </div>
//                         </div>
                    
                        <div className='blog'>
                            <div className='nav-blog flex-row'>
								
									<li>
                                		<h2 className='blog-title-new'> Bai Viet Moi </h2>
									</li>
									<li>
                                		<h2> Bai Viet Noi Bat </h2>
									</li>

								
                            </div>
                            
                            <div className='blog-container flex-column'>
                                {
                                    this.props.posts.slice(0,6).map((post,key) =>(
                                        <div className='blog-post'>
                                            <div className='post-title'>
                                                <h3> {post.title} </h3>
                                            </div>

                                            <div className='post-content'>
                                                <h5>
                                                    {this.mdParser(post.content)}
                                                </h5>
                                            </div>
                                            <div className='post-author'>
                                                sonhai
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    
                    )                
                : ''}
            </div>
        
        )
        
    }
    
}

export default Posts 

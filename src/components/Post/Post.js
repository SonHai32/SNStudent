import React from 'react'
import {Segment,Header,Label}  from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import './style.css'
import moment from 'moment'
import HeaderPanel from '../Header/header'
import MainHeader from '../Header/MainHeader'
import PostLeftPanel from './Layouts/PostLeftPanel'
import PostRightPanel from './Layouts/PostRightPanel'
class Post extends React.Component{
    state = {
        windowWidth: window.innerWidth,
    }
    
    updateWidth = () =>{
        this.setState({windowWidth: window.innerWidth})
    }

    componentDidMount(){
        window.addEventListener('resize',this.updateWidth)
    }

    componentWillUnmount(){
        window.removeEventListener('resize',this.updateWidth)
    }
    
    render(){
        const {post,windowWidth} = this.state
        return(
            <div className='main-container' >
                <MainHeader />
                {windowWidth > 1230 ?  <PostLeftPanel post={this.props.post} /> :  ''}
                <PostRightPanel post={this.props.post} />
                                {
                
                     this.props.post ? (
                         <Segment raise className='post-container'  style={{width: windowWidth > 1230 ? '50%' : '95%',position: 'absolute', left: '50%',top: '80px', transform: 'translate(-50%)'}}  >
                             <div className='post-header' >
                                                            
                                 <Header as='h1'>
                                     <strong> {this.props.post.title}</strong>
                                </Header>

                                {
                                    this.props.post.tags ? (
                                        <Label.Group>
                                            {this.props.post.tags.map((tag,key)=>(
                                                <Label as='a' >{tag}</Label>
                                            ))}
                                        </Label.Group>
                                    ) : ''
                                }
                                
                                <div className='author' >
                                    <img className='author-avatar' src={this.props.post.avatarUrl} /> 
                                    <p className='author-date-created'  > 
                                        {this.props.post.createdBy} Đã viết vào ngày {moment(this.props.post.timestamp).format("DD/MM/YYYY")}
                                    </p>
                                </div>
                            </div>
                                
                                <div className='post-content' style={{width: '100%'}} >
                                    <ReactMarkdown  source={this.props.post.content} plugins={[toc]}  /> 
                                </div>
                        </Segment>
                     )  :''

                }
            </div>
        )
    }
}

export default Post

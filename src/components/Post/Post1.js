import React from 'react'
import {Link} from 'react-router-dom'
import {Menu,Segment,Header,Label,Icon,Divider,Image,Button}  from 'semantic-ui-react'
import firebase from '../../firebase'
import ReactMarkdown from 'react-markdown'
import toc from 'remark-toc'
import htmlParser from 'react-markdown/plugins/html-parser'
import showdown from 'showdown'
import ReactDOM from 'react-dom'
import './style.css'
import moment from 'moment'
import HeaderPanel from '../Header/header'
import PostLeftPanel from './Layouts/PostLeftPanel'
class Post1 extends React.Component{
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
            <div className='wrapper-container' >
                {windowWidth > 1230 ?  <PostLeftPanel post={this.props.post} /> :  ''}
                <HeaderPanel />
                                {
                
                     this.props.post ? (
                         <Segment raise  style={{width: windowWidth > 1230 ? '50%' : '95%',position: 'absolute', left: '50%',top: '80px', transform: 'translate(-50%)'}}  >
                             <div className='post-header' >
                                                            
                                 <Header as='h1' style={{color: "#008FFF"}}>
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


                                <ReactMarkdown  source={this.props.post.content} plugins={[toc]}  /> 
                        </Segment>
                     )  :''

                }
            </div>
        )
    }
}

export default Post1

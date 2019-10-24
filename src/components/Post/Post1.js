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
class Post1 extends React.Component{
    state = {
        postRef: firebase.database().ref('posts'),
        post: ''
    }

    componentDidMount(){
       this.postListener()
    }

    postListener = () =>{
        const {postRef} = this.state;
        
        postRef.on('child_added', post =>{
            this.setState({post: post.val().content})
        })


        

        //        const result = getPost();
        //        result.then(val =>{
        //            this.setState({post: this.state.post.concat(val)},()=>{
        //                console.log(this.state.post) 
        //            })
        //        }).catch(err=>{
        //            console.log(err)
        //        })
        

    } 

    converter = (post) =>{
        let container = document.getElementById('container')
        let p = document.createElement('p')
        let converter = new showdown.Converter();
        let text = " ``` import React from 'react'; import ReactDOM from 'react-dom';  class PortalExample extends React.Component {   constructor (props) {     super(props);      this.nodeElement = document.getElementById('portal');   }  ``` "
        let metadata = converter.makeHtml(post)
        const parser = new DOMParser()
        let a =  parser.parseFromString(metadata, 'text/html')



    }

    constructor (props){
        super(props);

        this.nodeElement = document.getElementById('portal')
    }
 

    
    
    render(){
        const {post} = this.state
        return(
            <div className='wrapper-container' >
                <HeaderPanel />
                 {
                
                     this.props.post ? (
                         <Segment raise  style={{width: '50%',position: 'absolute', left: '50%',top: '5%', transform: 'translate(-50%,5%)'}}  >
                             <div className='post-header' >
                                                            
                                 <Header fluid as='h1' style={{color: "#008FFF"}}>
                                     {this.props.post.title}
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

import React from 'react';
import {Comment,Icon,Header,Segment} from 'semantic-ui-react';
import uuidv4 from 'uuid/v4'
import "./style.css";
import firebase from '../../../firebase';
import {connect} from 'react-redux' 
import moment from 'moment'
class PostRightPanel extends React.Component{
    state ={
        postRef: firebase.database().ref('comments'),
        commentRef: firebase.database().ref('comments'),
        commentInput: '',
        comments: [],
        
    }

    loadComment = async ()=>{
        
        let postKey = await  new Promise((reslove,reject) =>{
            firebase.database().ref().once('value', snap =>{
                if(snap.hasChild('comments')){
                    this.state.commentRef.orderByChild('postId').equalTo(this.props.post.postId).on('child_added', snap =>{
                        reslove(snap.key);
                    })
                }
            })
        })
        if(postKey){

            return  await new Promise((reslove,reject)=>{
                const comments = []
                this.state.commentRef.child(postKey).child('comments').on('child_added', snap =>{
                    comments.push(snap.val())
                })
                reslove(comments)
            })

        }


    } 
    commentHandleChange = event =>{
        event.preventDefault();
        this.setState({commentInput: event.target.value}); 
    }

    commentValid = () =>{
        if(this.state.comments.length > 3000){
            return false;
        }else{
            return true;
        }
    }

    handleSendButton = event =>{
        event.preventDefault();
        if(this.commentValid()){
            try{
                this.sendComment();
            }catch(err){
                console.log(err)
            }
        }
    }

    sendComment = async () =>{
        const {commentRef,commentInput} = this.state;
        const hasComments = await new Promise((reslove,reject) =>{
            firebase.database().ref().once('value', snap =>{
                reslove(snap.hasChild('comments'))
            })
        }) 
        if(!hasComments){
            const comment = {
            commentId: uuidv4(), 
            postId: this.props.post.postId,
            comments: [
                    {
                        text: commentInput,
                        byUser: this.props.currentUser.displayName,
                        byUserId: this.props.currentUser.uid,
                        avatar: this.props.currentUser.photoURL,
                        timestamp: Date.now(),
                    } 
                ]
            }
            await firebase.database().ref().child('comments').push(comment).then(this.setState({commentInput: ''}));
            
        }else{
            await commentRef.orderByChild('postId').equalTo(this.props.post.postId).on('child_added', snap =>{
                commentRef.child(snap.key).child('comments').push({
                    text: commentInput,
                    byUser: this.props.currentUser.displayName,
                    byUserId: this.props.currentUser.uid,
                    avatar: this.props.currentUser.photoURL,
                    timestamp: Date.now()
                }).then(this.setState({commentInput: ''}))
            })
        }
    }
    componentDidMount(){
        firebase.database().ref().on('value',snap =>{
            const comments = this.loadComment()
        comments.then(val =>{
            this.setState({comments: val.sort((a,b) =>{
                return b.timestamp - a.timestamp
                //TODO sort comments with time
            })})
        })
 
        })
            }

    

    render(){
        const {comments, commentInput} = this.state;
    
        return(
     
            <div className='right-panel flex flex-column space-between'>
                <Segment className='comment-box'  raised style={{height: '100%', overflowY: 'auto'}}>
                    <Header  as='h3'>Bình luận</Header>
                    {
                        comments.length > 0 ?(
                            
                                comments.map(comment => (
                                     <Comment.Group key={`commentGroup${uuidv4()}`} >
                                     <Comment key={`comment${uuidv4()}`} >
                                        <Comment.Avatar key={`commentAvatar${uuidv4()}`}  as='a' src={comment.avatar} />
                                        <Comment.Content key={`commentContent${uuidv4()}`} >
                                            <Comment.Author as='a' key={`commentAuthor${uuidv4()}`} >{comment.byUser}</Comment.Author>
                                            <Comment.Metadata key={`commentMeta${uuidv4()}`} >
                                                <span key={`time${uuidv4()}`} >{moment(comment.timestamp).format('LT')}</span>
                                            </Comment.Metadata>
                                            <Comment.Text key={`comemntText${uuidv4()}`}  >
                                                {comment.text}
                                            </Comment.Text>
                                        </Comment.Content>

                                    </Comment>
                                </Comment.Group>
                
                                ))
                            
                                   
                        ) : ''
                    }
                                   </Segment>
                <Segment className='chat flex flex-row space-between'>
                    <img className='user-avatar' src={this.props.currentUser.photoURL} />  
                    <textarea  value={commentInput}  onChange={this.commentHandleChange} className='chat-area' placeholder='Nhập bình luận' />                     
                    <button onClick={this.sendComment}  className='btn-send'>
                        Gửi
                    </button>
                </Segment>
            </div>
        )
    }
}
const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(PostRightPanel)

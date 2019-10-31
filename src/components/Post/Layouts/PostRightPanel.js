import React from 'react';
import {Comment,Icon,Header,Segment} from 'semantic-ui-react';
import uuidv4 from 'uuid/v4'
import "./style.css";
import firebase from '../../../firebase';
import {connect} from 'react-redux' 
class PostRightPanel extends React.Component{
    state ={
        comments: [],
        postRef: firebase.database().ref('comments'),
        commentRef: firebase.database().ref('comments'),
        commentText: ''
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

            const a = await new Promise((reslove,reject)=>{
                const comments = []
                this.state.commentRef.child(postKey).child('comments').on('child_added', snap =>{
                    comments.push(snap.val())
                })
                reslove(comments)
            })
            this.setState({commentsText: a },()=>{
                console.log(this.state.commentsText)
            } )       

        }


        //        await firebase.database().ref().once('value', snap =>{
        //            if(snap.hasChild('comments')){
        //            
        //                this.state.commentRef.orderByChild('postId').equalTo(this.props.post.postId).on('child_added', snap =>{
        //                    postKey = snap.key; 
        //                })
        //            }
        //        })
        //        await this.state.commentRef.child(postKey).child('comments').on('child_added', snap =>{
        //            console.log(snap.val())
        //        })


        // this.state.postRef.orderByChild('comments').equalTo().on('child_added', snap =>{
        //  console.log(snap.val())        
        // })
    }
        
    commentHandleChange = event =>{
        event.preventDefault();
        this.setState({commentText: event.target.value}); 
    }

    commentValid = () =>{
        if(this.state.commentText.length > 3000){
            return false;
        }else{
            return true;
        }
    }

    handleSendButton = event =>{
        event.preventDefault();
        if(this.commentValid()){
           this.sendComment();
        }
    }

    sendComment = async () =>{
        const {commentText,commentRef,comments} = this.state;
    
        if(!comments.length === 0){
        
            const comment = {
            commentId: uuidv4(), 
            postId: this.props.post.postId,
            comments: [
                    {
                        text: commentText,
                        byUser: this.props.currentUser.uid,
                    } 
                ]
            }
            await firebase.database().ref('/').child('comments').push(comment).then(console.log('done'));
            
        }else{
            let postKey;
            await commentRef.orderByChild('postId').equalTo(this.props.post.postId).on('child_added', snap =>{
                postKey = snap.key
            })
            await commentRef.child(postKey).child('comments').push(
                {
                    text: commentText,
                    byUser: this.props.currentUser.uid
                }
            )
            
        }
    }
    componentDidMount(){
        const a = this.loadComment()
    }

    

    render(){
        const {commentText} = this.state;
    
        return(
     
            <div className='right-panel flex flex-column space-between'>
                <Segment raised style={{height: '100%'}}>
                    <Header as='h3'>Bình luận</Header>
                    <Comment.Group>
                        <Comment>
                            <Comment.Avatar  as='a' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'  />
                            <Comment.Content>
                                <Comment.Author as='a'>Hai</Comment.Author>
                                <Comment.Metadata>
                                    <span>12:03</span>
                                </Comment.Metadata>
                                <Comment.Text>
                                </Comment.Text>
                            </Comment.Content>

                        </Comment>
                    </Comment.Group>
                </Segment>
                <Segment className='chat flex flex-row space-between'>
                    <img className='user-avatar' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>  
                    <textarea value={commentText}  onChange={this.commentHandleChange} className='chat-area' placeholder='Nhập bình luận' />                     
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

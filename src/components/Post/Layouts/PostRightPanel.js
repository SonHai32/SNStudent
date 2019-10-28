import React from 'react'
import {Comment,Icon,Header} from 'semantic-ui-react'
import "./style.css"

class PostRightPanel extends React.Component{
    render(){
        return(
     
            <div className='right-panel flex flex-column space-between'>
                <Header style={{background: '#FFFFFF',padding: '2%', margin: 0}} >Bình luận</Header>
                <div className='comments-box'>
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
                </div>
                <div className="chat">
                    <img className='user-avatar' src='https://react.semantic-ui.com/images/avatar/small/matt.jpg'/>  
                    <textarea className='chat-area' placeholder='Nhập bình luận' />                     
                </div>
                <div className='action'>
                    <button className='btn-send'>
                        Gửi
                    </button>
                </div>
            </div>
        )
    }
}

export default PostRightPanel

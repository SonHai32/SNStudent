import React from 'react'
import { Modal, Header,Form,Image, Button, Input, TextArea, Segment, Grid } from 'semantic-ui-react';
import {Picker,emojiIndex} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import uuid from 'uuidv4'

import firebase from '../../firebase'
import FileModal from './FileModal'


import pictureIcon from '../../Images/picture.svg'
import tagFriends from '../../Images/tagfriends.svg'
import locationIcon from '../../Images/location.svg'
import editIcon from '../../Images/edit.svg'
import smileIcon from '../../Images/smile.svg'

class CreatePostModal extends React.Component{

    state = {
        postText: '',
        postImages: [],
        emojiPicker: false,
        selectionStart: 0,
        fileModal: false,        
        uploadTask: null,
        uploadPercent: 0,
        storeRef: firebase.storage().ref(),
        postsRef: firebase.database().ref('posts'),
        files:[]
      
        
    }
    


    handleTogglePicker = () =>{
        this.setState({emojiPicker: !this.state.emojiPicker})
    }

    handlePostChange = event =>{
        this.setState({postText: event.target.value})
    }

    handleEmojiSelect = emoji =>{
        console.log(emoji)
        const oldPost = this.state.postText;
        const newPost = this.addEmojiToInputWithSeletionStart(oldPost,this.state.selectionStart,this.colonToUnicode(emoji.colons));
        this.setState({postText: newPost})
    
    }
    


    colonToUnicode = emojiMessage =>{
        let x = emojiMessage.replace(/:/g,"")
        let emoji = emojiIndex.emojis[x];
        if(emoji !== undefined){
            let unicode = emoji.native
            if(unicode !== undefined){
                return unicode
            }else{
                return null
            }
        } 
        

    }

addEmojiToInputWithSeletionStart = (post, selectionStart,emoji) =>{
 
    if(post){
        if(emoji){
            
            return post.substring(0,selectionStart) +emoji+ post.substring(selectionStart,post.length)
        }else{
            return post
        }
    }else{
        if(emoji){
            return post + emoji
        }
    }
}

inputClicked = event =>{
   
    this.setState({selectionStart: event.target.selectionStart});
    
}

inputKeyPressed = event =>{
    this.setState({selectionStart: event.target.selectionStart});
    
    
}

openFileModal = () =>{
    this.setState({fileModal: true})
}

closeFileModal = () =>{
    this.setState({fileModal: false})
}

fileStateToProp = files =>{
   
    this.setState({files: this.state.files.concat(files)})
    console.log(this.state.files)
}

uploadFile = () =>{
    
    if(this.state.files.length > 0){
        this.state.files.forEach(file =>{
            const filePath = this.props.user.uid+'/media/image/'+uuid()+'.jpg'; 
            const uploadTask = this.state.storeRef.child(filePath).put(file.file,file.metadata)
            this.setState({uploadTask}, () =>{
                this.state.uploadTask.on('state_changed', snap =>{
                    const uploadPercent = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                    this.setState({uploadPercent}, () =>{
                        console.log(this.state.uploadPercent)
                    })
                })
            })
        })
    }
    // const uploadTask = this.state.storeRef.child(filePath).put(file,metadata);
    // this.setState({uploadTask},()=>{
    //     this.state.uploadTask.on('state_changed', snap =>{
    //         const uploadPercent = Math.round((snap.bytesTransferred / snap.totalBytes)*100) 
    //         this.setState({uploadPercent},()=>{
    //             if(this.state.uploadPercent == 100){
    //                 setTimeout(()=>{
    //                     this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadURL =>{
    //                         const image = [];
    //                         image.push({downloadURL: downloadURL, imagePath: this.state.uploadTask.location_.path})
    //                         this.setState({postImages: this.state.postImages.concat(image)},()=>{
    //                             console.log(this.state.postImages)
    //                         })
    //                     })
    //                 },800 - this.state.uploadPercent)
    //             }
    //         })
    //     });
        
    // })
    
    
}



savePost = event =>{
    event.preventDefault();
    // const postChild = this.props.user.uid+uuid()+'/post';
    // const postCreate ={
    //   postChild: postChild,
    //   createByUid: this.props.user.uid,
    //   createByName: this.props.user.displayName,
    //   avatar: this.props.user.photoURL ,
    //   timestamp: Date.now(),
    //   postImages: Array().concat(this.state.postImages),
    //   postText: this.state.postText,
    //   liked: [{username: 'null', userUID: 'null'}]
    // }
    
    // this.state.postsRef.child(postChild).set(postCreate).then(()=>{
    //     this.setState({postText: '', postImages: []});
    //     this.props.closeModal()
    // })
    this.uploadFile()
    
  }

  displayImages = files =>{
        
          return(
              <Grid columns={6}>
                  <Grid.Row > 
{files.map((val,key) =>(
    <Grid.Column  >
        <Image style={{width:'100px', height: '100px', objectFit:'cover'}} key={key} src={val.url} />
        
    </Grid.Column>
))}
                  </Grid.Row>
              </Grid>
          )
      
  }


    render(){

        const {postText,emojiPicker,files} = this.state;
        const {user,modal,closeModal} = this.props;
        
        return(
            <div className="wrapper">
                <FileModal files={this.state.files} fileStateToProp={this.fileStateToProp} fileModal={this.state.fileModal} uploadFile={this.uploadFile} closeModal={this.closeFileModal} />

                <Modal centered size='small' open={modal} onClose={closeModal} closeIcon style={{top: '10%', transform: 'translateY(-10%)'}}>
                <Modal.Header >
                <Header as='h3'> 
        
                    <Header.Content style={{opacity: 0.6}}> <Image spaced='right' style={{width:'30px'} } src={editIcon} />Tạo Bài Viết  </Header.Content>
      
                </Header>
                </Modal.Header>
                <Modal.Content>
                    <Form style={{marginTop: '5px'}}>
                        <Form.Group >
                            <Image inline size='tiny' avatar src={user.photoURL}/>


                            <Form.Field  style={{width: '100%'}} >
                                
                            
                                <TextArea
                                    rows={1}
                                    value={postText} 
                                    type='text' 
                                    placeholder="Bạn muốn chia sẻ điều gì ?" 
                                    transparent 
                                    onClick={this.inputClicked}
                                    onChange={this.handlePostChange} 
                                    style={{height: '100%',fontSize: 16,float: 'left',border: 'none', background: 'none', resize: 'none'}} 
                                    onKeyUp={this.inputKeyPressed}  
                                />
                                
                        

                            </Form.Field>
                            
                        </Form.Group>
                        
                        <Button.Group widths={4}  size='small' compact fluid>
                            <Button  onClick={this.openFileModal}>
                            <Image style={{width:'30px'}} spaced='right' centered  src={pictureIcon} />
                         
                            <span style={{marginLeft:'10px'}}>Ảnh/Video</span>

                            </Button>
                          
                            <Button      >
                            <Image  style={{width:'30px'}} spaced='right' centered  src={tagFriends} />
                         
                            <span style={{marginLeft:'10px'}}>Gắn thẻ bạn bè</span>

                            </Button>
                            
                            <Button  onClick={this.handleTogglePicker}>
                            <Image style={{width:'30px'}} spaced='right' centered  src={smileIcon} />
                         
                            <span style={{marginLeft:'10px'}}>Cảm xúc </span>{
                              
                            }
                            
                            </Button>
                            {emojiPicker ? (
                                (
                                    <div onMouseLeave={this.handleTogglePicker} className="emoji-mart-select">
                                        <Picker 

                                            i18n={{ search: 'Tìm kiếm', categories: { search: 'Tìm kiếm theo mục', recent: 'Đã sử dụng gần đây' } }}
                                            onSelect={this.handleEmojiSelect}
                                            set='facebook'
                                            emoji='point_up'
                                            style={{position: "absolute",left:'55%', top:'65%'}}
                                    
                                        />
                                    </div>
                                )
                            ) : ''}
                          
                           
                        </Button.Group>
                        


                        <Form.Button onClick={this.savePost}  color='green' fluid style={{marginTop: '50px'}}>Đăng bài</Form.Button>
                                
                    </Form> 
                   
                    {files.length > 0 ?  (
                        <Segment>  
                            {
                                this.displayImages(files)
                            }
                            
                        </Segment>
                    ): ''}
                </Modal.Content>
            </Modal>
            </div>
        );
    }
}

export default CreatePostModal
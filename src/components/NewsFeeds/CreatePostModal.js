import React from 'react'
import { Modal, Header,Form,Image, Button, TextArea, Icon } from 'semantic-ui-react';
import {Picker,emojiIndex} from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import uuid from 'uuidv4'
import DisplayError from '../Error/DisplayError'

import firebase from '../../firebase'
import FileModal from './FileModal'
import  ImageResizer from'../ImageResize'

import pictureIcon from '../../Images/picture.svg'
import tagFriends from '../../Images/tagfriends.svg'

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
        files:[], 
        fileLoading: false,
        imageResize: [],
        imageDisplay: 0,
        errorMessage: '',
        errorModal: false,
      
        
    }
    


    handleTogglePicker = () =>{
        this.setState({emojiPicker: !this.state.emojiPicker})
    }

    handlePostChange = event =>{
        this.setState({postText: event.target.value})
    }

    handleEmojiSelect = emoji =>{
        
        let oldPost = this.state.postText;   
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
 
    if(post !== ''){
        if(emoji){
            if(selectionStart ===0 ){
                return  post + emoji
            }else{
                let oldSelectionStart = selectionStart
                this.setState({selectionStart: selectionStart + emoji.length})
                return post.substring(0,oldSelectionStart) +emoji + post.substring(oldSelectionStart,post.length)
            }
    
          
        }else{
            return post
        }
    }else{
        if(emoji){
            return post  +emoji
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

closeErrorModal = () =>{
    this.setState({errorModal: false},()=>this.setState({errorMessage: ''}));
}

fileStateToProp = files =>{
   
    this.setState({files: this.state.files.concat(files)},()=>{
        this.displayImage(this.state.files)
    })
    

}



savePost =  async () =>{
   if(this.state.files.length>0){
       const putFileToStorge = this.state.files.map((file)  =>{
           return new Promise((resolve,reject)=>{
            const filePath = this.props.user.uid+'/media/image/'+uuid()+'.jpg'
               this.state.storeRef.child(filePath).put(file.file,file.metadata).then(snapshot =>{
                   snapshot.ref.getDownloadURL().then(downloadUrl => resolve(downloadUrl)).catch(err=>{
                       if(err){
                           reject(err)
                       }
                   })
               })
           })
       })

       await Promise.all (putFileToStorge).then(images=>this.uploadPostToDatabase(images)).catch(err=>this.setState({errorMessage: err}))
   }  
    
}



uploadPostToDatabase = images =>{
    
    const postChild = this.props.user.uid+uuid()+'/post';
    const postCreate ={
      postChild: postChild,
      createByUid: this.props.user.uid,
      createByName: this.props.user.displayName,
      avatar: this.props.user.photoURL ,
      timestamp: Date.now(),
      postImages: images ? images : [],
      postText: this.state.postText,
      liked: [{username: 'null', userUID: 'null'}]
    }
    
    this.state.postsRef.child(postChild).set(postCreate).then(()=>{
        this.setState({postText: '', postImages: []});
        this.props.closeModal()
    }).catch(err => this.setState({errorMessage: err}))
    
  }




displayImage = async (images) =>{

    let container = document.getElementById('image-upload-limit-container');
    let imageUploadCounter = () =>{
        return container.getElementsByTagName('img').length
    }

    let count = await imageUploadCounter();

     this.getImagesResized = await new Promise((resolve,reject)=>{
        for(let i = count ; i < images.length; i++){
             this.resizing = new Promise((resolve,reject)=>{
                ImageResizer(images[i].url, 120 , newImage => {
                    resolve(newImage)
                })
            })
            .then(result => {
                let div = document.createElement('div');
                div.setAttribute('class','image-uploaded-container')
                div.setAttribute('id',`image-${images[i].key}-uploaded`)
                let img = document.createElement('img');
                img.setAttribute('class','image-uploaded-display');
                img.setAttribute('src',result)
                img.setAttribute('key',images[i].key)
                let iconRemove = document.createElement('i');
                iconRemove.setAttribute('title',"Xóa ảnh")
                iconRemove.setAttribute('aria-hidden',"true")
                iconRemove.setAttribute('class',"remove large icon")
                iconRemove.setAttribute('id','icon-remove-image')
                iconRemove.setAttribute('key',images[i].key)
                iconRemove.onclick = (event) =>{this.removeImageUpload(event.target.getAttribute('key'))}
                div.appendChild(img);
                div.appendChild(iconRemove)
                
                container.appendChild(div)
            })
        }
       resolve('done')
    }


    
    )

    
}

removeImageUpload = key =>{
   

    document.getElementById(`image-${key}-uploaded`).remove()
    this.setState({files: this.state.files.filter((val,index,arr)=>{
        return val.key !== key
    })},()=>console.log(this.state.files.length))
        

}




    render(){

        const {postText,emojiPicker,files,errorMessage,errorModal} = this.state;
        const {user,modal,closeModal} = this.props;
        
        return(
            <div className="wrapper">
                <DisplayError errorModal={errorMessage.length > 0} closeModal={this.closeErrorModal} error={errorMessage}/>
                <FileModal files={this.state.files} fileStateToProp={this.fileStateToProp} fileModal={this.state.fileModal} uploadFile={this.uploadFile} closeModal={this.closeFileModal} />

                <Modal centered  open={modal} onClose={closeModal} closeIcon style={{top: '10%', transform: 'translateY(-10%)',maxWidth: '1000px'}}>
                <Modal.Header >
                <Header as='h3'> 

                    <Header.Content style={{opacity: 0.6}}> <Image spaced='right' style={{width:'30px'} } src={editIcon} />Tạo Bài Viết {this.state.postImages.length} </Header.Content>
      
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
                                    transparent='true'
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
                                            style={{position: "absolute",left:'55%', top:'65%', zIndex: '1000'}}
                                    
                                        />
                                    </div>
                                )
                            ) : ''}
                          
                           
                        </Button.Group>
                        


                        <Form.Button onClick={this.savePost}  color='green' fluid style={{marginTop: '50px'}}>Đăng bài</Form.Button>
                                
                    </Form> 
                    
                    {files.length > 0 ?  (
                       
                         <div  id='image-upload-limit-container'>
                             

                             <div>
                             <div className='add-image-box' title='Thêm ảnh' onClick={this.openFileModal}  >
                             
                                                 <Icon  size='large' name='plus' className='icon-remove-image'  color='black' style={{position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',cursor: 'pointer'}} />
                                             </div>
                             </div>{
                                 
                             }
                         </div>
                        
                    ): ''}
                </Modal.Content>
            </Modal>
            </div>
        );
    }
}

export default CreatePostModal

import React from 'react'
import {Segment,Header,Icon, Feed,Image, Divider,  Button, List, Dropdown, Container, Loader, Dimmer} from 'semantic-ui-react'
import { Gallery, GalleryImage } from "react-gesture-gallery";
import uuid from 'uuidv4'
import firebase from '../../firebase'
import FileModal from './FileModal'
import ImageModal from './ImageModal'
import * as moment from 'moment'
import editIcon from '../../Images/edit.svg'
import CreatePostModal from './CreatePostModal'
import DisplayError from '../Error/DisplayError'
import DisplayImageNewsFeed from './DisplayImageNewsFeed'
import ImageSwiper from './ImageSwiper'





class NewsFeeds extends React.Component{

    state ={
      like: false,
      user: this.props.currentUser,
      post: '',
      fileModal: false,
      imageModalStatus: false,
      imageModalURL: '',
      imagePost: [],
      postCreate: [],
      postModal: false,
      postFromDatabase: [],

      databaseRef: firebase.database().ref('posts'),
      imageLoading: false,
      postLoading: false,
      postDrowdownOptions: [
        {
          key: 'savePost',
          text: <span><Icon circular size='small' name='tag' />Lưu bài viết</span>,

          
        },
        {
          key: 'postReport',
          text :  <span onClick={this.handleMessage} ><Icon circular size='small' name='warning' />Báo cáo bài viết</span>,
          
        
      },

      ]
   
    }

    componentDidMount(){
      this.addPostListener()
    }

    addPostListener = () =>{

      const ref = firebase.database().ref('posts')
      const postLoaded = []
      ref.on('child_added',snap =>{
        ref.child(snap.key).on('child_added',snap => postLoaded.push(snap.val()));
        this.setState({postFromDatabase: postLoaded.sort((a,b) =>{return b.timestamp-a.timestamp})})
        
      })
    
  
    }



  

    openImageModal = event =>{
     
      this.setState({imageModalStatus: true, imageModalURL: event.target.name})
    }

    closeImageModal = () =>{
      this.setState({imageModalStatus: false, imageModalURL:''})

    }

    openPostModal = () =>{
      this.setState({postModal: true})
    }

    closePostModal = () =>{
      this.setState({postModal: false})
    }

   


      

      handleLikeClicked = (event, {name}) =>{
     
        event.preventDefault();
        const post = this.state.postFromDatabase.filter((val,key,arr)=>{
          return val.postChild === name
        })

        console.log(post[0].avatar);

        
        
        let postLiked= post[0].liked;

        const  currentUserLiked = postLiked.some(val=>{
          
          return val.userUID === this.state.user.uid;
         
        })


        const imageNotExist = post[0].postImages === undefined;
      
        if(currentUserLiked){
            postLiked = postLiked.filter((val,index,arr)=>{
            return val.userUID !== this.state.user.uid
          })
        }else{
          postLiked.push({username: this.state.user.displayName, userUID: this.state.user.uid})
        }
  
        let postUpdate ;
        if(imageNotExist){
          post.forEach(val=>{
            postUpdate ={
              postChild: val.postChild,
              createByUid: val.createByUid,
              createByName: val.createByName,
              avatar: val.avatar,
              timestamp: val.timestamp,
              postText: val.postText,
              liked: postLiked
            }
            
          
          })
         
        }else{
          post.forEach(val=>{
            postUpdate ={
              postChild: val.postChild,
              createByUid: val.createByUid,
              createByName: val.createByName,
              avatar: val.avatar,
              timestamp: val.timestamp,
              postImages: val.postImages ,
              postText: val.postText,
              liked: postLiked
            }
            
          
          })
        }
       
  
         this.state.databaseRef.child(name).set(postUpdate).then(()=>this.addPostListener()).catch(err=>console.log(err))
  
      
      }

      

      
      displayImagePost = ({imagePost}) =>(
        // this.state.uploadStatus.includes('uploading')  ? 
        // <Segment size='large' loading={this.state.percentUploaded < 100} >
        //   <List horizontal>
          
        //       {imagePost.map((val,key) => (
        //         <List.Item key={key+uuid} style={{marginRight: '15px'}}> 

        //             <Image  rounded size='small' key={val.downloadURL} src={val.downloadURL} label={{as: 'a' ,name: key, corner:'right', icon:'remove',size: 'mini',color:'red',onClick: this.removeImagePost}} /> 
                
        //         </List.Item> ) )}
                
        //     <List.Item>
        //       <Icon style={{cursor: 'pointer', boder: 'solid 2px '}} color='black' inverted name='add' size='big' onClick={this.openModal} />
        //     </List.Item>
        //   </List>
          
        // </Segment> : ''
        <Dimmer.Dimmable  > 
          <Dimmer inverted active={this.state.percentUploaded > 0 && this.state.percentUploaded <100}>
            <Loader>Loading</Loader>
           
          </Dimmer>

          <List horizontal>
          
              {imagePost.map((val,key) => (
                  <List.Item key={key+uuid} style={{marginRight: '15px'}}> 
  
                      <Image wrapped rounded size='small' key={val.downloadURL} src={val.downloadURL} label={{as: 'a' ,name: key, corner:'right', icon:'remove',size: 'tiny',color:'red',onClick: this.removeImagePost}} /> 
                  
                  </List.Item> ) )}
                  
              {imagePost.length > 0 ? 
                <List.Item>
              <Icon link color='black' inverted name='add' size='big' onClick={this.openFileModal} />
            </List.Item>
            : ''  
          }
            </List>
            
    
     
          
        </Dimmer.Dimmable>
      )
      
      deleteImageFromStorge = imagePath =>{
          if(imagePath){
            this.state.storeRef.child(imagePath).delete().then(() => console.log("deleted")).catch(err=> console.log(err))
          }
          
      }

      removeImagePost = event =>{
        event.preventDefault();
        let removeIndex = event.target.name;
        
        this.deleteImageFromStorge(this.state.imagePost[removeIndex].imagePath)

        const newImagePost = this.state.imagePost.filter((value,index,arr) =>{
          return index !== removeIndex
        })
        

        this.setState({imagePost : newImagePost})
        
        
      }
      
    

    render(){
        const {user,postFromDatabase} = this.state;
       

        return(
      <React.Fragment>
        
        <FileModal 
          fileModal={this.state.fileModal}
          uploadFile = {this.uploadFile}  
          closeModal = {this.closeFileModal}
        />
        <CreatePostModal 
          modal={this.state.postModal} 
          closeModal={this.closePostModal}
          user={user}
          />
          <ImageModal 
                         
                         imageModal={this.state.imageModalStatus} 
                         closeModal={this.closeImageModal}
                         imageURL={this.state.imageModalURL} />
        
    <Segment stacked>
    
        <Header as='h3' block style={{background :'#F9FCFA'}}> 
        
          <Header.Content style={{opacity: 0.6}}> <Image spaced='right' style={{width:'30px'} } src={editIcon} />Tạo Bài Viết  </Header.Content>
         
        </Header>
        
          {this.displayImagePost(this.state)}
        

    

        <Container   fluid style={{width: '100%', height: '80px'}}>
        
           
            <Header  textAlign='left'>
              <Image size='large' avatar src={user.photoURL}/> 
              <span onClick={this.openPostModal} style={{opacity: 0.5}}>Bạn muốn chia sẻ điều gì ?  </span>
            </Header>
         
        
        </Container>
        <Button fluid color='teal' onClick={this.openPostModal}>
          Tạo bài viết của bạn
        </Button>

     
  
      {this.state.post.length > 0 || this.state.imagePost.length >0 ? <Button onClick={this.savePost} fluid style={{marginTop: '20px',background:'#ecf7e7'}}>
        Post
      </Button> : ''}
        
    </Segment>
        
      
    
      {postFromDatabase.length > 0 ? (
        postFromDatabase.map((val, key) =>(
          
          <Segment style={{padding: 0}}  >
      
          <Feed size='large' style={{padding: '10px 10px'}}>
              <Feed.Event>
              <Feed.Label image ={val.avatar} />
              <Feed.Content>
                <Feed.Summary> 
                <Dropdown
                  inline
                  closeOnChange
                  options={this.state.postDrowdownOptions}
                  pointing='top right'
                  icon={null}
                  style={{float: 'right', zIndex: 1000}}
                  trigger={<i style={{opacity: 0.5}} className="fas fa-ellipsis-h"></i>}
                />
                <Feed.User content={val.createByName} />
                <Feed.Date>

                {moment(val.timestamp).locale('vi').fromNow()}
                {/* {moment(val.timestamp).fromNow()} */}
               
                  
                </Feed.Date>
                
                </Feed.Summary>
                <Feed.Summary>
                  <i style={{opacity: 0.5, fontSize: 14}} className="fas fa-globe-asia"></i> 
                </Feed.Summary>

                
                 
           
              </Feed.Content>
              
              </Feed.Event>
            
          </Feed>
          
          <Feed size='large'  >
          
          <Feed.Event>
            <Feed.Content >
              <Container fluid text style={{padding: '10px 10px'}} textAlign='justified' content={val.postText}>
              
              </Container>
              {val.postImages ? (
                // val.postImages.map((value,key) =>(        
                    
                       
                //           <Image centered size src={value} name={value} onClick={this.openImageModal} />
                          
                        
                     
                    
                
                // ))
                // <DisplayImageNewsFeed a={`post${uuid()}`} count={0} images ={val.postImages} />
                <ImageSwiper images={val.postImages} />                
              ) : ''}
               
             
            </Feed.Content>
            
          </Feed.Event>
       

          <Container style={{marginTop:'15px'}} fluid> 
          <Icon 
            name={val.liked.length -1 !==0 ? 'thumbs up': ''} 
            color='blue'  size='small' /> 
            <span style={{opacity: 0.6}}>{val.liked.length -1 === 0 ? '': val.liked.length -1 +' Thích' }</span>
            <span style={{float: 'right',opacity: 0.6}} >20 comnents</span>
          </Container>
         
          <Divider />
            <Button.Group fluid size='small' compact style={{padding: '10px 10px'}} >
            <Button  name={val.postChild} onClick={this.handleLikeClicked} basic compact >  
                <Icon name='thumbs up'  color={val.liked.some(val=>{return val.userUID === user.uid}) ? 'blue' :'grey'} /> Like
              </Button>
              <Button basic compact >
                <Icon name='comment outline' /> Comment
              </Button>
              <Button  basic compact>
                <Icon name='share' /> Share 
              </Button>
            </Button.Group>
           
                     
         
        
      </Feed>
      </Segment>
        ))
      ) :  ''}

     <DisplayError />

 

      
  </React.Fragment>
 
           
            
        )
    }

}

export default NewsFeeds

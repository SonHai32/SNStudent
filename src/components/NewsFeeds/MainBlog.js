import React from 'react'
import {Header, Form, Segment, Button, Dropdown, Label} from 'semantic-ui-react'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import firebase from '../../firebase'

class MainBlog extends React.Component{

    state = {
        user: this.props.currentUser,
        tagRef: firebase.database().ref('tags'),
        postRef: firebase.database().ref('posts'),
        content: null,
        title: null,
        tags: [],
        tagLength: 0,
        tagsSelected: [],
        tagDropdownLoading: false,
        linkActive: false,
        error: '',
    }

    handleTitleChange = event =>{
        event.preventDefault();
        
        this.setState({title: event.target.value})
    }

    handleMarkdownContentChange = value =>{
         this.setState({content: value})     
    }


handleSubmit = (event)=>{
    event.preventDefault();
    if(this.state.title && this.state.content){
        const {user,postRef} = this.state;

        const post = {
            title: this.state.title,
            content: this.state.content,
            tags: this.state.tagsSelected.length > 0 ? this.state.tagsSelected : [],
            createdBy: user.displayName,
            userUID: user.uid,
            avatarUrl: user.photoURL,
            rated: 0,
            comments: 0,
            timeStamp: Math.floor(Date.now())
        }
        const savePost = async () =>{
            const status = await postRef.push(post)
            return status;

        }
        const status = savePost()
        status.then(()=>{
            this.setState({linkActive: true})
            console.log(this.props)
        }).catch(err =>{
            console.log(err)
        })

        //        savePost.then(status =>{
        //            console.log(status)
        //        }).catch(err=>{
        //            console.log(err)    
        //        })
    }
}

clearData = ()=>{
    this.setState({content: null, title: null, tagsSelected: [], tags: []})
}

tagDrowdownHandleChange = (event,data) =>{
    this.setState({tagsSelected: data.value})
}


tagLoad  = () =>{
    this.setState({tagDropdownLoading: true})
    const {tagRef} = this.state;
    const tags = () =>{
        return new Promise((reslove,reject) => {
            tagRef.on('value', snapshot =>{
                reslove(snapshot.val())
            })
        })
    }

    const result = async () =>{
        return  await tags();
    }

    result().then(val =>{
        this.setState({tags: val},()=>{
            this.setState({tagDropdownLoading: false},()=>{
                tagRef.off()
            }) //
        })
    })
}

clearTags= () =>{
    this.setState({tags: this.state.tagLoaded})
    this.state.tagRef.off()
}


addDrowdownItem = (event,data) =>{
    this.setState({tags: this.state.tags.concat({
        key: data.value,
        value: data.value,
        text: data.value,
        icon: {
            name: 'tag',
            color: 'red'
        }
    })})

}
    render(){
        const {content} = this.state
        return(
            <Segment style={{height: '100%', width: '100%'}} >
                <Form>
                    <Header as='h2' color='green' >
                        Tạo Bài Viết
                    </Header>
                    <Form.Field>
                        <Form.Input  transparent  required  fluid  placeholder='Đặt tiêu đề cho bài viết' onChange={this.handleTitleChange}  style={{height: '24px', fontWeight: 'bold',
                            fontSize: '20px', marginTop: '20px', marginBottom: '20px' }} />

                             <Button type='submit'color='blue' size='big'  circular onClick={this.handleSubmit}  style={{marginTop: '20px', position:'fixed', top: '5%',left: '100%'
                             ,zIndex: 1000 }}>Đăng bài
                             </Button>

                    </Form.Field>
                     <Dropdown compact selection inline  allowAdditions={true} icon={false}  fluid multiple  search placeholder='Thêm tag cho bài viết'
                    onSearchChange={this.tagDrowdownHandleSearchChange} options={this.state.tags} onChange={this.tagDrowdownHandleChange}
                    noResultsMessage = 'Thêm tag' onAddItem={this.addDrowdownItem} additionLabel ='Nhấn Enter để thêm ' onFocus={this.tagLoad}
                    loading = {this.state.tagDropdownLoading}
                    >


                </Dropdown>
                        
                </Form>
               <SimpleMDE value={content}  style={{fontSize:'18px', marginTop: '20px',}}  onChange={this.handleMarkdownContentChange} options={{
                    minHeight: '75vh',
                    uploadImage: true,
                    autofocus: false,
                    spellChecker: false,
                    status: false,
                    autoDownloadFontAwesome: true,
                    toolbar: ["bold","italic", "strikethrough","heading-1","heading-2","heading-3", "quote", "code", "unordered-list","ordered-list",
                    "image","link", "table","horizontal-rule","preview"
                   ]

                }}  >


            </SimpleMDE>
         </Segment>
       )
    }
}

export default MainBlog

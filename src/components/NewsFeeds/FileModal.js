import React from 'react'
import uuid from 'uuidv4'
import { Modal, Input, Button, Icon } from 'semantic-ui-react';
import DisplayError from '../Error/DisplayError'

class FileModal extends React.Component{
    state = {
        authorized: ['image/jpeg', 'image/png', 'image/webp'],
        currentFiles: [],
        errorModal: false,
        errorMessage: ''

    }

// openErrorModal = () =>{
//     this.setState({errorModal: true})
// }

   closeErrorModal = () =>{
       this.setState({errorModal: false},()=>{
           this.setState({errorMessage: ''})
       })
   }




    addFile = event =>{
    
        this.setState({currentFiles: []})
        const files = event.target.files;
        
        
   
        if(files){
           
                if(files.length <= 50 ){
                    for(let i = 0 ; i < files.length ; i++){
                        const metadata = {contentType: files[i].type}
                        const reader = new FileReader();
                        if(this.isAuthorized(files[i].type)){
                            
                            if(files[i].size <= 3355443){
                                reader.onload = event =>{
                                    const file = {file: files[i], url: event.target.result, metadata: metadata, key:uuid()} 
                                    this.state.currentFiles.push(file)
                                }
                                
                                reader.readAsDataURL(files[i])
                            }else{
                                this.setState({errorMessage: 'Ảnh không được vượt quá 3.2MB'})
                            }
                    }else{
                        this.setState({errorMessage: `${files[i].name} không thể tải lên.Vui lòng tải ảnh có định dạng (PNG/JPGE)`})
                    }
                }
                }else{
                    this.setState({errorMessage: 'Chỉ được đăng tối đa 50 ảnh'})}
            
                
        
        
    }}
    


  

    sendFileToProp = () =>{
      
     const {fileStateToProp,closeModal} = this.props
         if(this.state.currentFiles.length > 0 ){
            fileStateToProp(this.state.currentFiles);
            this.clearFile();
            closeModal();
         }else{
            this.setState({errorMessage: 'Bạn chưa chọn ảnh'})
         }
         

    }

    clearFile = () =>{
        this.setState({currentFiles: []})
    }

    handleCancel = () =>{
        const {closeModal} = this.props;
        this.clearFile();
        closeModal();
        
    }
  
   
    isAuthorized = fileType => this.state.authorized.includes(fileType);

    render(){

        const {fileModal, closeModal} = this.props;
     

       return(
           <React.Fragment>
               <DisplayError errorModal={this.state.errorMessage.length > 0} closeModal={this.closeErrorModal} error={this.state.errorMessage} />
           
            <Modal basic open={fileModal} onClose={closeModal}>
                <Modal.Header>
                    Select an image file
                </Modal.Header>
                <Modal.Content>
                    <Input 
                        multiple
                        fluid
                        label='File types: jpg, png'
                        name='file'
                        type='file'
                        onChange={this.addFile}
                    />
                </Modal.Content>
                <Modal.Actions>
       
                    <Button.Group>
                        <Button negative inverted onClick={closeModal}>
                            <Icon name='remove' /> Cancel
                        </Button>
                        <Button.Or />
                        <Button onClick={this.sendFileToProp} inverted positive>
                            <Icon className='submit' name='checkmark' />Upload
                        </Button>
                    </Button.Group>
                  
                    
                </Modal.Actions>
            </Modal>
            </React.Fragment>
       );
    }
}

export default FileModal

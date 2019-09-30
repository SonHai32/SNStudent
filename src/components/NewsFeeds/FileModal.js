import React from 'react'
import { Modal, Input, Button, Icon,Image } from 'semantic-ui-react';

class FileModal extends React.Component{
    state = {
        authorized: ['image/jpeg', 'image/png', 'image/webp'],
        currentFiles: []

    }

   
    addFile = event =>{
    
        
        const files = event.target.files;
        
        
   
        if(files){
            for(let i = 0 ; i < files.length ; i++){
                const metadata = {contentType: files[i].type}
                const reader = new FileReader();
                if(this.isAuthorized(files[i].type)){
                    reader.onload = event =>{
                        const file = {file: files[i], url: event.target.result, metadata: metadata} 
                        this.state.currentFiles.push(file)
                    }
                    reader.readAsDataURL(files[i])
                }
            }
        }
    }
    


  

    sendFileToProp = () =>{
      
     const {fileStateToProp,closeModal} = this.props
         fileStateToProp(this.state.currentFiles);
         this.clearFile();
         closeModal();

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
       );
    }
}

export default FileModal
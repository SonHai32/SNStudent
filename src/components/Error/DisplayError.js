import React from 'react'
import { Modal, Image, Button, Icon } from 'semantic-ui-react'

import errorIcon from '../../Images/error.svg'

class DisplayError extends React.Component{
    render(){

        const{errorModal,closeModal,error} = this.props;

        return (

            <Modal open={error} onClose={closeModal} basic size='small'>
                <Modal.Header>
                <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={errorIcon} /> <span style={{marginLeft: '15px', fontWeight: '200'}}>Có lỗi xảy ra</span>
                </Modal.Header>
                <Modal.Content>
                <h3>{error}</h3>
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={closeModal}>
                        Đóng
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }

}

export default DisplayError
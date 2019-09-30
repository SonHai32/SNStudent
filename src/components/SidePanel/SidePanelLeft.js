import React from 'react'
import { Menu, Image, Header,Button} from 'semantic-ui-react'
import firebase from '../../firebase'
import newsfeedIcon from '../../Images/newsfeed.svg'
import flagIcon from '../../Images/flag.svg'
import groupIcon from '../../Images/group.svg'
import noteIcon from '../../Images/note.svg'
import networkIcon from '../../Images/network.svg'

class SidePanelLeft extends React.Component{

    state = { 
              channels: '',
              modalOpen : false,
              channelName: '',
              channelDetail: '',
              channelRef: firebase.database().ref('Channels'),
              user: this.props.currentUser,
              errors : [],
              
                    
  };

  
    render(){
 
        return(
         
       
            <Menu   
            className='side-panel-left'
            fixed='left'
            vertical    
            style={{ background: '#FFFFFF', top: '80px', padding: '30px 0' }}
            size='large'
            >
            
            
            <Menu.Item 
              as='a'
              style={{padding: '10px 0'}}
               
              active
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={newsfeedIcon} /> <span style={{marginLeft: '15px', fontWeight: '200'}}>Bảng tin</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              style={{padding: '10px 0'}}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={flagIcon} /> <span style={{marginLeft: '15px', fontWeight: '200'}}>Trang</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              style={{padding: '10px 0'}}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={groupIcon} /> <span style={{marginLeft: '15px', fontWeight: '200'}}>Nhóm</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              style={{padding: '10px 0'}}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={noteIcon} /> <span style={{marginLeft: '15px', fontWeight: '200'}}>Tài Liệu</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              style={{padding: '10px 0'}}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={networkIcon} /> <span style={{marginLeft: '15px', fontWeight: '200'}}>Cộng đồng</span>
             
              </Menu.Item>
              
          </Menu>
         
        )

    }
}

export default SidePanelLeft;
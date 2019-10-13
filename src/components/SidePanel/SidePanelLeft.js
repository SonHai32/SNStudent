import React from 'react'
import { Menu, Image, Button} from 'semantic-ui-react'
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
              activeItem: 'Bảng tin'
              
                    
  };

itemClicked = (e,{name}) =>{
  this.setState({activeItem: name})
}

  
    render(){
        const {activeItem} = this.state
        return(
          
       
            <Menu   
            className='side-panel-left'
            fixed='left'
            vertical    
            style={{ background: '#FFFFFF', top: '80px', padding: '30px 0' }}
            size='large'
            secondary
            >
           
            
            <Menu.Item 
            name='Bảng tin'
              as='a'
              color='green'
              className="left-panel-menu-btn-hover-scale "
              active={activeItem=== 'Bảng tin'}
              onClick={this.itemClicked}
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={newsfeedIcon} /> <span style={{marginLeft: '10%', fontWeight: '100'}}>Bảng tin</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              className="left-panel-menu-btn-hover-scale "
              color='green'
              name='Trang'
              active={activeItem === 'Trang'}
              onClick={this.itemClicked}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={flagIcon} /> <span style={{marginLeft: '10%', fontWeight: '100'}}>Trang</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              className="left-panel-menu-btn-hover-scale "
              color='green'
              name='Nhóm'
              active={activeItem === 'Nhóm'}
              onClick={this.itemClicked}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={groupIcon} /> <span style={{marginLeft: '10%', fontWeight: '100'}}>Nhóm</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              className="left-panel-menu-btn-hover-scale "
              color='green'
              name ='Tài liệu'
              active={activeItem === 'Tài liệu'}
              onClick={this.itemClicked}
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={noteIcon} /> <span style={{marginLeft: '10%', fontWeight: '100'}}>Tài Liệu</span>
             
              </Menu.Item>
              <Menu.Item 
              as='a'
              className="left-panel-menu-btn-hover-scale "
              color='green'
              name ='Cộng đồng'
              active={activeItem === 'Cộng đồng'}
              onClick={this.itemClicked}
              
            
            > 
              <Image style={{width: '32px', marginLeft: '10px'}} centered spaced='right' src={networkIcon} /> <span style={{marginLeft: '10%', fontWeight: '100'}}>Cộng đồng</span>
             
              </Menu.Item>
              
          </Menu>
         
        )

    }
}

export default SidePanelLeft;

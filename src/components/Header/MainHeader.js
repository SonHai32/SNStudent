import React from 'react';
import {connect} from 'react-redux';
import "./style.css"
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
class MainHeader extends React.Component{
    state = {
        currentUser: this.props.currentUser,
        userDropdownToggle: false
    }

    userNavHandleClick = () =>{
        this.setState({userDropdownToggle: !this.state.userDropdownToggle});
    }
    
    componentDidMount(){
        document.body.addEventListener('click',() =>{
            this.setState({userDropdownToggle: false})
        })  //TODO handle body click to hide dropdown
    }   

    componentDidMount(){
        document.body.addEventListener('click',() =>{
            this.setState({userDropdownToggle: false})
        }) //TODO handle body click to hide dropdown
    } 

    userSignout = () =>{
        firebase.auth().signOut().catch(err =>{
            console.log(err);
        })    
    }

    render(){
        const {currentUser,userDropdownToggle} = this.state
        return(
            <header className='top-header fixed flex'>
                <div className='logo'>
                    <a href='/'><h1>Deep</h1><span>log</span></a>
                </div>  
                <input className='search-box' type='text' placeholder="Tìm kiếm" />  
                <div className='user-nav flex' onClick={this.userNavHandleClick}>
                    <ul className={!userDropdownToggle ? 'disable' : ''}>
                        <li>
                            <Link>
                                <i class="fas fa-user"></i>
                                Tài khoản
                            </Link>
                        </li>
                        <li>
                            <Link>
                                <i class="fas fa-cog"></i>
                                Cài đặt
                            </Link>
                        </li>
                        <li onClick={this.userSignout}>
                            <a>   <i class="fas fa-sign-out-alt"></i>
                                Đăng xuất
                            </a>
                        </li>
                    </ul>
                    <div className='user-avatar'>
                        <img src={currentUser.photoURL} />
                    </div>
                    <div className='user-display-name'>
                        <span>{currentUser.displayName}</span>
                    </div>
                    <div className='user-drop-down'>
                        <i class="fas fa-sort-down"></i>
                    </div>
                    <div className="header-items flex">
                        <Link title="Tin nhắn "><i class="fas fa-envelope"></i></Link>
                        <Link title="Bạn bè"><i class="fas fa-user-friends"></i></Link>
                        <Link title="Thông báo" to="/user/notification"><i class="fas fa-bell"></i></Link     >
                        <Link title="Viết bài" to="/create-blog"><i class="fas fa-pen"></i> </Link>
                    </div>
                </div>
            </header>
        );
        
    }
}
const mapStateToProps = state =>({
    currentUser: state.user.currentUser
})
export default connect(mapStateToProps)(MainHeader);

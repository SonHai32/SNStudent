import React from 'react';
import {connect} from 'react-redux';
import "./style.css"
import {Link} from 'react-router-dom'
import firebase from '../../firebase'
class MainHeader extends React.Component{
    state = {
        currentUser: this.props.currentUser,
        userDropdownToggle: false,
        userName: ''
    }

    loadUserName = () =>{
        const userRef = firebase.database().ref('users');
        let userKey = new Promise((reslove,reject) =>{
            userRef.orderByChild('uid').equalTo(this.props.currentUser.uid).on('child_added',snap =>{
                reslove(snap.key)
            })
        })

        userKey.then(key =>{
            userRef.child(key).once('value',snap =>{
                this.setState({userName: snap.val().name})
            })
        })


    }

    userNavHandleClick = () =>{
        this.setState({userDropdownToggle: !this.state.userDropdownToggle});
    }
    
    componentDidMount(){
        
        this.loadUserName()

        document.body.addEventListener('click',() =>{
            this.setState({userDropdownToggle: false})
        })  //TODO handle body click to hide dropdown
    }   

    componentWillUnmount(){
       
        this.loadUserName()
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
                            <a href={`/user/${currentUser.uid}`}>
                                <i class="fas fa-user"></i>
                                Tài khoản
                            </a>
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
                        <span>{this.state.userName}</span>
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

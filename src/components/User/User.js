import React from 'react'
import './style.css'
import MainHeader from '../Header/MainHeader'
import Footer from '../Footer/Footer'
import firebase from '../../firebase'
import {connect} from 'react-redux'
class User extends React.Component{
    state={
            enableUserConfig: false,
            userName: this.props.user.name,
            fullName: this.props.user.fullName ? this.props.user.fullName : 'Chưa nhập thông tin',
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber ? this.props.user.phoneNumber : 'Chưa nhập thông tin',
            avatar: this.props.user.avatar
    }

    handleToggleBtnChangeconfig = (event) =>{
    event.preventDefault()
        this.setState({enableUserConfig: !this.state.enableUserConfig})   
    }
    handleBtnCancel = (event) =>{
        event.preventDefault();
        this.setState({
            enableUserConfig: false,
            userName: this.props.user.name,
            fullName: this.props.user.fullName ? this.props.user.fullName : 'Chưa nhập thông tin',
            email: this.props.user.email,
            phoneNumber: this.props.user.phoneNumber ? this.props.user.phoneNumber : 'Chưa nhập thông tin',
  
            errors: ["aaa"]
        })
    }

    handleChangeUsername = (event) =>{
        const {name,value} = event.target
        this.setState({[name]: value})
    }
    
    handleBtnSave = (event) =>{
        event.preventDefault();
        if(this.isFormValid()){
            let userRef = firebase.database().ref('users');
           
            let userKey = new Promise((reslove,reject) =>{
                userRef.orderByChild('uid').equalTo(this.props.user.uid).on('child_added',snap =>{
                reslove(snap.key)
            })
 
            })
            userKey.then(val =>{
                userRef.child(val).set({
                    avatar: this.props.user.avatar,
                    email: this.state.email,
                    gender: 'male',
                    name: this.state.userName,
                    uid: this.props.user.uid,
                    fullName: this.state.fullName,
                    phoneNumber: this.state.phoneNumber
                },() =>{
                    window.location.reload()
                }).catch( err =>{
                    console.log(err)
                })
            })

        }else{
            console.log('err')
        }
    }

    isFormValid = () =>{
        const {userName, fullName,email,phoneNumber} = this.state;
        let errors = [];
        let error = ''
        if(userName.length === 0 ){
            error = 'userName error'
            this.setState({errors: errors.concat(error) });
            return false;
        }else if(fullName.length === 0){
            error = 'fullName error'
            this.setState({errors: errors.concat(error) });


            return false;
        }else if(email.length === 0 ){
            error = 'email error'
            this.setState({errors: errors.concat(error) });

            return false;
        }else if(phoneNumber.length === 0){
            error = 'phoneNumber error'
            this.setState({errors: errors.concat(error) });

        }
        if(userName.length > 16 ){
            error = 'userName error'
            this.setState({errors: errors.concat(error) });
            return false;
        }else if(fullName.length > 35){
            error = 'fullName error'
            this.setState({errors: errors.concat(error) });

            return false;
        }else if(email.length > 50 ){
            error = 'email error'
            this.setState({errors: errors.concat(error) });

            return false;
        }else if(phoneNumber.length > 30){
            error = 'phoneNumber error'
            this.setState({errors: errors.concat(error) });

        }

        else{
            return true;
        }

        
    }

    render(){

       const {userName,fullName,email,phoneNumber,avatar,errors} = this.state;
        return(
            <div className='main-container'>
                <MainHeader />
                <div className='user'>
                    <p className='line'></p>
                    <div className='user-avatar-big'>
                        <img src={avatar} /> 
                    </div>
                    <div className='username-big'>
                        <span>{this.props.user.name}</span>
                    </div>

                </div>
                <div className='stats flex'>
                    <div className='stats-posts '>
                        <span className='posts-counter-title'>
                            Bài viết
                        </span>
                        <span className='posts-counter'>
                            100
                        </span>
                    </div>
                    <div className="stats-followers ">
                        <span className='followers-counter-title'>
                            Followers
                        </span>
                        <span className='followers-counter'>
                            1310
                        </span>

                    </div>
                    <div className="stats-likes ">
                         <span className='likes-counter-title'>
                            Likes
                        </span>
                        <span className='likes-counter'>
                            1250
                        </span>
 
                    </div>
                </div>
            { this.props.user.uid === this.props.currentUser.uid ? (
                <div className='user-config-container'>
                    <div className='user-config-nav'>
                        <h1>Tài khoản</h1>
                    </div>
                    <div className='user-config'>
                        <form>
                            <span>Username</span><br />
                            <input
                                onChange={this.handleChangeUsername}
                                name='userName'
                                className={`${this.state.enableUserConfig ? 'input-enable' : ''}`}
                                type='text'
                                disabled={!this.state.enableUserConfig}
                                value={userName}
                     
                            />

                            <br />
                             <span>Họ tên</span><br />
                            <input

                                onChange={this.handleChangeUsername}
                                name='fullName'
                                className={`${this.state.enableUserConfig ? 'input-enable' : ''}`}
                                type='text' 
                                disabled={!this.state.enableUserConfig}
                                value={fullName}
                            />

                            <br />
                             <span>Email</span><br />
                            <input

                                onChange={this.handleChangeUsername}
                                name='email'
                                className={`${this.state.enableUserConfig ? 'input-enable' : ''} `}
                                type='text'
                                disabled={!this.state.enableUserConfig}
                                value={email}
                            />

                            <br />
                            {/*<span>Password</span><br />
                            <input 
                                type='password'
                                disabled
                                value={this.props.user.name}
                            />
                            <br />
                            */}
                            <span>Số điện thoại</span><br />
                            <input
                                
                                onChange={this.handleChangeUsername}
                                name='phoneNumber'
                                className={`${this.state.enableUserConfig ? 'input-enable' : ''} `}
                                type='text'
                                disabled={!this.state.enableUserConfig}
                                value={phoneNumber} 
                            />
                            <div className='user-config-btn'>
                                 <button className={`${this.state.enableUserConfig ? '' : 'disable' }`} onClick={this.handleBtnSave} >
                                    Thay đổi
                                </button>

                                <button className={`${!this.state.enableUserConfig ? '' : 'disable' }`} onClick={this.handleToggleBtnChangeconfig} >
                                    Chỉnh sửa 
                                </button>
                                <button style={{background: '#DB2828', marginLeft: '8px'}} className={`${this.state.enableUserConfig ? '' : 'disable' }`} onClick={this.handleBtnCancel} >
                                    Hủy 
                                </button>

                            </div>

                        </form>
                    </div>
                </div> ) : ''}
                {/*<div style={{position: 'absolute',top: '100%', width:'100%'}}>
                    <Footer />
                </div>
                */}
            </div>
        )
    }
}

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
})

export default connect(mapStateToProps)(User)

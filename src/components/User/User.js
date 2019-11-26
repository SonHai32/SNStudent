import React from 'react'
import './style.css'
import MainHeader from '../Header/MainHeader'
import Footer from '../Footer/Footer'
class User extends React.Component{
    render(){
        return(
            <div className='main-container'>
                <MainHeader />
                <div className='user'>
                    <p className='line'></p>
                    <div className='user-avatar-big'>
                        <img src={this.props.user.avatar} /> 
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
                <div style={{position: 'absolute',top: '100%', width:'100%'}}>
                    <Footer />
                </div>
            </div>
        )
    }
}

export default User

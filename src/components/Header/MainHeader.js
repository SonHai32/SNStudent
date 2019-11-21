import React from 'react';
import {connect} from 'react-redux';
import "./style.css"
import {Link} from 'react-router-dom'
class MainHeader extends React.Component{
    state = {
        currentUser: this.props.currentUser
    }
    render(){
        const {currentUser} = this.state
        return(
            <header className='top-header fixed flex'>
                <div className='logo'>
                    <a href='/'><h1>Deep</h1><span>log</span></a>
                </div>  
                <input className='search-box' type='text' placeholder="Tìm kiếm" />  
                <div className='user-nav flex'>
                    <div className='user-avatar'>
                        <img src={currentUser.photoURL} />
                    </div>
                    <div className='user-display-name'>
                        <a href='#'>{currentUser.displayName}</a>
                    </div>
                    <div className='user-drop-down'>
                        <i class="fas fa-sort-down"></i>
                    </div>
                    <div className="header-items flex">
                        <Link><i class="fas fa-envelope"></i></Link>
                        <Link><i class="fas fa-user-friends"></i></Link>
                        <Link to="/user/notification"><i class="fas fa-bell"></i></Link     >
                        <Link to="/create-blog"><i class="fas fa-pen"></i> </Link>
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

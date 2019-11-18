import React from 'react';
import {connect} from 'react-redux';
import "./style.css"
class MainHeader extends React.Component{
    state = {
        currentUser: this.props.currentUser
    }
    render(){
        const {currentUser} = this.state
        return(
            <header className='top-header fixed flex'>
                <div className='logo'>
                    <h1>Deep</h1><span>log</span>
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
                        <i class="fas fa-envelope"></i>
                        <i class="fas fa-user-friends"></i>
                        <i class="fas fa-bell"></i>
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

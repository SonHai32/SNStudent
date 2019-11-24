import React from 'react'
import "./style.css"
import {Link} from 'react-router-dom'


 class Footer extends React.Component{
    render(){
         return(
        <footer className='footer'>
            <div className='footer-container flex'>
                <div className='footer-tos'>
                    <ul>
                        <li><Link>Chính sách</Link></li>
                        <li><Link>Quyền riêng tư</Link></li>
                        <li><Link>Phản hồi</Link></li>
                    </ul>
                </div>
                <div className="footer-contact flex">
                    <a href='https://www.facebook.com/hai.lam.3726613'><i class="fab fa-facebook-f"></i></a>
                    <a href='https://www.instagram.com/hai.lam.3726613/'><i class="fab fa-instagram"></i></a>
                    <a><i class="fab fa-twitter"></i></a>
                </div>

                <div className="footer-copy-right">
                    <span>Copyright © 2019 Deeplog</span>
                </div>
            </div>
        </footer>
    )
 
    
    }
        
}

export default Footer;

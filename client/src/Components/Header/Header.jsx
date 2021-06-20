import React from 'react'
import Logo_Henry_black from '../../Assets/Images/Logo_Henry_black.png'
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="content_Header">
            <div className="body_Header">
                <Link to="/">
                    <img src={Logo_Henry_black} alt="" width="200px" srcSet="" />
                </Link>
            </div>
        </div>
    )
}

export default Header

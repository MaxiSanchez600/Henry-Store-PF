import React from 'react'
import Logo_Henry_white from '../../Assets/images/Logo_Henry_white.png'

function Footer() {
    return (
        <div className="content_Footer">
            <img src={Logo_Henry_white} className="logo" alt="" width="200px" />

            <div className="Footer_body">
                <ul className="items">
                    <li>Home</li>
                    <li>Nosotros</li>
                    <li>Términos y condiciones</li>
                    <li>Política de Privacidad</li>
                </ul>
            </div>
            <div className="Footer_foot">Henry © 2021 | Todos los derechos reservados.</div>
        </div>
    )
}

export default Footer

import './Footer.scss'
import Logo_Henry_white from '../../Assets/Images/Logo_H_white.png'

export default function Footer(){
    return (
        <footer className= "footer">
            <div className= "container_footer">
                <div className= "row">
                    <div className="footercol">
                    <img src={Logo_Henry_white} className="logo-henry" alt="" width="200px" />
                    </div>
                    <div className="footercol">
                        <h4>Newsletter</h4>
                    </div>
                    <div className="footercol">
                        <h4>Términos y condiciones</h4>
                    </div>
                    <div className="footercol">
                        <h4>Política de Privacidad</h4>
                    </div>
                    <div className="footercol">
                        <h4>Redes Sociales</h4>
                    </div>
            <p className="Footer_foot">Henry © 2021 | Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    )
}

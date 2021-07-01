import './Footer.scss'
import Logo_Henry_white from '../../Assets/Images/Logo_Henry_white.png';
import { Link } from 'react-router-dom';
/* eslint-disable jsx-a11y/anchor-is-valid */

export default function Footer() {
    return (
        <footer className="footer_container">
            <div className="footer_links_container">
                <div className="footer_links_container_display">
                    <a className="footer_logo_container" href="https://soyhenry.com">
                        <img className="footer_logo" src={Logo_Henry_white} alt="" />
                    </a>
                    <div className="footer_link_container">
                        <a className="footer_link" href="#">
                            <p>Home</p>
                        </a>
                        <a className="footer_link" href="#">
                            <p>Nosotros</p>
                        </a>
                    </div>
                    <div className="footer_link_container">
                        <a className="footer_link" href="#">
                            <p>Carrera</p>
                        </a>
                        <a className="footer_link" href="#">
                            <p>Admisiones</p>
                        </a>
                    </div>
                    <div className="footer_link_container">
                        <a className="footer_link" href="#">
                            <p>Hire Henry's</p>
                        </a>
                        <a className="footer_link" href="#">
                            <p>FAQs</p>
                        </a>
                    </div>
                    <div className="footer_link_container">
                        <a className="footer_link" href="#">
                            <p>Blog</p>
                        </a>
                        <a className="footer_link" href="#">
                            <p>Full Stack</p>
                        </a>
                    </div>
                    <div className="footer_link_container">
                        <a className="footer_link" href="#">
                            <p>Opiniones</p>
                        </a>
                        <a className="footer_link" href="#">
                            <p>Muro del amor</p>
                        </a>
                    </div>
                    <div className="footer_link_container">
                        <a className="footer_link" href="#">
                            <p>Términos y condiciones</p>
                        </a>
                        <a className="footer_link" href="#">
                            <p>Política de privacidad</p>
                        </a>
                    </div>
                </div>
            </div>
            <div className="footer_foot_container">
                <div>
                    <a href="https://www.linkedin.com/school/soyhenry/" target="_blank" rel="me nofollow noreferrer" class="styles__LinkSocialMedia-sc-19v6tz7-11 BqesC">
                        <div class="styles__IconWrapper-sc-19v6tz7-15 glzvXq">
                            <svg className="footer_logo_linkedin" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path>
                            </svg>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/soyhenry_ok" target="_blank" rel="me nofollow noreferrer" class="styles__LinkSocialMedia-sc-19v6tz7-11 BqesC">
                        <div class="styles__IconWrapper-sc-19v6tz7-15 glzvXq">
                            <svg className="footer_logo_linkedin" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                            </svg>
                        </div>
                    </a>
                    <a href="https://twitter.com/soyhenry_ok" target="_blank" rel="me nofollow noreferrer" class="styles__LinkSocialMedia-sc-19v6tz7-11 BqesC">
                        <div class="styles__IconWrapper-sc-19v6tz7-15 glzvXq">
                            <svg className="footer_logo_linkedin" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"></path>
                            </svg>
                        </div>
                    </a>
                    <a href="https://www.facebook.com/HENRY-108437840594440/" target="_blank" rel="me nofollow noreferrer" class="styles__LinkSocialMedia-sc-19v6tz7-11 BqesC">
                        <div class="styles__IconWrapper-sc-19v6tz7-15 glzvXq">
                            <svg className="footer_logo_linkedin" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"></path>
                            </svg>
                        </div>
                    </a>
                </div>
            </div>
            {/* <div><svg className="footer_logo_linkedin" focusable="false" viewBox="0 0 24 24" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"></path></svg></div> */}
            {/* <span role="img" aria-label="Heart">💛</span> */}
        </footer>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';

import "./NotFound.scss";

function NotFound({ message = "No pudimos encontrar la página"}) {
  return (
    <div className="not_found_message_container">
      <p className="not_found_message_404">404 NOT FOUND</p>
      <img className="not_found_image" src="https://assets.soyhenry.com/henry-landing/assets/emojis/CrashedRocket.png" alt="" />
      <p className="not_found_message">{`${message}, prueba volver al `}<Link className="not_found_message_link" to="/home">Inicio</Link></p>
    </div>
  );
}

export default (NotFound);
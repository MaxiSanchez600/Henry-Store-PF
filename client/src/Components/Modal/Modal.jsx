import { createPortal } from "react-dom";
import "./Modal.scss";


const Modal = ({ isOpened, children, onClose }) => {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div>
      <div className="overlay"></div>
      <div className="modal">
        <div>
          <span className="close-button" onClick={onClose}>
            X
          </span>
          <div className="modal-content">{children}</div>
        </div>
      </div>
    
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;

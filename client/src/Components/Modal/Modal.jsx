import { createPortal } from "react-dom";
import "./Modal.scss";


const Modal = ({ isOpened, children, }) => {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div>
      <div className="overlay"></div>
      <div className="modal" id="modal">
        <div>
        <div className="modal-content">{children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default Modal;

import React from "react";
import { ImExit } from "../../Helper/ImExit";
import { MdOutlineClose } from "../../Helper/MdOutlineClose";
import { LogoutButton, Modal, ModalBackground } from "./styles";

const ModalAlert = ({ title, modal, setModal, handleLogoutModal }) => {
  React.useEffect(() => {
    if (modal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "initial";
  }, [modal]);
  function handleClose({ target, currentTarget }) {
    if (target === currentTarget) {
      setModal(false);
    }
  }

  if (modal)
    return (
      <ModalBackground onClick={handleClose}>
        <Modal>
          <h2>{title}</h2>
          <div>
            <button onClick={() => setModal(false)}>
              <span>
                <ImExit />
                Não
              </span>
            </button>
            <LogoutButton onClick={handleLogoutModal}>
              <span>
                <MdOutlineClose />
                Sair
              </span>
            </LogoutButton>
          </div>
        </Modal>
      </ModalBackground>
    );
  return <div />;
};

export default ModalAlert;

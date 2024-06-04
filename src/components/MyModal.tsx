import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useNavigate } from "react-router-dom";

import { useAppSelector, useAppDispatch } from ".././hooks";
import { selectModal, modalActions } from ".././store/modal";

function MyModal(): React.ReactElement {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectModal);

  const handleClose = () => {
    const closefn = modalState.closeFn;
    if (closefn === "to_home") {
      navigate("/");
    }
    dispatch(modalActions.close());
  };

  const handleConfirm = () => {
    const confirmfn = modalState.confirmFn;
    if (confirmfn === "to_home") {
      navigate("/");
      window.location.reload();
    }
    dispatch(modalActions.close());
  };

  const message = modalState.bodyMessage;
  const messageHeader = modalState.headerMessage;
  const showCloseButten = modalState.showCloseButton;

  return (
    <Modal
      show={modalState.isOpen}
      onHide={() => {
        handleClose();
      }}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>{messageHeader}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        {showCloseButten ? (
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
          >
            닫기
          </Button>
        ) : null}
        <Button
          variant="primary"
          onClick={() => {
            handleConfirm();
          }}
        >
          확인
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;

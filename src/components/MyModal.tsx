import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { useAppSelector, useAppDispatch } from ".././hooks";
import { selectModal, modalActions } from ".././store/modal";

function MyModal(): React.ReactElement {
  const dispatch = useAppDispatch();
  const modalState = useAppSelector(selectModal);

  const handleClose = () => {
    modalState.closeFn();
    dispatch(modalActions.close());
  };

  const handleConfirm = () => {
    modalState.confirmFn();
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

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

type myModalProps = {
  show: boolean;
  handleConfirm: () => void;
  handleClose: () => void;
  message: string;
  messageHeader: string;
  closeButten?: boolean;
};

function MyModal({
  show,
  handleClose,
  handleConfirm,
  message,
  messageHeader,
  closeButten,
}: myModalProps): React.ReactElement {
  const showCloseButten = closeButten ? true : false;

  return (
    <Modal
      show={show}
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

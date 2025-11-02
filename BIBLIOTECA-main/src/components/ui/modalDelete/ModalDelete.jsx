import { Button, Modal } from "react-bootstrap";

const ModalDelete = ({
    show,
    bookId,
    bookTitle,
    onCancel,
    onDelete }) => {

    const handleDeleteBook = () => {
        onDelete(bookId);
    }

    return <Modal show={show} onHide={onCancel}>
        <Modal.Header closeButton>
            <Modal.Title>Eliminar libro</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>¿Desea eliminar el libro <b>{bookTitle}</b>?</p>
        </Modal.Body>

        <Modal.Footer>
            <Button variant="secondary"
                onClick={onCancel}>
                Cancelar
            </Button>
            <Button
                variant="danger"
                onClick={handleDeleteBook}>
                Eliminar
            </Button>
        </Modal.Footer>
    </Modal>
}

export default ModalDelete;
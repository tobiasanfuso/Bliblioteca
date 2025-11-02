import { useLocation, useNavigate } from "react-router";

import { Badge, Button, Card, Row } from "react-bootstrap";
import { Star, StarFill } from "react-bootstrap-icons";
import { useState } from "react";
import BookForm from "../bookForm/BookForm";
import { successToast } from "../../../utils/notification";

const BookDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [showForm, setShowForm] = useState(false);
    const [bookState, setBookState] = useState(location.state.book);

    const { title, author, pageCount, summary, imageUrl, rating, available } = bookState;

    const clickHandler = () => {
        navigate("/library");
    };

    const handleToggleForm = () => {
        setShowForm(prevShowForm => !prevShowForm)
    }

    const handleSaveBook = (bookData) => {
        setBookState(bookData);
        successToast(`¡El libro ${bookData.title} fue actualizado correctamente!`)
    }

    const ratingStars = Array.from({ length: 5 }, (_, index) =>
        index < rating ? <StarFill key={index} /> : <Star key={index} />
    );

    return (
        <>
            <Card className="my-3 w-25">
                <Card.Img
                    height={500}
                    variant="top"
                    src={imageUrl !== "" ? imageUrl : "https://bit.ly/47NylZk"}
                />
                <Card.Body>
                    <div className="mb-2">
                        {available ?
                            <Badge bg="success">Disponible</Badge>
                            :
                            <Badge bg="danger">Reservado</Badge>
                        }
                    </div>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    {ratingStars}
                    <p>{pageCount} páginas</p>
                    <p className="my-3">
                        <b>Sinopsis</b>: {summary}
                    </p>
                    <Row>
                        <Button className="mb-2 me-2" variant="secondary" onClick={handleToggleForm}>
                            {showForm ? "Ocultar" : "Mostrar"} formulario
                        </Button>
                        <Button className="me-2" onClick={clickHandler}>
                            Volver a la página principal
                        </Button>
                    </Row>
                </Card.Body>
            </Card>
            {showForm &&
                <BookForm
                    isEditing
                    book={location.state.book}
                    onSaveBook={handleSaveBook} />}
        </>
    );
};

export default BookDetails;
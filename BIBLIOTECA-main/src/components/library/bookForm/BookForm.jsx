import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";

import { errorToast } from "../../../utils/notification";

const BookForm = ({
    book,
    isEditing = false,
    onAddBook,
    onSaveBook
}) => {
    const [title, setTitle] = useState(book?.title);
    const [author, setAuthor] = useState(book?.author);
    const [rating, setRating] = useState(book?.rating);
    const [pageCount, setPageCount] = useState(book?.pageCount);
    const [imageUrl, setImageUrl] = useState(book?.imageUrl);
    const [available, setAvailable] = useState(book?.available);

    const navigate = useNavigate();
    const { id } = useParams();


    const handleChangeTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleChangeAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleChangeRating = (event) => {
        setRating(event.target.value)
    }

    const handleChangePageCount = (event) => {
        setPageCount(event.target.value)
    }

    const handleChangeImageUrl = (event) => {
        setImageUrl(event.target.value)
    }

    const handleChangeAvailability = (event) => {
        setAvailable(event.target.checked)
    }

    const handleGoBack = () => {
        navigate("/library");
    }

    const handleSaveBook = (bookData) => {
        fetch(`${import.meta.env.VITE_BASE_SERVER_URL}/books/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("book-champions-token")}`
            },
            method: "PUT",
            body: JSON.stringify(bookData)
        })
            .then(res => res.json())
            .then(data => {
                onSaveBook(data)
            })
            .catch(err => console.log(err))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!title || !author)
            return errorToast("El título y el autor son campos requeridos",
                {
                    theme: 'dark'
                });

        const bookData = {
            title,
            author,
            pageCount,
            rating,
            imageUrl,
            available,
        }
        if (isEditing)
            handleSaveBook(bookData);

        else {
            onAddBook(bookData);
            setTitle('');
            setAuthor('');
            setImageUrl('');
            setPageCount('');
            setRating('');
            setAvailable(false);
        }

    }

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título"
                                    onChange={handleChangeTitle}
                                    value={title}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar autor"
                                    onChange={handleChangeAuthor}
                                    value={author} />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    onChange={handleChangeRating}
                                    value={rating}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    onChange={handleChangePageCount}
                                    value={pageCount}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresar url de imagen"
                                onChange={handleChangeImageUrl}
                                value={imageUrl} />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                onChange={handleChangeAvailability}
                                checked={available}
                            />
                            <Row >
                                <Col />
                                <Col md={6} className="d-flex justify-content-end">
                                    <Button className="me-3"
                                        onClick={handleGoBack}
                                        variant="secondary"
                                        type="button">
                                        Volver
                                    </Button>
                                    <Button variant="primary" type="submit">
                                        {isEditing ? "Actualizar" : "Agregar"} lectura
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};


export default BookForm;
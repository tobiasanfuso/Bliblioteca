import { useState } from "react";

import BookItem from "../bookItem/BookItem";
import BookSearch from "../bookSearch/BookSearch";
import ModalDelete from "../../ui/modalDelete/ModalDelete";

const initialModalState = {
    show: false,
    id: 0,
    title: ''
};

const Books = ({ books, onDelete }) => {
    const [selectedBook, setSelectedBook] = useState('');
    const [searchBook, setSearchBook] = useState("");
    const [modal, setModal] = useState(initialModalState);

    const handleBookSearch = (value) => {
        setSearchBook(value)
    }

    const handleBookSelected = (bookTitle) => {
        setSelectedBook(bookTitle);
    }

    const handleShowDeleteModal = (bookId, bookTitle) => {
        setModal({
            show: true,
            id: bookId,
            title: bookTitle
        });
    }

    const handleHideDeleteModal = () => {
        setModal(initialModalState);
    }

    const handleDeleteBook = (bookId) => {
        onDelete(bookId);
        handleHideDeleteModal();
    }

    const booksMapped = books
        .filter(book =>
            book.title?.toUpperCase().includes(searchBook.toUpperCase()))
        .map((book) =>
            <BookItem
                key={book.id}
                id={book.id}
                title={book.title}
                author={book.author}
                pageCount={book.pageCount}
                rating={book.rating}
                imageUrl={book.imageUrl}
                available={book.available}
                summary={book.summary}
                onBookSelected={handleBookSelected}
                onDeleteBook={handleShowDeleteModal} />);

    return (
        <>
            <ModalDelete
                show={modal.show}
                bookId={modal.id}
                bookTitle={modal.title}
                onCancel={handleHideDeleteModal}
                onDelete={handleDeleteBook}
            />
            <BookSearch onSearch={handleBookSearch} searchBook={searchBook} />
            {
                selectedBook &&
                <p>Usted ha seleccionado el libro: <b>{selectedBook}</b></p>
            }

            <div className="d-flex justify-content-center flex-wrap">
                {booksMapped.length ?
                    booksMapped :
                    <p>No se encontraron libros</p>}
            </div>
        </>)
}

export default Books
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

import './bookSearch.css'

const BookSearch = ({ onSearch, searchBook }) => {
    const handleSearchChange = (e) => {
        onSearch(e.target.value)
    }
    return <FormGroup className="mb-3 search-input-container" controlId="searchBook">
        <FormLabel className="search-label">Buscar libro: </FormLabel>
        <FormControl
            type="text"
            placeholder="Buscar libro..."
            onChange={handleSearchChange}
            value={searchBook} />
    </FormGroup>
}

export default BookSearch;
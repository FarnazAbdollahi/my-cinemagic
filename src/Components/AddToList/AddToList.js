import React from 'react'
import './AddToList.css'
import { Form, Button, Modal } from 'react-bootstrap'
import { useState } from 'react'
import axios from '../../axios-movies'

const AddToList = () => {

    const [title, setTitle] = useState('')
    const [year, setYear] = useState('')
    const [imdb, setIMDB] = useState('')
    const [genre, setGenre] = useState('')
    const [status, setStatus] = useState('')

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)


    const saveHandler = (title, year, imdb, genre, status) => {
        axios.post('/watchList.json', { title: title, year: year, imdb: imdb, genre: genre, status: status })
            .then((response) => {
                setTitle('')
                setYear('')
                setIMDB('')
                setGenre([])
                setStatus('')
                handleClose()
            })
            .catch((error) => {
            })
    }
    return (
        <React.Fragment>
            <Button className="button" onClick={handleShow}>+ Add</Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Movie/Serie to your list</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form >
                        <Form.Group>
                            <Form.Label>Title of the Movie/Serie</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Title"
                                value={title}
                                onChange={(event) => {
                                    setTitle(event.target.value)
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Year of release</Form.Label>
                            <Form.Control
                                type="number"
                                min="1900"
                                max="2099"
                                step="1"
                                placeholder="Year"
                                value={year}
                                onChange={(event) => {
                                    setYear(event.target.value)
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>IMDB Rate</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="IMDB"
                                step="0.1"
                                min="1"
                                max="10"
                                value={imdb}
                                onChange={(event) => {
                                    setIMDB(event.target.value)
                                }} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Genre</Form.Label>
                            <Form.Control
                                as="select"
                                value={genre}
                                onChange={(event) => {
                                    setGenre([...genre, event.target.value])
                                }} multiple={true}>
                                <option value="Romance">Romance</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                                <option value="War">War</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Horror">Horror</option>
                                <option value="Action">Action</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Animation">Animation</option>
                                <option value="Bigraphy">Biography</option>
                                <option value="Sport">Sport</option>
                                <option value="Adventure">Adventure</option>
                                <option value="Crime">Crime</option>
                                <option value="Mystery">Mystery</option>

                            </Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Watched/NotWatched</Form.Label>
                            <Form.Control
                                as="select"
                                value={status}
                                onChange={(event) => {
                                    setStatus(event.target.value)
                                }}>
                                <option>Choose</option>
                                <option>Watched</option>
                                <option>Not Watched</option>
                            </Form.Control>
                        </Form.Group>
                        <Button className="button" onClick={() => saveHandler(title, year, imdb, genre, status)}>
                            Save
                      </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                         </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </React.Fragment>)
}

export default AddToList
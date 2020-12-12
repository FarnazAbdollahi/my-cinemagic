import React from 'react'
import { useState } from 'react'
import './List.css'
import { Table, Form, FormControl, Button } from 'react-bootstrap'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Film from '../Film/Film'
import AddToList from '../../Components/AddToList/AddToList'


const List = (props) => {
    const [filmList, setFilmList] = useState(0)
    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchResults, setSearchResults] = React.useState(0)
    const sortList = (sortby) => {
        let sortedData = [...props.film].sort((a, b) => {
            let A = a[sortby]
            let B = b[sortby]

            if (A < B) {
                return -1
            }
            if (A > B) {
                return 1
            }
            return 0
        })
        console.log(sortedData)
        return setFilmList([...sortedData])

    }
    const searchHandler = () => {
        const results = [...props.film].filter(item =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setSearchResults(results)
    }
    const clearSearchHandler = () => {
        setSearchResults(0)
    }
    return (
        <React.Fragment>
            <div className="list-page">
                <AddToList />

                <Form inline className="list">
                    <FormControl type="text" placeholder="Search" className="mr-sm-4 search-bar" value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} />
                    <Button className="list button" onClick={searchHandler}>Search</Button>
                    <Button variant="secondary" onClick={clearSearchHandler}>Clear</Button>
                </Form>
                <DropdownButton id="dropdown-item" title="Sort based on" className="list">
                    <Dropdown.Item as="button" onClick={() => sortList("title")}>Title</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => sortList("year")}>Year</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => sortList("imdb")}>IMDB</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => sortList("genre")}>Genre</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={() => sortList("status")}>Status</Dropdown.Item>
                </DropdownButton>
            </div>
            <div className="watch-list">
                <Table className="table-hover table">
                    <thead className="thead">
                        <tr>
                            <th>Delete</th>
                            <th>Edit</th>
                            <th>Title</th>
                            <th>Year</th>
                            <th>IMDB</th>
                            <th>Genre</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            (searchResults !== 0) ?
                                searchResults.map((item, index) => {
                                    return (
                                        <Film
                                            key={index}
                                            title={item.title}
                                            year={item.year}
                                            imdb={item.imdb}
                                            genre={item.genre}
                                            status={item.status}
                                            deleteHandler={() => props.deleteHandler(index)}
                                            editHandler={() => props.editHandler(index)}
                                        />)
                                })
                                :
                                (filmList === 0) ?
                                    props.film.map((item, index) => {
                                        return (
                                            <Film
                                                key={index}
                                                title={item.title}
                                                year={item.year}
                                                imdb={item.imdb}
                                                genre={item.genre}
                                                status={item.status}
                                                deleteHandler={() => props.deleteHandler(index)}
                                                editHandler={() => props.editHandler(index)}
                                            />)
                                    })
                                    : filmList.map((item, index) => {
                                        return (
                                            <Film
                                                key={index}
                                                title={item.title}
                                                year={item.year}
                                                imdb={item.imdb}
                                                genre={item.genre}
                                                status={item.status}
                                                deleteHandler={() => props.deleteHandler(index)}
                                                editHandler={() => props.editHandler(index)}
                                            />)
                                    })
                        }

                    </tbody>
                </Table>
            </div>
        </React.Fragment>
    )
}

export default List
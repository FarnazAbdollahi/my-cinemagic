import React, { useState, useEffect } from 'react'
import './HomePage.css'
import { Table, Dropdown, DropdownButton, Button, Form, FormControl } from 'react-bootstrap'
import axios from '../../axios-movies'
// import InfiniteScroll from 'react-infinite-scroll-component'
import Pagination from "react-js-pagination"

const HomePage = () => {


    const [films, setFilmInfo] = useState([])
    const filmsPerPage = 50
    const [activePage, setCurrentPage] = useState(1)
    // Logic for displaying current films
    const indexOfLastTodo = activePage * filmsPerPage
    const indexOfFirstTodo = indexOfLastTodo - filmsPerPage
    let currentFilms = films.slice(indexOfFirstTodo, indexOfLastTodo)
    const [sortedList, setSortedList] = useState(0)

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setCurrentPage(pageNumber)
        setSortedList(0)
        setSearchResults(0)
    };


    useEffect(() => {

        axios.get('https://cinemagic99-default-rtdb.firebaseio.com/completeList/-MOCwEs8cyKMjVLL6Kvg.json')
            .then((response) => {
                if (response.data === null) {
                    document.querySelector(".watch-list").innerHTML = "Nothing on the list yet"
                }
                else {
                    let film = []
                    for (let i = 0; i < response.data.length; i++) {
                        film.push({
                            key: i,
                            title: response.data[i].title,
                            year: response.data[i].year,
                            imdb: response.data[i].imdb,
                            genre: response.data[i].genre,
                        })
                    }
                    setFilmInfo(film)

                }
            })
    })




    const [searchTerm, setSearchTerm] = React.useState("")
    const [searchResults, setSearchResults] = React.useState(0)

    const searchHandler = (event, searchBy) => {
        event.preventDefault()
        let results = [...films].filter(item => {
            return item[searchBy].toLowerCase().includes(searchTerm.toLowerCase())
        })
        setSearchResults([...results])
    }
    const clearSearchHandler = () => {
        setSearchTerm('')
        setSearchResults(0)
    }
    const sortList = (event, sortby) => {
        event.preventDefault()
        setSortedList(
            [...currentFilms].sort((a, b) => {
                let A = a[sortby]
                let B = b[sortby]
                if (A < B) {
                    return -1
                }
                if (A > B) {
                    return 1
                }
                return 0
            }))
    }
    const addSelectedHandler = (item) => {
        axios.post('/watchList.json', { title: item.title, year: item.year, imdb: item.imdb, genre: item.genre, status: 'not Watched' })
            .then((response) => {
                window.alert("Added")
                console.log(response.data)
            })
            .catch((error) => {
            })
    }
    return (
        <main className="home-page">
            <h1>Welcome!</h1>
            <div className="list-page">


                <Form inline className="list">
                    <FormControl type="text" placeholder="Search" className="mr-sm-4 search-bar" value={searchTerm}
                        onChange={(event) => {
                            setSearchTerm(event.target.value)
                        }} />
                    <Button variant="primary" className="list search" onClick={(event) => searchHandler(event, "title")}>Search</Button>
                    <Button variant="secondary" onClick={clearSearchHandler}>Clear</Button>
                </Form>
                <DropdownButton id="dropdown-item" title="Search based on" className="list">
                    <Dropdown.Item as="button" onClick={(event) => sortList(event, "title")}>Title</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={(event) => sortList(event, "year")}>Year</Dropdown.Item>
                    <Dropdown.Item as="button" onClick={(event) => sortList(event, "imdb")}>IMDB</Dropdown.Item>
                </DropdownButton>
            </div>

            <Table className="table-hover table">
                <thead className="thead">
                    <tr>
                        <th>+</th>
                        <th>Title</th>
                        <th>Year</th>
                        <th>IMDB</th>
                        <th>Genre</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (searchResults !== 0) ?
                            searchResults.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td> <Button variant="secondary"
                                            onClick={() => addSelectedHandler(item)}>Add</Button>
                                        </td>
                                        <td>{item.title}</td>
                                        <td>{item.year}</td>
                                        <td>{item.imdb}</td>
                                        <td>{item.genre}</td>
                                        <td>{item.status}</td>
                                    </tr>
                                )
                            }) :
                            (sortedList !== 0) ?
                                sortedList.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> <Button variant="secondary"
                                                onClick={() => addSelectedHandler(item)}>Add</Button>
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.year}</td>
                                            <td>{item.imdb}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    )
                                }) :
                                currentFilms.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <td> <Button variant="secondary"
                                                onClick={() => addSelectedHandler(item)}>Add</Button>
                                            </td>
                                            <td>{item.title}</td>
                                            <td>{item.year}</td>
                                            <td>{item.imdb}</td>
                                            <td>{item.genre}</td>
                                            <td>{item.status}</td>
                                        </tr>
                                    )
                                })

                    }

                </tbody>
            </Table>
            <div className="pagination">
                <Pagination
                    activePage={activePage}
                    itemsCountPerPage={20}
                    totalItemsCount={films.length}
                    pageRangeDisplayed={3}
                    onChange={handlePageChange}
                />
            </div>

        </main>
    )
}

// const HomePage = () => {


//     const [films, setFilmInfo] = useState([])
//     const [current, setCurrent] = useState([])


//     useEffect(() => {

//         axios.get('https://mycinemagic99-default-rtdb.firebaseio.com/completeList/-MO5y6h_gmA8lSO5i_2D.json')
//             .then((response) => {
//                 if (response.data === null) {
//                     document.querySelector(".watch-list").innerHTML = "Nothing on the list yet"
//                 }
//                 else {
//                     console.log(response.data)
//                     let film = []
//                     for (let i = 0; i < response.data.length; i++) {
//                         film.push({
//                             key: i,
//                             title: response.data[i].title,
//                             year: response.data[i].year,
//                             imdb: response.data[i].imdb,
//                             genre: response.data[i].genre,
//                         })
//                     }
//                     setFilmInfo(film)
//                     setCurrent(films.slice(0, 15))
//                 }
//             })
//     })


//     const [count, setCount] = useState({

//         prev: 0,
//         next: 15
//     })
//     const [hasMore, setHasMore] = useState(true);

//     const getMoreData = () => {
//         if (current.length === films.length) {
//             setHasMore(false);
//             return;
//         }
//         setTimeout(() => {
//             setCurrent(current.concat(films.slice(count.prev + 15, count.next + 15)))
//         }, 2000)
//         setCount((prevState) => ({ prev: prevState.prev + 15, next: prevState.next + 15 }))
//     }

//     const [searchTerm, setSearchTerm] = React.useState("")
//     const [searchResults, setSearchResults] = React.useState(0)

//     const searchHandler = (event, searchBy) => {
//         event.preventDefault()
//         const results = [...films].filter(item => {
//             console.log(item.searchBy)
//             // item.searchBy.toLowerCase().includes(searchTerm.toLowerCase())
//         })
//         setSearchResults(results)
//     }
//     const clearSearchHandler = () => {
//         setSearchTerm('')
//         setSearchResults(0)
//     }

//     console.log(films)
//     return (
//         <main className="home-page">
//             <h1>Welcome!</h1>
//             <div className="list-page">
//                 {/* <AddToList filmsFromList={() => { }} /> */}

//                 <Form inline className="list">
//                     <FormControl type="text" placeholder="Search" className="mr-sm-4 search-bar" value={searchTerm}
//                         onChange={(event) => {
//                             setSearchTerm(event.target.value)
//                         }} />
//                     <DropdownButton id="dropdown-item" title="Search based on" className="list">
//                         <Dropdown.Item as="button" onClick={(event) => searchHandler(event, "title")}>Title</Dropdown.Item>
//                         <Dropdown.Item as="button" onClick={(event) => searchHandler(event, "year")}>Year</Dropdown.Item>
//                         <Dropdown.Item as="button" onClick={(event) => searchHandler(event, "imdb")}>IMDB</Dropdown.Item>
//                     </DropdownButton>
//                     <Button variant="secondary" onClick={clearSearchHandler}>Clear</Button>
//                 </Form>

//             </div>
//             <InfiniteScroll
//                 dataLength={current.length}
//                 next={getMoreData}
//                 hasMore={hasMore}
//                 loader={<h4>Loading...</h4>}
//             >
//                 <Table className="table-hover table">
//                     <thead className="thead">
//                         <tr>
//                             <th>Title</th>
//                             <th>Year</th>
//                             <th>IMDB</th>
//                             <th>Genre</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {
//                             (searchResults !== 0) ?
//                                 searchResults.map((item, index) => {
//                                     return (
//                                         <tr key={index}>
//                                             <td>{item.title}</td>
//                                             <td>{item.year}</td>
//                                             <td>{item.imdb}</td>
//                                             <td>{item.genre}</td>
//                                             <td>{item.status}</td>
//                                         </tr>
//                                     )
//                                 }) :
//                                 current && current.map((item, index) => {
//                                     return (
//                                         <tr key={index}>
//                                             <td>{item.title}</td>
//                                             <td>{item.year}</td>
//                                             <td>{item.imdb}</td>
//                                             <td>{item.genre}</td>
//                                             <td>{item.status}</td>
//                                         </tr>
//                                     )
//                                 })

//                         }

//                     </tbody>
//                 </Table>

//             </InfiniteScroll>
//         </main>
//     )
// }

export default HomePage
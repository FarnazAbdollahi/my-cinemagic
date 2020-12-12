

import React from 'react'
import './WatchList.css'
import { useState, useEffect } from 'react'
import List from '../../Components/ListOfFilms/List'
import axios from '../../axios-movies'

const WatchList = () => {
    const [filmInfo, setFilmInfo] = useState([])
    const [selectedForEdit, setSelectedForEdit] = useState(0)

    useEffect(() => {
        axios.get('https://cinemagic99-default-rtdb.firebaseio.com/watchList.json')
            .then((response) => {
                if (response.data === null) {
                    document.querySelector(".watch-list").innerHTML = "Nothing on the list yet"
                }
                else {
                    let key = Object.keys(response.data)
                    let film = []
                    for (let i = 0; i < key.length; i++) {
                        film.push({
                            key: key[i],
                            title: response.data[key[i]].title,
                            year: response.data[key[i]].year,
                            imdb: response.data[key[i]].imdb,
                            genre: response.data[key[i]].genre,
                            status: response.data[key[i]].status,
                        })
                    }
                    setFilmInfo(film)
                }
            })
    })


    const deleteHandler = (index) => {
        axios.delete(`https://cinemagic99-default-rtdb.firebaseio.com/watchList/${filmInfo[index].key}.json`)
            .then(() => {
                setFilmInfo(filmInfo.splice(index, 1))
            });
    }

    const editHandler = (index) => {

        axios.get(`https://cinemagic99-default-rtdb.firebaseio.com/watchList/${filmInfo[index].key}.json`)
            .then((response) => {
                console.log(response.data)
                setSelectedForEdit(response.data)
            })
    }

    return (
        < section className="watched-page" >
            <List film={filmInfo} deleteHandler={deleteHandler} editHandler={editHandler} />
        </section >
    )
}

export default WatchList
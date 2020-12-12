import React from 'react'
import './Film.css'


const Film = (props) => {

    return (
        <tr>
            <td><button className="delete-button" onClick={props.deleteHandler}>&#x274E;</button></td>
            <td><button className="edit-button" onClick={props.editHandler}>edit</button></td>
            <td>{props.title}</td>
            <td>{props.year}</td>
            <td>{props.imdb}</td>
            <td>{props.genre}</td>
            <td>{props.status}</td>

        </tr>

    )
}

export default Film
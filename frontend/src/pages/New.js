import React, { Component } from 'react'
import { useNavigate } from 'react-router-dom'
import './New.css'
import api from '../services/api'

function NewWithNavigate(props) {
    const navigate = useNavigate()
    return <New {...props} navigate={navigate} />
}

class New extends Component {
    state = {
        image: null,
        author: '',
        place: '',
        description: '',
        hashtags: '',
    }



    handleSubmit = async e => {
        e.preventDefault()
        console.log(this.state)

        const data = new FormData()

        data.append('image', this.state.image)
        data.append('author', this.state.author)
        data.append('place', this.state.place)
        data.append('description', this.state.description)
        data.append('hashtags', this.state.hashtags)

        await api.post('posts', data)

        this.props.navigate('/')
    }

    handleImageChange = e => {
        this.setState({ image: e.target.files[0] })
    }

    handleChange = e => {
        this.setState({ [e.target.name]: e.target.value })
    }

    render() {
        return (
            <form id='new-post' onSubmit={this.handleSubmit}>
                <input type='file' onChange={this.handleImageChange}></input>
                <input type='text' name='author' placeholder='Post Author' onChange={this.handleChange} value={this.state.author}></input>
                <input type='text' name='place' placeholder='Post Place' onChange={this.handleChange} value={this.state.place}></input>
                <input type='text' name='description' placeholder='Post description' onChange={this.handleChange} value={this.state.description}></input>
                <input type='text' name='hashtags' placeholder='hashtags' onChange={this.handleChange} value={this.state.hashtags}></input>

                <button type='submit'>Send</button>
            </form>
        )
    }
}

// Wrapper functional component to inject `navigate` into props


export default NewWithNavigate

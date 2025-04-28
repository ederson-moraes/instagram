import React, { Component } from 'react'
import api from '../services/api'
import io from 'socket.io-client'

import './Feed.css'
import like from '../assets/like.svg'
import more from '../assets/more.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'
import { Socket } from 'socket.io-client'



export default class Feed extends Component {
    state = {
        feed: []
    }

    async componentDidMount() {
        this.registerToSocket()

        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }

    registerToSocket = () => {
        const socket = io('http://localhost:3333')

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ...this.state.feed] })
        })

        socket.on('like', likedPost => {
            this.setState({
                feed: this.state.feed.map(post =>
                    post._id === likedPost._id ? likedPost : post
                )
            })
        })

    }

    handleLike = id => {
        api.post(`/posts/${id}/like`)
    }
    render() {
        return (
            <section id="post-list">
                {this.state.feed.map(post => (
                    <article key={post._id}>
                        <header>
                            <div className="user-info">
                                <span className="user-name">{post.author}</span>
                                <span className="post-date">{post.createdAt}</span>
                                <span className="place">{post.place}</span>
                            </div>
                            <img src={more} alt='More'></img>
                        </header>
                        <img src={`http://localhost:3333/files/${post.image}`} alt="Post" />
                        <footer>
                            <div className="actions">
                                <button type='button' onClick={() => this.handleLike(post._id)}>
                                    <img src={like} alt=''></img>
                                </button>
                                <img src={comment} alt=''></img>
                                <img src={send} alt=''></img>
                            </div>
                            <strong>{post.likes} likes</strong>
                            <p>{post.description}
                                <span>{post.hashtags}</span>
                            </p>

                        </footer>

                        <div className="comments">
                            <div className="comment">
                                <span className="comment-user">Comment User</span>
                                <span className="comment-text">Comment text</span>
                            </div>
                            <div className="comment">
                                <span className="comment-user">Comment User</span>
                                <span className="comment-text">Comment text</span>
                            </div>
                        </div>
                    </article>
                ))}

            </section>
        )
    }
}

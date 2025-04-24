import React, { Component } from 'react'
import './Feed.css'
import like from '../assets/like.svg'
import more from '../assets/more.svg'
import comment from '../assets/comment.svg'
import send from '../assets/send.svg'



export default class Feed extends Component {
    render() {
        return (
            <section id="post-list">
                <article>
                    <header>
                        <div className="user-info">
                            <span className="user-name">User Name</span>
                            <span className="post-date">Date</span>
                            <span className="place">Location</span>
                        </div>
                        <img src={more} alt='More'></img>
                    </header>
                    <img src="https://picsum.photos/600/300" alt="Post" />
                    <footer>
                        <p>Post description</p>
                    </footer>
                    <div className="actions">
                        <img src={like} alt=''></img>
                        <img src={comment} alt=''></img>
                        <img src={send} alt=''></img>
                    </div>
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
            </section>
        )
    }
}

import React, { Component } from 'react'
import io from 'socket.io-client'
import api from '../services/api'

import { Text, View, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native'

import more from '../assets/more.png'
import like from '../assets/like.png'
import comment from '../assets/comment.png'
import send from '../assets/send.png'


export default class Feed extends Component {
    state = {
        feed: [],
    }

    async componentDidMount() {
        this.registerToSocket()

        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }

    registerToSocket = () => {
        const socket = io('http://10.0.2.2:3333')

        socket.on('post', newPost => {
            this.setState({ feed: [newPost, ... this.state.feed] })
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
            <View style={styles.container}>
                <FlatList
                    data={this.state.feed} // Pass the feed data to FlatList
                    keyExtractor={post => post._id} // Ensure each item has a unique key
                    renderItem={({ item }) => (
                        <View style={styles.feedItem}>
                            <View style={styles.feedItemHeader}>
                                <View style={styles.userInfo}>
                                    <Text style={styles.name}>{item.author}</Text>
                                    <Text style={styles.place}>{item.place}</Text>
                                </View>
                                <Image source={more}></Image>
                            </View>

                            <Image style={styles.feedImage} source={{ uri: `http://192.168.1.139:3333/files/${item.image}` }}></Image>

                            <View style={styles.feedItemFooter}>
                                <View style={styles.actions}>
                                    <TouchableOpacity style={styles.action} onPress={() => this.handleLike(item._id)}>
                                        <Image source={like}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => { }}>
                                        <Image source={comment}></Image>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.action} onPress={() => { }}>
                                        <Image source={send}></Image>
                                    </TouchableOpacity>
                                </View>

                                <Text style={styles.likes}>{item.likes} curtidas</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.hashtags}>{item.hashtags}</Text>
                            </View>

                        </View>
                    )}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    feedItem: {
        marginTop: 20, // Fixed typo
    },
    feedItemHeader: {
        paddingHorizontal: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 14, // Ensure this is applied
        color: '#000', // Ensure this is applied
    },
    place: {
        fontSize: 12, // Adjusted font size for better visibility
        color: '#666',
        marginTop: 2,
    },
    feedImage: {
        width: '100%',
        height: 400,
        marginVertical: 15,
    },
    feedItemFooter: {
        paddingHorizontal: 15,
    },
    actions: {
        flexDirection: 'row',
    },
    action: {
        marginRight: 8,
    },
    likes: {
        marginTop: 15,
        fontWeight: 'bold', // Fixed typo
        color: '#000',
    },
    description: {
        lineHeight: 18,
        color: '#000',
    },
    hashtags: {
        color: '#7159c1',
    },
})
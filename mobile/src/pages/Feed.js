import { Text, View } from 'react-native'
import React, { Component } from 'react'
import api from '../services/api'

export default class Feed extends Component {
    state = {
        feed: [],
    }

    async componentDidMount() {
        //this.registerToSocket()

        const response = await api.get('posts')

        this.setState({ feed: response.data })
    }

    render() {
        return (
            <View>
                <Text>Meu instagram</Text>
            </View>
        )
    }
}
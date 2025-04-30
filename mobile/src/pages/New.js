import { Text, View, StyleSheet, TouchableOpacity, TextInput, Image, Alert } from 'react-native'
import React, { Component } from 'react'
import * as ImagePicker from 'expo-image-picker'
import api from '../services/api'

export default class New extends Component {
    state = {
        author: '',
        place: '',
        description: '',
        hashtags: '',
        image: null,
    };

    handleSelectImage = async () => {
        Alert.alert(
            'Select Image',
            'Choose an option to select an image',
            [
                {
                    text: 'Gallery',
                    onPress: async () => {
                        await this.pickImage('gallery')
                    },
                },
                {
                    text: 'Camera',
                    onPress: async () => {
                        await this.pickImage('camera')
                    },
                },
                { text: 'Cancel', style: 'cancel' },
            ],
            { cancelable: true }
        )
    };

    pickImage = async (source) => {
        let permissionResult

        // Request permissions based on the source
        if (source === 'gallery') {
            permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync()
        } else if (source === 'camera') {
            permissionResult = await ImagePicker.requestCameraPermissionsAsync()
        }

        if (permissionResult.status !== 'granted') {
            Alert.alert('Permission Denied', `We need access to your ${source} to proceed.`)
            return
        }

        // Launch the appropriate picker
        const result =
            source === 'gallery'
                ? await ImagePicker.launchImageLibraryAsync({
                    mediaTypes: ImagePicker.IMAGE,
                    allowsEditing: false,
                    quality: 1,
                })
                : await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.IMAGE,
                    allowsEditing: false,
                    quality: 1,
                })

        if (!result.canceled) {
            this.setState({ image: result.assets[0].uri })
        }
    };

    handleRemoveImage = () => {
        this.setState({ image: null }) // Clear the selected image
    };

    handleSubmit = async () => {
        console.log('Submitting form...')
        console.log('Image:', this.state.image)
        console.log('Author:', this.state.author)
        console.log('Place:', this.state.place)
        console.log('Description:', this.state.description)
        console.log('Hashtags:', this.state.hashtags)

        if (!this.state.image) {
            Alert.alert('Error', 'Please select an image before sharing.')
            return
        }

        const data = new FormData()

        data.append('image', {
            uri: this.state.image, // The URI of the image
            type: 'image/jpeg', // The MIME type of the image
            name: 'image.jpg', // The name of the file
        })
        data.append('author', this.state.author)
        data.append('place', this.state.place)
        data.append('description', this.state.description)
        data.append('hashtags', this.state.hashtags)

        try {
            console.log('Submitting data:', data)
            const response = await api.post('posts', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }) // Ensure your API endpoint is correct
            console.log('Response:', response.data)
            this.props.navigation.navigate('Feed') // Navigate to the Feed screen
        } catch (error) {
            console.error('Error uploading post:', error)
            Alert.alert('Error', 'Failed to share the post. Please try again.')
        }
    };


    render() {
        return (
            <View style={styles.container}>
                {!this.state.image ? (
                    <TouchableOpacity style={styles.selectButton} onPress={this.handleSelectImage}>
                        <Text style={styles.selectButtonText}>Select Image</Text>
                    </TouchableOpacity>
                ) : (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: this.state.image }} style={styles.thumbnail} />
                        <TouchableOpacity style={styles.removeIcon} onPress={this.handleRemoveImage}>
                            <Text style={styles.removeIconText}>X</Text>
                        </TouchableOpacity>
                    </View>
                )}

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Author name"
                    placeholderTextColor="#999"
                    value={this.state.author}
                    onChangeText={(author) => this.setState({ author })}
                />

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Place"
                    placeholderTextColor="#999"
                    value={this.state.place}
                    onChangeText={(place) => this.setState({ place })}
                />

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Description"
                    placeholderTextColor="#999"
                    value={this.state.description}
                    onChangeText={(description) => this.setState({ description })}
                />

                <TextInput
                    style={styles.input}
                    autoCorrect={false}
                    autoCapitalize="none"
                    placeholder="Hashtags"
                    placeholderTextColor="#999"
                    value={this.state.hashtags}
                    onChangeText={(hashtags) => this.setState({ hashtags })}
                />

                <TouchableOpacity style={styles.shareButton} onPress={this.handleSubmit}>
                    <Text style={styles.shareButtonText}>Share</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 30,
    },

    selectButton: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#CCC',
        borderStyle: 'dashed',
        height: 42,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    selectButtonText: {
        fontSize: 16,
        color: '#666',
    },

    imageContainer: {
        position: 'relative',
        alignItems: 'center',
    },

    thumbnail: {
        width: 100,
        height: 100,
        marginTop: 10,
        borderRadius: 4,
    },

    removeIcon: {
        position: 'absolute',
        top: 5,
        right: 5,
        backgroundColor: '#7159c1',
        borderRadius: 15,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    removeIconText: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },

    input: {
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginTop: 10,
        fontSize: 16,
    },

    shareButton: {
        backgroundColor: '#7159c1',
        borderRadius: 4,
        height: 42,
        marginTop: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    shareButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#FFF',
    },
})
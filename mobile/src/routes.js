import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Image, TouchableOpacity, View } from 'react-native'
import Feed from './pages/Feed'
import New from './pages/New'

import logo from './assets/logo.png'
import camera from './assets/camera.png'


const Stack = createStackNavigator()

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Feed"
                screenOptions={{
                    headerTitle: () => (
                        <Image
                            source={logo}
                            style={{ width: 100, height: 40 }}
                            resizeMode="contain"
                        />
                    ),
                    headerTitleAlign: 'center',
                    headerBackTitle: null,
                    headerTintColor: '#000',
                    cardStyleInterpolator: CardStyleInterpolators.forVerticalIOS
                }}
            >
                <Stack.Screen
                    name="Feed"
                    component={Feed}
                    options={({ navigation }) => ({
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', marginRight: 10 }}>
                                <TouchableOpacity onPress={() => navigation.navigate('New')}>
                                    <Image
                                        source={camera}
                                        style={{ marginRight: 20 }}
                                    />
                                </TouchableOpacity>
                            </View>
                        ),
                    })}
                />
                <Stack.Screen name="New" component={New} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
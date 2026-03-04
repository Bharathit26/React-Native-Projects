import React, { Component } from 'react'
import {Link} from 'expo-router'
import { StyleSheet, Text, View } from 'react-native'

const Login = () => {
     return (
      <View style={styles.container}>
        <Text style={styles.title}> Login Page </Text>

        <Text>Don't have an account?</Text>

        <Link href="/register" style={styles.button}>Sign Up</Link>

        <Link href="/" style={ styles.link }>Back Home</Link>

      </View>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 18,
        //fontFamily: 
    },

    link: {
        marginVertical: 10,
        borderBottomWidth: 1
    },

    button: {
        borderWidth: 5,
        padding: 10,
        borderRadius: 10,
        color: "blue"
    }
})



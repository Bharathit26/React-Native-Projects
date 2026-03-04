import React, { Component, useState } from 'react'
import {Link} from 'expo-router'
import { StyleSheet, Text, View, TouchableOpacity, TextInput} from 'react-native'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

     return (
      <View style={styles.container}>
        <Text style={styles.title}> Welcome Back </Text>

        {/* Email Input */}
        <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            style={styles.input}
        />

        {/* Password Input */}
        <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            style={styles.input}
        />

        {/* Forgot password link */}
        <View style={styles.forgotContainer}>
            <Link href="/forgot-password" style={styles.forgotText}>
        {/* Remove the extra <Text> tag here so the style hits the text directly */}
            Forgot Password?
            </Link>
        </View>

        {/* Login Button */}
        <TouchableOpacity style={styles.loginButton} 
            onPress={() => console.log("Login Attempt:", email, password)}>
            <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>

        <View style = {{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
            <Text>Don't have an account?</Text>
            <Link href="/register" style={styles.signupLink}> Sign Up</Link>
        </View>

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
        padding: 20,
        backgroundColor: '#fff',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 28,
        marginBottom: 40,
        color: '#333', 
    },

    input: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20
    },

    loginButton: {
        backgroundColor: '#007AFF',
        width: '100%',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },

    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },

    signupLink: {
        color: '#007AFF',
        fontWeight: 'bold',
    },

    forgotContainer: {
        alignItems: 'flex-end',
        marginBottom: 20,
        width: '100%',
        paddingRight: 5,
    },

    forgotText: {
        color: '#007AFF',
        fontSize: 14,
        fontWeight: '500',
    },

    link: {
        marginTop: 30,
        color: "gray",
        borderBottomWidth: 1,
        borderBottomColor: "gray",
    }
});



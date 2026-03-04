import { Text, StyleSheet, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { Link, useRouter } from 'expo-router'
import React, { useState } from 'react'

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const router = useRouter();

  const handleRegister = () => {
  //Basic validation function
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }
  console.log("Register Attempt:", fullName, email, password);
  //Navigate to login page after registration
  router.push('/login');
};

     return (

      <ScrollView contentContainerStyle = {styles.container}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>Join ChanreCare today</Text>

        <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={fullName}
            onChangeText={setFullName}
        />  
        <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType='email-address'
        />
        <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
        />
        <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>SIGN UP</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Already have an account? </Text>
                <Link href="/login" style={styles.link}>Login</Link>
            </View>
      </ScrollView>
    )
}
   
export default Register

const styles = StyleSheet.create({
  container: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#1A1A1A'
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        height: 55,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 12,
        paddingHorizontal: 15,
        marginBottom: 15,
        backgroundColor: '#F9F9F9'
    },
    button: {
        backgroundColor: '#007AFF',
        width: '100%',
        height: 55,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    footer: {
        flexDirection: 'row',
        marginTop: 25,
    },
    link: {
        color: '#007AFF',
        fontWeight: 'bold'
    }
});

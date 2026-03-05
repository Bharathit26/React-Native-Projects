import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Image,
    SafeAreaView,
    Alert
} from 'react-native';
import { Link, useRouter } from 'expo-router';

const Register = () => {
    const LogoImage = require('../assets/images/ChanRe.png');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [isFocusedName, setIsFocusedName] = useState(false);
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [isFocusedConfirm, setIsFocusedConfirm] = useState(false);

    const router = useRouter();

    const handleRegister = () => {
        if (!fullName.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
            Alert.alert("Required Data", "Please fill all fields to connect to the backend and store data.", [{ text: "OK" }]);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Invalid Email", "Please enter a valid email address.", [{ text: "OK" }]);
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        console.log("Register Attempt:", fullName, email, password);

        // Navigate to login page after registration
        Alert.alert(
            "Registration Successful",
            "A link has been sent to your mail id. Click OK to login.",
            [{ text: "OK", onPress: () => router.push('/login') }]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={styles.innerContainer}>
                        {/* Header Section */}
                        <View style={styles.headerContainer}>
                            <Image
                                source={LogoImage}
                                style={styles.logo}
                                resizeMode="contain"
                            />
                            <Text style={styles.title}>Create Account</Text>
                            <Text style={styles.subtitle}>Join ChanreCare today</Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.formContainer}>
                            <View style={[styles.inputContainer, isFocusedName && styles.inputFocused]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#9ca3af"
                                    value={fullName}
                                    onChangeText={setFullName}
                                    onFocus={() => setIsFocusedName(true)}
                                    onBlur={() => setIsFocusedName(false)}
                                    autoCapitalize="words"
                                />
                            </View>

                            <View style={[styles.inputContainer, isFocusedEmail && styles.inputFocused]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email Address"
                                    placeholderTextColor="#9ca3af"
                                    value={email}
                                    onChangeText={setEmail}
                                    onFocus={() => setIsFocusedEmail(true)}
                                    onBlur={() => setIsFocusedEmail(false)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            </View>

                            <View style={[styles.inputContainer, isFocusedPassword && styles.inputFocused]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    placeholderTextColor="#9ca3af"
                                    value={password}
                                    onChangeText={setPassword}
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                    secureTextEntry
                                />
                            </View>

                            <View style={[styles.inputContainer, isFocusedConfirm && styles.inputFocused]}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#9ca3af"
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    onFocus={() => setIsFocusedConfirm(true)}
                                    onBlur={() => setIsFocusedConfirm(false)}
                                    secureTextEntry
                                />
                            </View>

                            {/* Register Button */}
                            <TouchableOpacity
                                style={styles.button}
                                activeOpacity={0.8}
                                onPress={handleRegister}
                            >
                                <Text style={styles.buttonText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer Section */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Already have an account? </Text>
                            <Link href="/login" style={styles.link}>
                                Login here
                            </Link>
                        </View>

                        <View style={styles.backHomeContainer}>
                            <Link href="/" style={styles.backHomeLink}>
                                Back to Home
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default Register;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    container: {
        flex: 1,
    },
    scrollContainer: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },
    headerContainer: {
        marginBottom: 40,
        alignItems: 'center',
    },
    logo: {
        width: 120,
        height: 120,
        marginBottom: 16,
    },
    title: {
        fontSize: 32,
        fontWeight: '800',
        color: '#111827',
        marginBottom: 8,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        fontWeight: '500',
    },
    formContainer: {
        marginBottom: 24,
    },
    inputContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e5e7eb',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    inputFocused: {
        borderColor: '#4f46e5',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 4,
    },
    input: {
        paddingHorizontal: 16,
        paddingVertical: 16,
        fontSize: 16,
        color: '#1f2937',
    },
    button: {
        backgroundColor: '#4f46e5',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        marginTop: 8,
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },
    footerText: {
        color: '#6b7280',
        fontSize: 15,
    },
    link: {
        color: '#4f46e5',
        fontSize: 15,
        fontWeight: '700',
    },
    backHomeContainer: {
        marginTop: 40,
        alignItems: 'center',
    },
    backHomeLink: {
        color: '#9ca3af',
        fontSize: 14,
        fontWeight: '500',
        textDecorationLine: 'underline',
    },
});

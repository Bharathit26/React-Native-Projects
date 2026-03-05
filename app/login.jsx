import React, { useState } from 'react';
import { Link } from 'expo-router';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    Image,
    Alert
} from 'react-native';

const Login = () => {
    const LogoImage = require('../assets/images/ChanRe.png');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isFocusedEmail, setIsFocusedEmail] = useState(false);
    const [isFocusedPassword, setIsFocusedPassword] = useState(false);
    const [errors, setErrors] = useState({ email: '', password: '' });

    const handleLogin = () => {
        let valid = true;
        let newErrors = { email: '', password: '' };

        if (!email.trim()) {
            newErrors.email = "*Email is required";
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = "*Enter a valid email address";
            valid = false;
        }

        if (!password.trim()) {
            newErrors.password = "*Password is required";
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            console.log('Login Attempt:', email, password);
            Alert.alert("Login Successful", "Welcome back to ChanRe!");
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.container}
            >
                <ScrollView contentContainerStyle={styles.scrollGrow} keyboardShouldPersistTaps="handled">
                    <View style={styles.innerContainer}>
                        {/* Header Section with Logo */}
                        <View style={styles.headerContainer}>
                            <Image
                                source={LogoImage}
                                style={styles.logo}
                                resizeMode="contain"

                            />
                            <Text style={styles.title}>Welcome Back</Text>
                            <Text style={styles.subtitle}>Sign in to continue</Text>
                        </View>

                        {/* Form Section */}
                        <View style={styles.formContainer}>
                            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
                            <View style={[styles.inputContainer, isFocusedEmail && styles.inputFocused, errors.email && {borderColor: '#ef4444'}]}>
                                <TextInput
                                    placeholder="Email Address"
                                    placeholderTextColor="#9ca3af"
                                    value={email}
                                    onChangeText={(val) => { setEmail(val); setErrors({ ...errors, email: '' }); }}
                                    onFocus={() => setIsFocusedEmail(true)}
                                    onBlur={() => setIsFocusedEmail(false)}
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    style={styles.input}
                                />
                            </View>
                            
                            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
                            <View style={[styles.inputContainer, isFocusedPassword && styles.inputFocused, errors.password && {borderColor: '#ef4444'}]}>
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#9ca3af"
                                    value={password}
                                    onChangeText={(val) => { setPassword(val); setErrors({ ...errors, password: '' }); }}
                                    onFocus={() => setIsFocusedPassword(true)}
                                    onBlur={() => setIsFocusedPassword(false)}
                                    secureTextEntry
                                    style={styles.input}
                                />
                            </View>

                            {/* Forgot password link */}
                            <View style={styles.forgotContainer}>
                                <Link href="/forgot-password" style={styles.forgotText}>
                                    Forgot Password?
                                </Link>
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity
                                style={styles.loginButton}
                                activeOpacity={0.8}
                                onPress={handleLogin}
                            >
                                <Text style={styles.loginButtonText}>Sign In</Text>
                            </TouchableOpacity>
                        </View>

                        {/* Footer Section */}
                        <View style={styles.footerContainer}>
                            <Text style={styles.footerText}>Don't have an account? </Text>
                            <Link href="/register" style={styles.signupLink}>
                                Create one now
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

export default Login;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f9fafb',
    },
    container: {
        flex: 1,
    },
    scrollGrow: {
        flexGrow: 1,
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
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
        shadowOffset: {
            width: 0,
            height: 1,
        },
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
    forgotContainer: {
        alignItems: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        color: '#4f46e5',
        fontSize: 14,
        fontWeight: '600',
    },
    loginButton: {
        backgroundColor: '#4f46e5',
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        shadowColor: '#4f46e5',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
    },
    loginButtonText: {
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
    signupLink: {
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

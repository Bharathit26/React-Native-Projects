import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ForgotPassword() {
  const LogoImage = require('../assets/images/ChanRe.png');
  const [email, setEmail] = useState('');
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const router = useRouter();
  const [errors, setErrors] = useState({ email: '' });

  const handleReset = () => {
    if (!email.trim()) {
      Alert.alert("Required Data", "Please enter your email address to connect to the backend.", [{ text: "OK" }]);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.", [{ text: "OK" }]);
      return;
    }

    // This is where you'd call your backend later
    Alert.alert(
      "Reset Sent",
      "Check your email for a reset link! Click OK to go back to login.",
      [{ text: "OK", onPress: () => router.back() }]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollGrow} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            {/* Header Section */}
            <View style={styles.headerContainer}>
              <Image
                source={LogoImage}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.title}>Reset Password</Text>
              <Text style={styles.subtitle}>
                Enter your email and we'll send you a link to get back into your account.
              </Text>
            </View>

            {/* Form Section */ }                         
            <View style={styles.formContainer}>
              <View style={[styles.inputContainer, isFocusedEmail && styles.inputFocused, errors.email && {borderColor: '#ef4444'}]}>
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

              {/* Reset Button */}
              <TouchableOpacity
                style={styles.button}
                activeOpacity={0.8}
                onPress={handleReset}
              >
                <Text style={styles.buttonText}>Send Link</Text>
              </TouchableOpacity>
            </View>

            {/* Footer Section */}
            <View style={styles.backHomeContainer}>
              <TouchableOpacity onPress={() => router.back()} activeOpacity={0.8}>
                <Text style={styles.backHomeLink}>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
    marginBottom: 12,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 24,
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
  backHomeContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  backHomeLink: {
    color: '#9ca3af',
    fontSize: 15,
    fontWeight: '600',
  },
});

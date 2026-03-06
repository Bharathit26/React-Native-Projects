import React, { useState } from "react";
import { Link } from "expo-router";
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
  Alert,
} from "react-native";
import { Colors } from "../constants/colors";

const Login = () => {
  const LogoImage = require("../assets/images/ChanRe.png");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [isFocusedPassword, setIsFocusedPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = async () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

    // Client-side validation
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
    if (!valid) return;

    // --- Backend API call ---
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error returned from backend
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        return;
      }

      // Success
      Alert.alert("Login Successful", `Welcome back, ${data.fullName || ""}!`);
      // You can navigate to the main page here
      // router.replace("/home"); // if using expo-router
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView
          contentContainerStyle={styles.scrollGrow}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.innerContainer}>
            <View style={styles.card}>
              {/* Header */}
              <View style={styles.headerContainer}>
                <View style={styles.logoWrap}>
                  <Image
                    source={LogoImage}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Sign in to continue</Text>
              </View>

              {/* Form */}
              <View style={styles.formContainer}>
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
                <View
                  style={[
                    styles.inputContainer,
                    isFocusedEmail && styles.inputFocused,
                    errors.email && { borderColor: "#ef4444" },
                  ]}
                >
                  <TextInput
                    placeholder="Enter your email address"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={(val) => {
                      setEmail(val);
                      setErrors({ ...errors, email: "" });
                    }}
                    onFocus={() => setIsFocusedEmail(true)}
                    onBlur={() => setIsFocusedEmail(false)}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.input}
                  />
                </View>

                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <View
                  style={[
                    styles.inputContainer,
                    isFocusedPassword && styles.inputFocused,
                    errors.password && { borderColor: "#ef4444" },
                  ]}
                >
                  <TextInput
                    placeholder="Enter your password"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={(val) => {
                      setPassword(val);
                      setErrors({ ...errors, password: "" });
                    }}
                    onFocus={() => setIsFocusedPassword(true)}
                    onBlur={() => setIsFocusedPassword(false)}
                    secureTextEntry
                    style={styles.input}
                  />
                </View>

                {/* Forgot password */}
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

              {/* Footer */}
              <View style={styles.footerContainer}>
                <Text style={styles.footerText}>Don't have an account? </Text>
                <Link href="/register" style={styles.signupLink}>
                  Create one now
                </Link>
              </View>

              {/* Back Home */}
              <View style={styles.backHomeContainer}>
                <Link href="/" style={styles.backHomeLink}>
                  Back to Home
                </Link>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#f9fafb" },
  container: { flex: 1 },
  scrollGrow: { flexGrow: 1, justifyContent: "center" },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: "#ffffff",
    borderRadius: 24,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 20,
    shadowColor: "#0a0f1a",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  headerContainer: { marginBottom: 26, alignItems: "center" },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  logo: { width: 140, height: 80, resizeMode: "contain" },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#111827",
    marginBottom: 6,
    letterSpacing: -0.4,
  },
  subtitle: { fontSize: 15, color: "#6b7280", fontWeight: "500" },
  formContainer: { marginBottom: 16 },
  errorText: {
    color: "#ef4444",
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 4,
    fontWeight: "500",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  inputFocused: { borderColor: "#4f46e5", borderWidth: 1 },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1f2937",
    outlineStyle: "none",
  },
  forgotContainer: { alignItems: "flex-end", marginBottom: 22 },
  forgotText: { color: Colors.primary, fontSize: 14, fontWeight: "600" },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 14,
  },
  footerText: { color: "#6b7280", fontSize: 15 },
  signupLink: { color: Colors.primary, fontSize: 15, fontWeight: "700" },
  backHomeContainer: { marginTop: 18, alignItems: "center" },
  backHomeLink: {
    color: "#9ca3af",
    fontSize: 14,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});

import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
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

  const router = useRouter();

  const handleLogin = async () => {
    let valid = true;
    let newErrors = { email: "", password: "" };

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

    try {
      const response = await fetch(
        "http://192.168.31.231:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
        return;
      }

      Alert.alert("Login Successful", `Welcome back ${data.fullName}!`);

      router.replace("/");
    } catch (error) {
      console.log("Login error:", error);
      Alert.alert("Error", "Unable to connect to server");
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.card}>
            {/* Logo */}
            <View style={styles.header}>
              <Image
                source={LogoImage}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue</Text>
            </View>

            {/* Email */}
            {errors.email ? (
              <Text style={styles.error}>{errors.email}</Text>
            ) : null}

            <View
              style={[
                styles.inputContainer,
                isFocusedEmail && styles.inputFocused,
                errors.email && styles.inputError,
              ]}
            >
              <TextInput
                placeholder="Enter your email"
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

            {/* Password */}
            {errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <View
              style={[
                styles.inputContainer,
                isFocusedPassword && styles.inputFocused,
                errors.password && styles.inputError,
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

            {/* Forgot Password */}
            <View style={styles.forgotContainer}>
              <Link href="/forgot-password">
                <Text style={styles.forgot}>Forgot Password?</Text>
              </Link>
            </View>

            {/* Login Button */}
            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Don't have an account? </Text>

              <Link href="/register">
                <Text style={styles.signup}>Create one</Text>
              </Link>
            </View>

            {/* Back Home */}
            <View style={styles.backContainer}>
              <Link href="/">
                <Text style={styles.back}>Back to Home</Text>
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
    backgroundColor: "#f9fafb",
  },

  container: {
    flex: 1,
  },

  scroll: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 28,
    marginHorizontal: 10,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  header: {
    alignItems: "center",
    marginBottom: 24,
  },

  logo: {
    width: 140,
    height: 80,
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: Colors.subText,
    marginTop: 4,
    textAlign: "center",
  },

  error: {
    color: "#ef4444",
    fontSize: 12,
    marginBottom: 6,
    marginLeft: 4,
  },

  inputContainer: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    backgroundColor: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 14,
    marginBottom: 16,
  },

  inputFocused: {
    borderColor: Colors.primary,
  },

  inputError: {
    borderColor: "#ef4444",
  },

  input: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: Colors.text,
    outlineStyle: "none"
  },

  forgotContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },

  forgot: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: "600",
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,

    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 18,
  },

  footerText: {
    color: "#6b7280",
    fontSize: 14,
  },

  signup: {
    color: Colors.primary,
    fontWeight: "700",
  },

  backContainer: {
    marginTop: 18,
    alignItems: "center",
  },

  back: {
    color: "#9ca3af",
    fontSize: 13,
    textDecorationLine: "underline",
  },
});
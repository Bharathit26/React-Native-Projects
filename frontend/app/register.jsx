import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { Colors } from "../constants/colors";

export default function Register() {
  const LogoImage = require("../assets/images/ChanRe.png");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [focusName, setFocusName] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPassword, setFocusPassword] = useState(false);
  const [focusConfirm, setFocusConfirm] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
  });

  const router = useRouter();
  const handleRegister = async () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "", confirm: "" };

    // Client-side validation
    if (!fullName.trim()) {
      newErrors.name = "*Full name is required";
      valid = false;
    }
    if (!email.trim()) {
      newErrors.email = "*Email is required";
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "*Enter a valid email";
      valid = false;
    }
    if (!password.trim()) {
      newErrors.password = "*Password is required";
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = "*Password must be at least 6 characters";
      valid = false;
    }
    if (!confirmPassword.trim()) {
      newErrors.confirm = "*Confirm your password";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirm = "*Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) return;

    // --- Backend API call ---
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Show error returned from backend
        Alert.alert(
          "Registration Failed",
          data.message || "Something went wrong",
        );
        return;
      }

      // Success
      Alert.alert(
        "Registration Successful",
        data.message || "Account created successfully",
        [{ text: "OK", onPress: () => router.replace("/login") }],
      );
    } catch (error) {
      console.error(error);
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
            <View style={styles.logoWrap}>
              <Image
                source={LogoImage}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Join ChanreCare today</Text>

            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
            <View
              style={[
                styles.inputContainer,
                focusName && styles.focused,
                errors.name && { borderColor: "red" },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor={Colors.placeholder}
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors({ ...errors, name: "" });
                }}
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
                autoCapitalize="words"
              />
            </View>

            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <View
              style={[
                styles.inputContainer,
                focusEmail && styles.focused,
                errors.email && { borderColor: "red" },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={Colors.placeholder}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: "" });
                }}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}
            <View
              style={[
                styles.inputContainer,
                focusPassword && styles.focused,
                errors.password && { borderColor: "red" },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor={Colors.placeholder}
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: "" });
                }}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
                secureTextEntry
              />
            </View>

            {errors.confirm && (
              <Text style={styles.errorText}>{errors.confirm}</Text>
            )}
            <View
              style={[
                styles.inputContainer,
                focusConfirm && styles.focused,
                errors.confirm && { borderColor: "red" },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor={Colors.placeholder}
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors({ ...errors, confirm: "" });
                }}
                onFocus={() => setFocusConfirm(true)}
                onBlur={() => setFocusConfirm(false)}
                secureTextEntry
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              activeOpacity={0.85}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Link href="/login" style={styles.link}>
                Login
              </Link>
            </View>

            <Link href="/" style={styles.backHome}>
              Back to Home
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
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
    backgroundColor: Colors.card,
    borderRadius: 20,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 18,
  },
  logo: {
    width: 150,
    height: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: Colors.text,
  },
  subtitle: {
    fontSize: 15,
    textAlign: "center",
    color: Colors.placeholder,
    marginBottom: 25,
  },
  inputContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 16,
  },
  focused: {
    borderColor: "#4f46e5",
    borderWidth: 1,
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 15,
    fontSize: 16,
    color: Colors.text,
    outlineStyle: "none",
  },
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 5,
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
    color: Colors.placeholder,
    fontSize: 14,
    marginRight: 5,
  },
  link: {
    color: Colors.primary,
    fontWeight: "700",
  },
  backHome: {
    marginTop: 20,
    textAlign: "center",
    color: Colors.placeholder,
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 6,
  },
});

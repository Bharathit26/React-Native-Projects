import React, { useState } from "react";
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
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { Colors } from "../constants/colors";

export default function ForgotPassword() {
  const LogoImage = require("../assets/images/ChanRe.png");

  const [email, setEmail] = useState("");
  const [isFocusedEmail, setIsFocusedEmail] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const handleReset = async () => {
    if (!email.trim()) {
      setError("*Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("*Enter a valid email address");
      return;
    }

    setError("");

    try {
      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Error", data.message || "Something went wrong");
        return;
      }

      Alert.alert(
        "Reset Sent",
        data.message || "Check your email for a reset link.",
        [{ text: "OK", onPress: () => router.back() }],
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

            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              Enter your email and we will send you a link to reset your
              password.
            </Text>

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View
              style={[
                styles.inputContainer,
                isFocusedEmail && styles.inputFocused,
                error && { borderColor: "red" },
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor={Colors.placeholder}
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  setError("");
                }}
                onFocus={() => setIsFocusedEmail(true)}
                onBlur={() => setIsFocusedEmail(false)}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              activeOpacity={0.85}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <Text style={styles.backText}>Back to Login</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
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
    alignItems: "center",
  },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginBottom: 18,
  },
  logo: { width: 150, height: 60, resizeMode: "contain" },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.placeholder,
    textAlign: "center",
    marginBottom: 25,
    lineHeight: 22,
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 6,
    alignSelf: "flex-start",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: 20,
  },
  inputFocused: { borderColor: "#4f46e5", borderWidth: 1 },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: Colors.text,
    outlineStyle: "none",
  },
  button: {
    width: "100%",
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 5,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  backButton: { marginTop: 18 },
  backText: { fontSize: 14, color: Colors.placeholder, fontWeight: "600" },
});

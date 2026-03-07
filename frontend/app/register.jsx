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

    try {
      const response = await fetch(
        "http://192.168.31.231:5000/api/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fullName, email, password }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        Alert.alert(
          "Registration Failed",
          data.message || "Something went wrong"
        );
        return;
      }

      Alert.alert(
        "Registration Successful",
        data.message || "Account created successfully",
        [{ text: "OK", onPress: () => router.replace("/login") }]
      );
    } catch (error) {
      console.log(error);
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
            <View style={styles.header}>
              <Image
                source={LogoImage}
                style={styles.logo}
                resizeMode="contain"
              />

              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.subtitle}>Join ChanreCare today</Text>
            </View>

            {errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

            <View
              style={[
                styles.inputContainer,
                focusName && styles.inputFocused,
                errors.name && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                placeholderTextColor="#9ca3af"
                value={fullName}
                onChangeText={(text) => {
                  setFullName(text);
                  setErrors({ ...errors, name: "" });
                }}
                onFocus={() => setFocusName(true)}
                onBlur={() => setFocusName(false)}
              />
            </View>

            {errors.email ? <Text style={styles.error}>{errors.email}</Text> : null}

            <View
              style={[
                styles.inputContainer,
                focusEmail && styles.inputFocused,
                errors.email && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                placeholderTextColor="#9ca3af"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setEmail(text);
                  setErrors({ ...errors, email: "" });
                }}
                onFocus={() => setFocusEmail(true)}
                onBlur={() => setFocusEmail(false)}
              />
            </View>

            {errors.password ? (
              <Text style={styles.error}>{errors.password}</Text>
            ) : null}

            <View
              style={[
                styles.inputContainer,
                focusPassword && styles.inputFocused,
                errors.password && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={password}
                onChangeText={(text) => {
                  setPassword(text);
                  setErrors({ ...errors, password: "" });
                }}
                onFocus={() => setFocusPassword(true)}
                onBlur={() => setFocusPassword(false)}
              />
            </View>

            {errors.confirm ? (
              <Text style={styles.error}>{errors.confirm}</Text>
            ) : null}

            <View
              style={[
                styles.inputContainer,
                focusConfirm && styles.inputFocused,
                errors.confirm && styles.inputError,
              ]}
            >
              <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#9ca3af"
                secureTextEntry
                value={confirmPassword}
                onChangeText={(text) => {
                  setConfirmPassword(text);
                  setErrors({ ...errors, confirm: "" });
                }}
                onFocus={() => setFocusConfirm(true)}
                onBlur={() => setFocusConfirm(false)}
              />
            </View>

            <TouchableOpacity
              style={styles.button}
              onPress={handleRegister}
              activeOpacity={0.8}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>

              <Link href="/login">
                <Text style={styles.link}>Login</Text>
              </Link>
            </View>

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
}

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
    height: 70,
    marginBottom: 10,
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

  link: {
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
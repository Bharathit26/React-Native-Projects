import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from "react-native";
import { Link } from "expo-router";
import { Colors } from "../constants/colors";

const { width } = Dimensions.get("window");

export default function Home() {
  const ImageSource = require("../assets/images/home.png");

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.container}>
        {/* MAIN CARD */}
        <View style={styles.card}>
          {/* IMAGE */}
          <View style={styles.imageWrapper}>
            <Image
              source={ImageSource}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          {/* TEXT CONTENT */}
          <View style={styles.textSection}>
            <Text style={styles.brandTag}>CLINIC & RESEARCH</Text>

            <Text style={styles.title}>ChanreCare</Text>

            <View style={styles.divider} />

            <Text style={styles.subtext}>Your joints, our genius.</Text>

            <Text style={styles.description}>
              The ultimate destination for specialized autoimmune and allergy
              solutions.
            </Text>
          </View>

          {/* BUTTONS */}
          <View style={styles.buttonSection}>
            <Link href="/login" asChild>
              <TouchableOpacity
                style={styles.primaryButton}
                activeOpacity={0.85}
              >
                <Text style={styles.primaryButtonText}>Sign In</Text>
              </TouchableOpacity>
            </Link>

            <Link href="/register" asChild>
              <TouchableOpacity
                style={styles.secondaryButton}
                activeOpacity={0.7}
              >
                <Text style={styles.secondaryButtonText}>
                  New Patient? Register
                </Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </View>
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
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  /* CARD */

  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: Colors.card,
    borderRadius: 26,
    padding: 24,

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 6,
  },

  /* IMAGE */

  imageWrapper: {
    width: "100%",
    aspectRatio: 1.6,
    borderRadius: 18,
    overflow: "hidden",
    marginBottom: 22,
  },

  image: {
    width: "100%",
    height: "100%",
  },

  /* TEXT SECTION */

  textSection: {
    alignItems: "center",
    marginBottom: 28,
  },

  brandTag: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 2,
    color: "#9CA3AF",
    marginBottom: 6,
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.text,
  },

  divider: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginVertical: 12,
  },

  subtext: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: 10,
  },

  /* BUTTONS */

  buttonSection: {
    width: "100%",
  },

  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },

  secondaryButton: {
    alignItems: "center",
    paddingVertical: 10,
  },

  secondaryButtonText: {
    fontSize: 15,
    fontWeight: "600",
    color: Colors.primary,
  },
});

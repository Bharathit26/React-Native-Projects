import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Dimensions, StatusBar } from "react-native";
import { Link } from 'expo-router';

const { width, height } = Dimensions.get('window');

const Home = () => {
    const ImageSource = require('../assets/images/home.png');

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" />

            {/* Top Image Section - Increased height slightly for better balance */}
            <View style={styles.imageContainer}>
                <Image
                    source={ImageSource}
                    style={styles.image}
                    resizeMode="cover"
                />
                {/* Subtle gradient-like overlay from bottom */}
                <View style={styles.imageOverlay} />
            </View>

            {/* Content Section */}
            <View style={styles.contentContainer}>
                <View style={styles.textWrapper}>
                    <Text style={styles.brandTag}>CLINIC & RESEARCH</Text>
                    <Text style={styles.title}>ChanreCare</Text>

                    <View style={styles.divider} />

                    <Text style={styles.subtext}>Your joints, our genius.</Text>
                    <Text style={styles.description}>
                        The ultimate destination for specialized autoimmune and allergy solutions.
                    </Text>
                </View>

                {/* Action Buttons - Moved to bottom with better grouping */}
                <View style={styles.actionContainer}>
                    <Link href="/login" asChild>
                        <TouchableOpacity style={styles.primaryButton} activeOpacity={0.8}>
                            <Text style={styles.primaryButtonText}>Sign In</Text>
                        </TouchableOpacity>
                    </Link>

                    <Link href="/register" asChild>
                        <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.7}>
                            <Text style={styles.secondaryButtonText}>New Patient? <Text style={{ color: '#4f46e5' }}>Register</Text></Text>
                        </TouchableOpacity>
                    </Link>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FFFFFF', // Clean white background
    },
    imageContainer: {
        width: width,
        height: height * 0.48, // Balanced image height
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        overflow: 'hidden',
        backgroundColor: '#f3f4f6',
    },
    image: {
        width: '100%',
        height: '100%',
    },
    imageOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(79, 70, 229, 0.03)', // Very subtle brand tint
    },
    contentContainer: {
        flex: 1,
        paddingHorizontal: width * 0.08,
        justifyContent: 'space-around', // Pushes buttons to bottom
        paddingVertical: height * 0.03,
    },
    textWrapper: {
        alignItems: 'center',
    },
    brandTag: {
        fontSize: 12,
        fontWeight: '800',
        color: '#9ca3af',
        letterSpacing: 2,
        marginBottom: 8,
    },
    title: {
        fontWeight: '800',
        fontSize: width * 0.09, // font based on screen width
        color: '#1f2937',
        textAlign: 'center',
    },
    divider: {
        width: 40,
        height: 4,
        backgroundColor: '#4f46e5',
        borderRadius: 2,
        marginVertical: 15,
    },
    subtext: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4f46e5',
        textAlign: 'center',
        marginBottom: 10,
    },
    description: {
        fontSize: width * 0.04,
        color: '#4b5563',
        textAlign: 'center',
        lineHeight: width * 0.06,
        paddingHorizontal: 10,
    },
    actionContainer: {
        width: '100%',
        paddingBottom: height * 0.05,     // Keeps a clean gap from the bottom of the screen
    },
    primaryButton: {
        backgroundColor: '#4f46e5',
        paddingVertical: 16,
        borderRadius: 14,      // Slightly rounder for a modern feel
        alignItems: 'center',
        shadowColor: '#4f46e5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 12,      // Small gap between buttons
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    secondaryButton: {
        paddingVertical: 12,
        alignItems: 'center',
        // No large marginBottom here
    },
    secondaryButtonText: {
        color: '#6b7280',
        fontSize: 15,
        fontWeight: '600',
    },
});

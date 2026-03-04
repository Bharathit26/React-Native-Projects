import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import {Link} from 'expo-router'

const Home = () => {

    const ImageSource = require('../assets/images/home.png');
    return (
        <View style={styles.container}>
            {/* Header Image */}
            <Image source={ImageSource} style={styles.image}/>

            {/* Title */}
            <Text style={styles.title}>ChanreCare</Text>
            
            {/* Subtext */}
        <View style={styles.textWrapper}>
            <Text style={styles.subtext}>
                Your joints, our genius.{"\n"}
                <Text style={styles.highlight}>The ultimate destination for autoimmune and allergy solutions.</Text>
            </Text>
        </View>
            
            {/* Links */}
            <Link href="/login" asChild>
                <TouchableOpacity style={styles.link} activeOpacity={0.9}>
                    <Text style={styles.linkText}>Login</Text>
                </TouchableOpacity>
            </Link>
            <Link href="/register" asChild>
                <TouchableOpacity style={styles.link} activeOpacity={0.9}>
                    <Text style={styles.linkText}>Register</Text>
                </TouchableOpacity>
            </Link>
        </View>
    );
};

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
    },

    image: {
        width: '100%',
        height: 280,
        marginBottom: 10,
        borderRadius: 22,
    },

    title: {
        fontWeight: '800',
        fontSize: 32,
        color: '#1A1A1A',
        textAlign: 'center',
        fontFamily: 'MontSertat-Bold'
    },

    textWrapper: {
        marginVertical: 20,
        paddingHorizontal: 10,
    },

    subtext: {
        fontFamily: 'OpeSans-Regular',
        fontSize: 22,
        color: '#666',
        textAlign: 'center',
        lineHeight: 24,
    },

    highlight: {
        fontWeight: '600',
        color: '#007AFF',
    },

    link: {
        backgroundColor: '#007AFF',
        width: '60%',
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
    },

    linkText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});
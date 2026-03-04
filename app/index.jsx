import { StyleSheet, Text, View, Image } from "react-native";
import {Link} from 'expo-router'

const Home = () => {

    const ImageSource = require('../assets/images/home.png');
    return (
        <View style={styles.container}>
            <Image source={ImageSource} style={styles.image}/>
            <Text style={styles.title}>ChanreCare</Text>
            <Text style={styles.subtext}>Your joints, our genius.
The ultimate destination for autoimmune and allergy solutions.</Text>
            
            <Link href="/login" style={styles.link}>Login Page</Link>
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontWeight: 'bold',
        fontSize: 28,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: 'MontSertat-Bold'
    },

    subtext: {
        fontFamily: 'OpeSans-Regular',
        marginTop: 10,
        fontWeight: 18,
    },

    link: {
        marginVertical: 10,
        borderBottomWidth: 1,
    },

    image: {
        width: 350,
        height: 250,
        borderRadius: 20,
        marginBottom: 30,
    }
})
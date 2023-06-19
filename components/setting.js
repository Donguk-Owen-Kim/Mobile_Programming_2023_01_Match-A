import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

function SettingScreen() {
    // For now we'll use hard-coded data, but in a real app
    // you would fetch this data from some kind of API or data source
    const [user, setUser] = useState({
        image: 'https://i.namu.wiki/i/wXGU6DZbHowc6IB0GYPJpcmdDkLO3TW3MHzjg63jcTJvIzaBKhYqR0l9toBMHTv2OSU4eFKfPOlfrSQpymDJlA.webp',
        name: 'Kirby',
        age: 25,
        location: 'Seoul, Korea'
    });

    return (
        <View style={styles.container}>
            <Image
                style={styles.profileImage}
                source={{ uri: user.image }}
            />
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileAge}>Age: {user.age}</Text>
            <Text style={styles.profileLocation}>Location: {user.location}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    profileName: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    profileAge: {
        fontSize: 18,
        marginTop: 10,
    },
    profileLocation: {
        fontSize: 18,
        marginTop: 10,
    }
});

export default SettingScreen;
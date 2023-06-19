import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Image } from 'react-native';

export default function UserSelection({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Image 
          style={styles.image}
          source={require('/Users/dong-uk/Matcha/patient.png')}
        />
        <Text style={styles.text}>Patient</Text>
      </TouchableOpacity>
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Image 
          style={styles.image}
          source={require('/Users/dong-uk/Matcha/doctor.png')} // assuming you have a similar image for doctor
        />
        <Text style={styles.text}>Doctor</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#2196F3'
  },
  button: {
    margin: 10, 
    padding: 50, 
    backgroundColor: 'white', 
    borderRadius: 5, 
    width: 200, 
    height: 200,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 120, 
    height: 120,
    marginBottom: 10,
  },
  text: {
    color: 'black', 
    fontWeight: 'bold'
  },
});
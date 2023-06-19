import React, { useState } from 'react';
import { View, TextInput, Button, Modal, Text, TouchableOpacity, Keyboard, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import doctorsData from './doctorDB.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';


export default function SymptomsScreen() {
  const [selectedSymptom, setSelectedSymptom] = useState('진료항목');
  const [description, setDescription] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('경기 남부');
  const [symptomModalVisible, setSymptomModalVisible] = useState(false);
  const [locationModalVisible, setLocationModalVisible] = useState(false);

  const symptoms = ['내과', '외과', '신경외과', '정형외과', '이비인후과', '소아과', '피부과', '비뇨기과', '산부인과', '안과', '치과', '한의원'].sort((a, b) => a.localeCompare(b, 'ko'));;
  const locations = ['과천시', '수원시', '성남시', '안성시', '용인시', '평택시'].sort((a, b) => a.localeCompare(b, 'ko'));;

  const handleSymptomSelection = (symptom) => {
    setSelectedSymptom(symptom);
    setSymptomModalVisible(false);
  };

  const handleLocationSelection = (location) => {
    setSelectedLocation(location);
    setLocationModalVisible(false);
  };
  const storeData = async (key, value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

const navigation = useNavigation();

const handleSubmit = async () => {
    // Use the imported doctors data instead of fetching it from AsyncStorage
    const doctors = doctorsData;
    let matchedDoctors = [];

    // Loop through all doctors
    for (let doctor of doctors) {
      // Check if doctor's location and major matches patient's location and symptom
      if (doctor.location === selectedLocation && doctor.major === selectedSymptom) {
        // Add doctor to the list of matched doctors
        matchedDoctors.push(doctor);
      }
    }

    // Store the matched doctors in AsyncStorage
    await storeData('@matched_doctors', matchedDoctors);
    
    alert(`We have found ${matchedDoctors.length} doctor(s) for you.`);
    // Navigate to Join screen after storing the matched doctors
    navigation.navigate('Join');
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setSymptomModalVisible(true)} style={styles.selector}>
          <Text>{selectedSymptom}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={symptomModalVisible}
        >
          <View style={styles.centeredView}>
            {symptoms.map((symptom) => (
              <TouchableOpacity key={symptom} onPress={() => handleSymptomSelection(symptom)} style={styles.modalButton}>
                <Text style={[styles.modalButtonText, symptom === selectedSymptom ? styles.selected : styles.unselected]}>{symptom}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <TouchableOpacity onPress={() => setLocationModalVisible(true)} style={styles.selector}>
          <Text>{selectedLocation}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={locationModalVisible}
        >
          <View style={styles.centeredView}>
            {locations.map((location) => (
              <TouchableOpacity key={location} onPress={() => handleLocationSelection(location)} style={styles.modalButton}>
                <Text style={[styles.modalButtonText, location === selectedLocation ? styles.selected : styles.unselected]}>{location}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>

        <TextInput
          style={styles.textInput}
          multiline
          numberOfLines={4}
          onChangeText={setDescription}
          value={description}
          placeholder="Describe your symptoms"
        />

        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  selector: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    padding: 10,
    justifyContent: 'center',
  },
  modalButton: {
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 2,
  },
  modalButtonText: {
    fontSize: 18,
  },
  selected: {
    color: '#2196F3',
    fontWeight:'bold',
    fontSize: 25
  },
  unselected: {
    color: 'gray',
  },
  textInput: {
    height: 100,
    borderColor: 'gray',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
});
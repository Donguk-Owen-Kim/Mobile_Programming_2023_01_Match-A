import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet, Modal, Button, KeyboardAvoidingView, Platform} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SymptomsScreen from './components/symptom';
import SettingScreen from './components/setting';
import doctorsData from './components/doctorDB.json'; // Import my JSON file


// Function to fetch doctors data from AsyncStorage
const fetchMatchedDoctors = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@matched_doctors')
      return jsonValue != null ? JSON.parse(jsonValue) : [];
    } catch(e) {
      console.error(e);
    }
}

function JoinScreen({ route }) {
    // Check if doctors data is passed
    const passedDoctors = route.params?.doctors;

    const [doctors, setDoctors] = useState(passedDoctors || []);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const navigation = useNavigation();

    useFocusEffect(
        React.useCallback(() => {
            const fetchMatchedDoctors = async () => {
                try {
                    const jsonValue = await AsyncStorage.getItem('@matched_doctors')
                    return jsonValue != null ? JSON.parse(jsonValue) : [];
                } catch(e) {
                    console.error(e);
                }
            }
            fetchMatchedDoctors().then(setDoctors);
        }, [])
    );

    const handleDoctorPress = (doctor) => {
      setSelectedDoctor(doctor);
      setModalVisible(true);
    }

    const handleReject = () => {
        setDoctors(doctors.filter(doctor => doctor.id !== selectedDoctor.id));
        setModalVisible(false);
    }
  
    const handleMessage = () => {
        setModalVisible(false);
        navigation.navigate('Message', { doctorName: selectedDoctor.name }); // pass the doctor's name as a parameter
    }

    const closeModal = () => {
        setModalVisible(false);
    };

  return (
    <View style={styles.container}>
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            
            {selectedDoctor && (
                <>
                <Text style={styles.modalTextName}>{selectedDoctor.name}</Text>

                <View style={styles.modalTextContainer}>
                    <Text style={styles.modalTextHospital}>{selectedDoctor.hospital}</Text>
                    <Text style={styles.modalTextMajor}>{selectedDoctor.major}</Text>
                </View>

                <Text style={styles.modalTextLocation}>{selectedDoctor.location}</Text>

                <Text style={styles.modalTextAbstract}>{selectedDoctor.abstract}</Text>
                </>
            )}

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ marginRight: 10 }}>
                    <Button onPress={handleMessage} title="Message" />
                </View>
                <View style={{ marginLeft: 10 }}>
                    <Button onPress={handleReject} title="Reject" color="red" />
                </View>
            </View>
        </View>
        </View>
    </Modal>

      <FlatList
        data={doctors}
        renderItem={({item}) => 
          <TouchableOpacity style={styles.listItem} onPress={() => handleDoctorPress(item)}>
            <Image source={{uri: item.image}} style={styles.image}/>
            <View style={styles.textContainer}>
              <Text style={styles.text_name}>{item.name}</Text>
              <Text style={styles.text_hospital}>{item.hospital}</Text>
            </View>
          </TouchableOpacity>
        }
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
}

function MessageScreen({ route }) {
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const doctorName = route.params?.doctorName;

    const sendMessage = () => {
        if (currentMessage.trim() !== '') {
            setMessages(prevMessages => [...prevMessages, currentMessage]);
            setCurrentMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={messages}
                renderItem={({ item }) => <Text style={styles.message}>{item}</Text>}
                keyExtractor={(item, index) => index.toString()}
                inverted={false} 
            />
            <View style={styles.inputContainer}>
                <TextInput 
                    style={styles.input}
                    value={currentMessage}
                    onChangeText={setCurrentMessage}
                    placeholder="Type a message..."
                />
                <Button title="Send" onPress={sendMessage} />
            </View>
            {Platform.OS === 'ios' && <KeyboardSpacer topSpacing={-90}/>}
        </View>
    );
}

const Tab = createBottomTabNavigator();

export default function Main() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Join" component={JoinScreen} />
      <Tab.Screen name="Message" component={MessageScreen} />
      <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      <Tab.Screen name="Setting" component={SettingScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    closeButton: {
      position: 'absolute', 
      right: 15, 
      top: 15
    },
    closeButtonText: {
      fontSize: 15
    },  
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  listItem: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    marginBottom: 10,
    height: 100
  },
  image: {
    height: "100%",
    width: 100
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center"
  },
  text_name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
  },
  text_hospital: {
    fontSize: 14,
    color: 'gray',
  },
  text_abstract: {
    fontSize: 5,
    color: 'black',
  },  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTextName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'green',
    textAlign: 'center',
    marginBottom: 10
  },
  modalTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  modalTextHospital: {
    fontSize: 14,
    color: 'black',
    marginRight: 10,
  },
  modalTextMajor: {
    fontSize: 14,
    color: 'gray',
    marginLeft : 10,
  },
  modalTextLocation: {
    fontSize: 14,
    color: 'gray',
    textAlign: 'center',
    marginBottom: 10
  },
  modalTextAbstract: {
    fontSize: 14,
    color: 'black',
    textAlign: 'center',
    marginBottom: 20
  },
  msg_container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  message: {
    backgroundColor: '#d1ecf1',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    marginRight: 10,
    padding: 5,
  },
});
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const EditProfileScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Edit Profile</Text>
      </View>
      <View style={styles.form}>
        <View style={styles.formField}>
          <Text style={styles.label}>FIRST NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Daniel"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>LAST NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="Johnson"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>GENDER</Text>
          <Text style={styles.gender}>Male</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>BIRTHDAY</Text>
          <Text style={styles.birthday}>06/07/1986</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>EMAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="daniel5487@gmail.com"
            placeholderTextColor="#ccc"
          />
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>MY RESUME</Text>
          <Text style={styles.resume}>80%</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.label}>LOCATION</Text>
          <TextInput
            style={styles.input}
            placeholder="Champ de, 5 Avenue, France"
            placeholderTextColor="#ccc"
          />
        </View>
      </View>
      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>SAVE</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    height: 150,
    backgroundColor: '#0080c0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  form: {
    padding: 20,
  },
  formField: {
    marginBottom: 20,
    flexDirection:'row'
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  gender: {
    fontSize: 16,
    marginBottom: 5,
  },
  birthday: {
    fontSize: 16,
    marginBottom: 5,
  },
  resume: {
    fontSize: 16,
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#0080c0',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    marginHorizontal: 20,
    marginVertical: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProfileScreen;
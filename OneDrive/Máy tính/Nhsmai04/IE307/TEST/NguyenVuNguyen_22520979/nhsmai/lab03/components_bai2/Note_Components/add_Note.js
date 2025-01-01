import React, { useState,useContext } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import { addNote } from '../Pages/database';
import { ThemeContext } from '../SettingContext';
export default function AddNote({ navigation }) {
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const { colors, fontSize } = useContext(ThemeContext);
  const handleCancel = () => {
    navigation.goBack();
  };


  const handleAddNote = () => {
    addNote(title, note,() =>{
        navigation.goBack();// Quay lại trang Home và yêu cầu refresh
    }) ;
    setTitle('');
    setNote('');
   
  };

  return (
    <View style={[styles.container,{backgroundColor:colors.background}]}>
      <View style={styles.body}>
        <TextInput
          placeholder='Enter your title'
          style={[styles.input_text,{color:colors.text,fontSize:fontSize}]}
          placeholderTextColor={colors.text}
          value={title}
          onChangeText={setTitle}
        />
        {console.log(title)}
        <TextInput
          placeholder='Enter your note'
          style={[styles.input_text, { height: 200,color:colors.text,fontSize:fontSize }]}
          placeholderTextColor={colors.text}
          value={note}
          onChangeText={setNote}
        />
        {console.log(note)}
        <View style={styles.button}>
          <TouchableOpacity
            style={[styles.button_item, { backgroundColor: 'red' }]}
            onPress={handleCancel}
          >
            <Icon name='ban' />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button_item, { backgroundColor: 'green' }]}
            onPress={handleAddNote}
          >
            <Icon name='check' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
  },
  body: {
    width: "100%",
    height: "90%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input_text: {
    width: "90%",
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    padding: 10,
  },
  button: {
    display: 'flex',
    flexDirection: 'row',
    width: "90%",
    justifyContent: 'center',
  },
  button_item: {
    width: 50,
    height: 50,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    textAlign: 'center',
  }
});
import React, { useState ,} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";

import { updateNote } from '../Pages/database';
export default function update_Note({route,navigation}) {
    const {title:oldTitle,content:oldContent,id} = route.params;
    const [title, setTitle] = useState(oldTitle);
    const [note, setNote] = useState(oldContent);
    {console}
    const handleUpdateNote = () => {
        updateNote(id,title,note,()=>{
            navigation.goBack();
        })
    }
    const handleCancel = () => {
        navigation.goBack();
    }

    return (
    <View style={styles.container}>
      <View style={styles.body}>
        <TextInput
          placeholder='Enter your title'
          style={styles.input_text}
          placeholderTextColor='black'
          value={title}
          onChangeText={setTitle}
        />
        {console.log(title)}
        <TextInput
          placeholder='Enter your note'
          style={[styles.input_text, { height: 200 }]}
          placeholderTextColor='black'
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
            onPress={handleUpdateNote}
          >
            <Icon name='check' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
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
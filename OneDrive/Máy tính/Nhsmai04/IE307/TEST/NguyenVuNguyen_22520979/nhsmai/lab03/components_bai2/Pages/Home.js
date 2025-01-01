import React, { useEffect, useState, useCallback, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/FontAwesome";
import { createTable, getNotes, deleteNote } from './database';
import Note from '../Note_Components/Note';
import { ThemeContext } from '../SettingContext';

export default function Home({ navigation }) {
  const [notes, setNotes] = useState([]);
  const { colors, fontSize } = useContext(ThemeContext);

  useEffect(() => {
    createTable();
  }, []);

  useFocusEffect(
    useCallback(() => {
      getNotes(setNotes);
    }, [])
  );

  const handlePress = () => {
    navigation.navigate('Add Note');
  };

  const handleDelete = (id) => {
    deleteNote(id, () => {
      getNotes(setNotes); // Refresh the notes list after deletion
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.headerText, { color: colors.text, fontSize }]}>Note App</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.item}>
          <Text style={[styles.itemText, { color: colors.text, fontSize }]}>All Notes</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={handlePress}
          >
            <Text style={[styles.buttonText, { color: colors.text, fontSize }]}>+</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.list_Note} contentContainerStyle={styles.scrollViewContent}>
          {notes && notes.length > 0 ? (
            notes.map((note, index) => (
              <View key={index} style={styles.list_Item}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('update_Note', { title: note.title, content: note.content, id: note.id })}
                  style={styles.item_content}
                >
                  <Note title={note.title} content={note.content} id={note.id} setNotes={setNotes} />
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={{ color: colors.text, fontSize }}>No notes available</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  header: {
    width: "100%",
    height: "auto",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'skyblue',
  },
  headerText: {
    fontWeight: '800',
  },
  body: {
    width: "100%",
    height: "auto",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  item: {
    width: "90%",
    height: "auto",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    fontSize: 30,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    textAlign: 'center',
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  },
  list_Note: {
    width: "90%",
    height: "90%",
  },
  scrollViewContent: {
    paddingBottom: 100, // Adjust this value based on the height of your tab bar
  },
  list_Item: {
    width: "100%",
    height: "fit-content",
    borderWidth: 1,
    borderColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  item_content: {
    padding: 10,
  },
  deleteButton: {
    padding: 10,
  }
});
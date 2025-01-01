import { View, Text ,StyleSheet,TouchableOpacity} from 'react-native'
import React,{useContext} from 'react'
import Icon from "react-native-vector-icons/FontAwesome";
import { deleteNote } from '../Pages/database';
import {getNotes } from '../Pages/database';
import { ThemeContext } from '../SettingContext';
export default function Note({title,content,id,setNotes}) {
   const { colors, fontSize } = useContext(ThemeContext); 
   const handleDelete = () => {    
   deleteNote(id,() =>{
         getNotes(setNotes);
      })
  }
   return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={[styles.title,{fontSize:fontSize,color:colors.text}]}>{title}</Text>
        <Text style={[styles.note,{fontSize:fontSize,color:colors.text}]}>{content}</Text>
        {console.log(title,content)}
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Icon name='trash' style={[styles.icon,{fontSize:fontSize,color:colors.text}]}/>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
 container: {
    display:'flex',
    flexDirection:'row', 
    flex: 1,
    
    alignItems: 'center',
 },
 content:{
    display:'flex',
    flexDirection:'column',   
    width:"90%",
    
 },
 icon:{
    display:'flex',
    fontSize:40,
    flexDirection:'column',

    color:'red',
 },   
 title:{
    fontSize: 25,
    fontWeight: 'bold',
    color:'black',
 },
 note:{
    fontSize: 20,
    color:'black',
 }
})
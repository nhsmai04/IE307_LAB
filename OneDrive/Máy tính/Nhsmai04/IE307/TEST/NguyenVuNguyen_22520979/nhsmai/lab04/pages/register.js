import {
    View,
    Text,
    StyleSheet,
    Image,
    Switch,
    TextInput,
    TouchableOpacity,
    Dimensions,
    KeyboardAvoidingView,
    ScrollView,
    TouchableHighlight,
    Button
} from 'react-native';
import React from 'react'
import InputText from '../components_bai2/TextInput_component/InputText';
import Icon from "react-native-vector-icons/FontAwesome";
import Log_Button from '../components_bai2/TextInput_component/Log_Button';
import Link_href from '../components_bai2/Link_href';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Register() {
    const navigation = useNavigation()
    return (
        <>
        <KeyboardAvoidingView style={styles.container}>
            
            <View style={styles.header}>
                <Image source={require('../Assets/react_logo.png')} style={styles.logo} />
                <Text style={styles.title}>Create New Account</Text>
            </View>
            <ScrollView style={styles.body}>
                <InputText
                    name='Username'
                    icon='user'
                />
                <InputText
                    name='Email'
                    icon='envelope'
                />
                <InputText
                    name='Password'
                    icon='lock'
                />
                <InputText
                    name='Confirm Password'
                    icon='lock'
                />
                <Log_Button
                NAME='CREATE'
                />
                <View styles={styles.footer}>                  
                    <View>
                    <Link_href
                        title="Already have an account?"
                        content="Login now!"
                        name='login'
                        navigation={navigation}
                    />  
                    </View> 
                </View>
            </ScrollView>
            
        </KeyboardAvoidingView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1, 
            
    },
    header: {
        // flex:1, // i dont know this code doesn't work
        alignItems: 'center',      
    },
    title: {
        fontSize: 30,
        marginVertical: 15,
        fontWeight: 'bold',
    },
    body: {
        marginHorizontal: 20,
        display: 'flex',   
    },
    logo: {
        width: width*0.4,
        height: height*0.2,
        borderRadius: 100
    },
    forgot_pw:{
        fontSize:15,
        fontWeight:'bold',
        color:'red',
        textAlign:'right'
    },
    footer:
    {
        display:'flex',
        flex:1,
        marginTop:10,
       
        
    },
    link_footer:{
        display:'flex',
        marginVertical:20,
        justifyContent:'center',
        flexDirection:'row',
        justifyContent:'space-evenly'
    },
    link_logo:{
        width: width*0.2,
        height: height*0.1,
        borderRadius: 100,
        
    },
})
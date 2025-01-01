// login.js
import React, { useContext } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    KeyboardAvoidingView,
    ScrollView,
    TouchableHighlight,
    Dimensions,
} from 'react-native';
import InputText from './TextInput_component/InputText';
import Log_Button from './TextInput_component/Log_Button';
import Link_href from './Link_href';
import { useNavigation } from '@react-navigation/native';
import { AppContext } from './AppContext'; // Import AppContext

const { width, height } = Dimensions.get('window');

export default function Login() {
    const navigation = useNavigation();

    // Sử dụng useContext để lấy và cập nhật email và password từ AppContext
    const { email, password, updateEmail, updatePassword } = useContext(AppContext);

    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../Assets/react_logo.png')} style={styles.logo} />
                <Text style={styles.title}>Welcome</Text>
            </View>
            <ScrollView style={styles.body}>
                <InputText
                    name="Email"
                    icon="envelope"
                    value={email}
                    onChangeText={updateEmail} // Sử dụng updateEmail để cập nhật email
                />
                <InputText
                    name="Password"
                    icon="lock"
                    value={password}
                    onChangeText={updatePassword} // Sử dụng updatePassword để cập nhật password
                />
                <TouchableHighlight>
                    <Text style={styles.forgot_pw}>Forgot Password?</Text>
                </TouchableHighlight>
                <Log_Button NAME="LOG IN" navigation={navigation} />
                <View styles={styles.footer}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 20 }}>Or login with</Text>
                    <View style={styles.link_footer}>
                        <Image source={require('../Assets/Facebook_Logo_(2019).png.webp')} style={styles.link_logo} />
                        <Image source={require('../Assets/Google__G__logo.svg.png')} style={styles.link_logo} />
                    </View>
                    <View>
                        <Link_href title="Don't have an account?" content="Sign up here!" name="register" navigation={navigation} />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
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
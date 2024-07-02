import { useNavigation } from "@react-navigation/native";
import axios from "axios"
import { useState } from "react";
import { Alert, Image, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native";
const { View } = require("react-native");
import { StyleSheet } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome'



function LoginPage(){
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigation = useNavigation();

 
   function handleSubmit(){
   console.log(email, password);
   const userData={
    email:email,
    password
   }
   axios.post("http://192.168.8.142:5001/login-user", userData).then(res=> {
    console.log(res.data);
    if(res.data.status == 'ok')
    Alert.alert('Logged In Successfull');
    
    
    
  })
   }


    return(
        <View>
            
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/app_images/Login.jpg')}/>
                </View>
                <View style={styles.logoContainer}>
                    <Text style={styles.text_header}>Login</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Mobile or Email " style={styles.textInput}
                        onChange={e => setEmail(e.nativeEvent.text)}
                        />

                    </View>
                    <View style={styles.action}>
                        <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
                        <TextInput placeholder="Password" style={styles.textInput}
                        onChange={e => setPassword(e.nativeEvent.text)}
                        />

                    </View>
                    <View
                    style ={{
                        justifyContent: 'flex-end',
                        alignItems: 'flex-end',
                        marginTop: 20,
                        marginLeft: 280,
                    }}
                    >
                        <Text style={{color: '#420475', fontWeight:'700'}}>
                            Forget Password
                        </Text>

                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity style={styles.inBut} onPress={()=>handleSubmit()}>
                          <View>
                            <Text style={styles.textSign}>Login</Text>
                          </View>
                        </TouchableOpacity>
                        <View style={{padding: 15}}>
                            <Text style={{fontSize:14, fontWeight:'bold', color:'#919191'}}>
                             ----or Continue as----
                            </Text>
                        </View>
                        <View style={styles.bottomButton}>
                            <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            >
                                <TouchableOpacity style={styles.inBut2} onPress={() =>{navigation.navigate("Register")}}>
                                <View>
                            <Text style={styles.textSign}>Signup</Text>
                          </View>
                                </TouchableOpacity>
                               <Text style={styles.bottomText}>I am a new user</Text>
                            </View>

                        </View>
                    </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: 'white',
    },
    textSign: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
    },
    smallIcon: {
      marginRight: 10,
      fontSize: 24,
    },
    logoContainer: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    logo: {
      height: 260,
      width: 260,
      marginTop: 30,
    },
    text_footer: {
      color: '#05375a',
      fontSize: 18,
    },
    action: {
      flexDirection: 'row',
      paddingTop: 14,
      paddingBottom: 3,
      marginTop: 15,
  
      paddingHorizontal: 15,
  
      borderWidth: 1,
      borderColor: '#420475',
      borderRadius: 50,
    },
    textInput: {
      flex: 1,
      marginTop: -12,
  
      color: '#05375a',
    },
    loginContainer: {
      backgroundColor: '#ffffff',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingHorizontal: 20,
      paddingVertical: 30,
    },
    header: {
      justifyContent: 'flex-end',
      paddingHorizontal: 20,
    },
    text_header: {
      color: '#420475',
      fontWeight: 'bold',
      fontSize: 30,
    },
    button: {
      alignItems: 'center',
      marginTop: 20,
      alignItems: 'center',
      textAlign: 'center',
      margin: 20,
    },
    inBut: {
      width: 200,
      backgroundColor: '#420475',
      alignItems: 'center',
      paddingHorizontal: 15,
      paddingVertical: 15,
      borderRadius: 50,
    },
    inBut2: {
      backgroundColor: '#420475',
      height: 65,
      width: 85,
      borderRadius: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    bottomButton: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    smallIcon2: {
      fontSize: 40,
      // marginRight: 10,
    },
    bottomText: {
      color: 'black',
      fontSize: 12,
      fontWeight: '600',
      marginTop: 5,
    },
});

export default LoginPage
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Alert, Image, Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from "axios";

function RegisterPage() {
  const [name, setName] = useState('');
  const [nameVerify, setNameVerify] = useState(false);    
  const [email, setEmail] = useState(''); 
  const [emailVerify, setEmailVerify] = useState(false);   
  const [mobile, setMobile] = useState(''); 
  const [mobileVerify, setMobileVerify] = useState(false);
  const [password, setPassword] = useState(''); 
  const [passwordVerify, setPasswordVerify] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  const navigation = useNavigation();

  function handleSubmit() {
    const userData = {
      name,
      email,
      mobile,
      password,
    };

    if (nameVerify && emailVerify && passwordVerify && mobileVerify) {
      axios.post("http://192.168.8.142:5001/register", userData)
        .then(res  => {
          console.log(res.data);
          if (res.data.status == "ok") {
            Alert.alert("Registration Successful");
            navigation.navigate('Login');
          } else {
            Alert.alert(JSON.stringify(res.data));
          }
        })
        .catch(e => {
          console.log(e);
          Alert.alert("Error", "An error occurred while registering");
        });
    } else {
      Alert.alert("Fill mandatory details");
    }
  }

  function handleName(e) {
    const nameVar = e.nativeEvent.text;
    setName(nameVar);
    setNameVerify(nameVar.length > 1);
  }

  function handleEmail(e) {
    const emailVar = e.nativeEvent.text; 
    setEmail(emailVar);
    setEmailVerify(emailVar.includes('@')); // simple email validation
  }

  function handleMobile(e) {
    const mobileVar = e.nativeEvent.text; 
    setMobile(mobileVar);
    setMobileVerify(/^\d{10}$/.test(mobileVar)); // simple mobile validation
  }

  function handlePassword(e) {
    const passwordVar = e.nativeEvent.text;
    setPassword(passwordVar);
    setPasswordVerify(passwordVar.length >= 6); // simple password validation
  }

  return (
    <View>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../../assets/app_images/Signup.jpg')} />
      </View>
      <View style={styles.logoContainer}>
        <Text style={styles.text_header}>Register</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#420475" style={styles.smallIcon} />
          <TextInput
            placeholder="Name"
            style={styles.textInput}
            onChange={handleName}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="envelope-o" color="#420475" style={styles.smallIcon} />
          <TextInput
            placeholder="Email"
            style={styles.textInput}
            onChange={handleEmail}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="mobile" color="#420475" style={styles.smallIcon} />
          <TextInput
            placeholder="Mobile"
            style={styles.textInput}
            onChange={handleMobile}
          />
        </View>
        <View style={styles.action}>
          <FontAwesome name="lock" color="#420475" style={styles.smallIcon} />
          <TextInput
            placeholder="Password"
            style={styles.textInput}
            secureTextEntry={!showPassword}
            onChange={handlePassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <FontAwesome
              name={showPassword ? "eye-slash" : "eye"}
              color="#420475"
              style={styles.smallIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.button}>
        <TouchableOpacity style={styles.inBut} onPress={handleSubmit}>
          <Text style={styles.textSign}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
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

export default RegisterPage


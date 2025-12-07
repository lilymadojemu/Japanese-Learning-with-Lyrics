import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { signUp } from '../auth/AuthManager';
import { addUser } from '../features/userSlice';
import {Button } from '@rneui/base';


function SignUpBox({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
      const authUser = await signUp(displayName, email, password);
      dispatch(addUser(authUser));
      // Navigation will happen automatically via subscribeToAuthChanges
    } catch (error) {
      Alert.alert("Sign Up Error", error.message, [{ text: "OK" }]);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign Up</Text>
      
      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Display Name: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter display name' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text => setDisplayName(text)}
            value={displayName}
          />
        </View>
      </View>

      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Email: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter email address' 
            autoCapitalize='none'
            spellCheck={false}
            onChangeText={text => setEmail(text)}
            value={email}
          />
        </View>
      </View>

      <View style={styles.loginRow}>
        <View style={styles.loginLabelContainer}>
          <Text style={styles.loginLabelText}>Password: </Text>
        </View>
        <View style={styles.loginInputContainer}>
          <TextInput 
            style={styles.loginInputBox}
            placeholder='enter password' 
            autoCapitalize='none'
            spellCheck={false}
            secureTextEntry={true}
            onChangeText={text => setPassword(text)}
            value={password}
          />
        </View>
      </View>

      <View style={styles.loginRow}>

        <Button
          onPress={async () => {
            try {
              await signUp(email, password);
              navigation.navigate("Tabs");
            } catch(error) {
              Alert.alert("Sign Up Error", error.message,[{ text: "OK" }])
            }
          }}
        >
          Sign Up
        </Button>  
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  loginHeaderText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
    paddingBottom: 40,
  },
  loginRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
    padding: '3%'
  },
  loginLabelContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  loginLabelText: {
    fontSize: 18
  },
  loginInputContainer: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%'
  },
  loginInputBox: {
    width: '100%',
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 6,
    fontSize: 18,
    padding: '2%'
  },
  signUpButton: {
    backgroundColor: '#34C759',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default SignUpBox;
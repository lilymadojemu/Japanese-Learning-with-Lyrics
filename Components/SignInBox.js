import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { signIn } from '../auth/AuthManager';
import {Button } from '@rneui/base';


function SignInBox({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeaderText}>Sign In</Text>
      
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
          title="Sign In"
          onPress={async () => {
            try {
              await signIn(email, password);
              navigation.navigate('Home');
            } catch(error) {
              Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
            }
          }}
        />
      </View>

      <Text style={styles.hintText}>
        Test users:{'\n'}
        hana@flower.com{'\n'}
        kawa@river.com
      </Text>
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
  signInButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 10,
  },
  signInButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  hintText: {
    marginTop: 30,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default SignInBox;
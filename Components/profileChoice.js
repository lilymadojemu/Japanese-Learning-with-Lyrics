import { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../Styles.js';
import { signIn } from '../auth/AuthManager';


function ProfileChoice({navigation}) {
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
            onChangeText={text=>setEmail(text)}
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
            onChangeText={text=>setPassword(text)}
            value={password}
          />
        </View>
      </View>
      <View style={styles.loginRow}>

        <Button
          onPress={async () => {
            try {
              await signIn(email, password);
              navigation.navigate("Home");
            } catch(error) {
              Alert.alert("Sign In Error", error.message,[{ text: "OK" }])
            }
          }}
          title="Sign In"
        />   
      </View>
    </View>
  );
}
export default ProfileChoice;
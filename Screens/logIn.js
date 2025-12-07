import { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { subscribeToAuthChanges } from '../auth/AuthManager';
import SignInBox from '../components/SignInBox';
import SignUpBox from '../components/SignUpBox';



function LoginScreen(props) {
  const [loginMode, setLoginMode] = useState(true);
  const { navigation } = props;

  useEffect(() => {
    subscribeToAuthChanges(navigation);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.bodyContainer}>
        {loginMode ?
          <SignInBox navigation={navigation}/>
        :
          <SignUpBox navigation={navigation}/>
        }
      </View>

      <View style={styles.modeSwitchContainer}>
        { loginMode ? 
          <Text>New user? 
            <Text 
              onPress={() => {setLoginMode(!loginMode)}} 
              style={{color: 'blue'}}> Sign up </Text> 
            instead!
          </Text>
        :
          <Text>Returning user? 
            <Text 
              onPress={() => {setLoginMode(!loginMode)}} 
              style={{color: 'blue'}}> Sign in </Text> 
            instead!
          </Text>
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyContainer: {
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingTop: '10%',
  },
  modeSwitchContainer: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
});

export default LoginScreen;
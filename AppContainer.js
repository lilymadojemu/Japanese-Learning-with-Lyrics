import { useEffect } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer, useNavigation } from '@react-navigation/native'; 
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { subscribeToAuthChanges } from './auth/AuthManager';

import LyricVisualizerScreen from './Screens/lyricVisualizer';
import SongSelectionScreen from './Screens/songSelection';
import VocabReviewScreen from './Screens/vocabReview';
import LoginScreen from './Screens/logIn'
import store from './app/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Bottom Navigation Tabs
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'SongSelect') iconName = 'music';
          else if (route.name === 'VocabReview') iconName = 'book';
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name='SongSelect' component={SongSelectionScreen}/>
      <Tab.Screen name='VocabReview' component={VocabReviewScreen}/>
    </Tab.Navigator>
  );
}

function AuthListener() {
  const navigation = useNavigation();
  
  useEffect(() => {
    subscribeToAuthChanges(navigation);
  }, []);

  return null; // This component just sets up the listener
}

function AppContainer() {
  return( 
    <Provider store={store}>
      <NavigationContainer>
        <AuthListener /> 
        <Stack.Navigator initialRouteName='Login' screenOptions={{ title: 'Learning with Lyrics', headerShown: false }} >
          <Stack.Screen name='Login' component={LoginScreen}/>
          <Stack.Screen name='Tabs' component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name='LyricsView' component={LyricVisualizerScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;
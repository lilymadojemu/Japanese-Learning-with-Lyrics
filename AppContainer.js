import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import LyricVisualizerScreen from './Screens/lyricVisualizer';
import SongSelectionScreen from './Screens/songSelection';
import VocabReviewScreen from './Screens/vocabReview';
import store from './app/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

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

function AppContainer() {
  return( 
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Tabs' screenOptions={{ title: 'Lyric Study' }}>
          <Stack.Screen name='Tabs' component={MyTabs} options={{ headerShown: false }} />
          <Stack.Screen name='LyricsView' component={LyricVisualizerScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;
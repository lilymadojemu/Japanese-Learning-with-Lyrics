// Stack Navigator
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';

import LyricVisualizerScreen from './Screens/lyricVisualizer';
import SongSelectionScreen from './Screens/songSelection';
import VocabReviewScreen from './Screens/vocabReview'
import store from './app/store';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <FontAwesome name="home" size={24} color="black" />
      <Tab.Screen name='SongSelect' component={SongSelectionScreen}/>
      <Tab.Screen name='VocabReview' component={VocabReviewScreen}/>
    </Tab.Navigator>
  );
}
function AppContainer() {
  return( 
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='SongSelect' 
          screenOptions={
            { 
              title: 'Lyric Study',
            }}>
          <Stack.Screen name='Tabs' component={MyTabs}/>
          <Stack.Screen name='LyricsView' component={LyricVisualizerScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;

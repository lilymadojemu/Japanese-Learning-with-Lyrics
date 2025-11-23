// Stack Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from 'react-redux';

import HomeScreen from './screens/HomeScreen';
import DetailsScreen from './screens/DetailsScreen';
import store from './app/store';

const Stack = createNativeStackNavigator();

function AppContainer() {
  return( 
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator 
          initialRouteName='Home' 
          screenOptions={
            { 
              title: 'ListMaker 2000',
            }}>
          <Stack.Screen name='SongSelect' component={HomeScreen}/>
          <Stack.Screen name='LyricsView' component={DetailsScreen}/>
          <Stack.Screen name='VocabReview' component={DetailsScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default AppContainer;
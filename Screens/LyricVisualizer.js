import { getLyrics, getSong } from 'genius-lyrics-api';
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { getTodosThunk } from '../features/todoSlice';

function LyricVisualizerScreen(props) {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

//   API Nonsense

  const listItems = useSelector((state) =>  state.todos.value);

  const { navigation, route } = props;
  // loop through each character/word in a sentence
  // Once you press character/word in 
  return(
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={listItems}
          renderItem={({item})=>{
            return (
              <ListItem item={item} navigation={navigation} />
            );
          }}
        />
      </View>
      <FAB
        title='Add'
        color='darkblue'
        onPress={()=>{
          navigation.navigate('Details', {
            item: {key: -1, text: ''}
          });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  listContainer: {
    flex: 0.6,
    width: '100%',
    paddingLeft: '10%',
    paddingTop: '10%'
  },
});

export default LyricVisualizerScreen;
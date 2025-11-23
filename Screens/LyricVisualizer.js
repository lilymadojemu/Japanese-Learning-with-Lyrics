import { getLyrics, getSong } from 'genius-lyrics-api';
import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTodosThunk } from '../features/todoSlice';


const options = {
	apiKey: 'QK8DV8Uyhb3D6wmXlfbPHty044gTUukThEN_Gz4xktMgG9s6XPH2_TAnUo6lMvTq',
	title: 'Posthumous Forgiveness',
	artist: 'Tame Impala',
	optimizeQuery: true
};

getLyrics(options).then((lyrics) => console.log(lyrics));

getSong(options).then((song) =>
	console.log(`${song.id} - ${song.title} - ${song.url} - ${song.albumArt} - ${song.lyrics}`)
);


function LyricVisualizerScreen(props) {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

//   API Nonsense

  const listItems = useSelector((state) =>  state.todos.value);

  const { navigation, route } = props;

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
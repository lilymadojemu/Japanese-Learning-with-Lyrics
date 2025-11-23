import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getTodosThunk } from '../features/todoSlice';

function songSelectionScreen(props) {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  const songSelections = useSelector((state) =>  state.todos.value);

  const { navigation, route } = props;

  return(
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList
          data={songSelections}
          renderItem={({item})=>{
            return (
              <SongChoice item={item} navigation={navigation} />
            );
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default songSelectionScreen;
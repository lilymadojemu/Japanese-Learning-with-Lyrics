import { StyleSheet, View, FlatList } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
// import { getLyricsThunk } from '../features/lyrlice';

function VocabReviewScreen(props) {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getTodosThunk());
  }, []);

  const flashcardItems = useSelector((state) =>  state.lyrics.value);

  const { navigation, route } = props;

  return(
    <View style={styles.container}>
        {/* Render Flashcard */}
        {/* Render Buckets for Next Appearance */}
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

export default VocabReviewScreen;
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { getFlashcardsThunk } from '../Features/flashcardSlice';
import Flashcard from '../Components/flashcard';


function VocabReviewScreen(props) {

  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getFlashcardsThunk());
  }, []);

  const flashcardItems = useSelector((state) =>  state.flashcards.value);

  const [index, setIndex] = useState(0)

  const { navigation, route } = props;

  // Handle case when no flashcards exist
  if (!flashcardItems || flashcardItems.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No flashcards yet!</Text>
      </View>
    );
  }

  // get the current flashcard
  const currentCard = flashcardItems[index]


  return(
    <View style={styles.container}>
      <View style={styles.listContainer}>
        {/* Progress indicator */}
        <Text style={styles.progressText}>
          Card {index + 1} of {flashcardItems.length}
        </Text>

      {/* Render one Flashcard at a time for each word in flashcard collection*/}
      <Flashcard key={currentCard.key} item={currentCard} navigation={navigation}/>

      {/* Navigation Buttons */}
      <View style={styles.btnContainer}>
          {/* Render Buttons for moving through flashcard item list */}
          {/* Previous */}
          {flashcardItems[index - 1] && <TouchableOpacity onPress={() => setIndex(index-1)}>
            <Text> Previous</Text>
          </TouchableOpacity>}

          {/* if the next item in flashcard list exists, you can press next Next */}
         { flashcardItems[index + 1] && <TouchableOpacity onPress={() => setIndex(index+1)}>
            <Text> Next </Text>
          </TouchableOpacity>}
        </View>
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
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 15,
  },
  progressText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    fontWeight: '500',
  },
});

export default VocabReviewScreen;
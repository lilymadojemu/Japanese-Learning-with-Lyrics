import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useState } from 'react';

function Flashcard(props) {

  const { item, navigation } = props;

  // Tracking whether a card is flipped or not
  const [isFlipped, setIsFlipped] = useState(false);
  const [reading, setReading] = useState('');
  const [translation, setTranslation] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFlip = async () => {
    if (isFlipped) {
      // Flip back to front
      setIsFlipped(false);
      return;
    }

    // Flip to back and fetch translation
    setIsFlipped(true);
    setLoading(true);

    try {
      const url = `https://jisho.org/api/v1/search/words?keyword=${item.text}`;
      const res = await fetch(url);
      const data = await res.json();

      if (data.data && data.data.length > 0) {
        const firstResult = data.data[0];
        
        // Get reading (hiragana)
        const readingText = firstResult.japanese[0].reading || '';
        setReading(readingText);
        
        // Get translation (English)
        const meanings = firstResult.senses[0].english_definitions.join(', ');
        setTranslation(meanings);

        console.log("Reading:", readingText);
        console.log("Translation:", meanings);
      } else {
        setReading('');
        setTranslation('No translation found');
      }
    } catch (error) {
      console.error("Error:", error);
      setReading('');
      setTranslation('Translation unavailable');
    } finally {
      setLoading(false);
    }
  }; 

  return (  
    <View style={styles.listItemContainer}>
      <TouchableOpacity style={styles.cardStyle} onPress={handleFlip}> 
        {!isFlipped ? (
          // Front: show Japanese word
          <Text style={styles.frontText}>{item.text}</Text>
        ) : (
          // Back: show translation
          <View style={styles.backContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <>
                {reading && <Text style={styles.readingText}>{reading}</Text>}
                <Text style={styles.translationText}>{translation}</Text>
              </>
            )}
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}  // ✅ Flashcard closes here - only ONE bracket

const styles = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '1%',
  },
  cardStyle: {
    backgroundColor: "red",
    minHeight: 150,     // ✅ Give it height
    minWidth: 250,      // ✅ Give it width
    borderRadius: 12,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  frontText: {
    color: "white",
    fontSize: 48,
    fontWeight: 'bold',
  },
  backContainer: {
    width: '100%',
    alignItems: 'center',
  },
  readingText: {
    color: "white",
    fontSize: 28,
    marginBottom: 10,
  },
  translationText: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
  }
});

export default Flashcard;
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
// import { getFlashcardsThunk } from '../Features/flashcardSlice';

// function Flashcard(props) {

//   const { item, navigation } = props;

//   // Tracking whether a card is flipped or not
//   const [isFlipped, setIsFlipped] = useState(false);
//   const [reading, setReading] = useState('');
//   const [translation, setTranslation] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleFlip = async () => {
//     if (isFlipped) {
//       // If already flipped, flip back to front
//       setIsFlipped(false);
//       return;
//     }

//     // Flip to back and fetch data
//     setIsFlipped(true);
//     setLoading(true);

//     try {
//       const url = `https://jisho.org/api/v1/search/words?keyword=${item.text}`;
//       const res = await fetch(url);
//       const data = await res.json();

//       console.log("Full response:", data);

//       if (data.data && data.data.length > 0) {
//         const firstResult = data.data[0];
        
//         // Get reading
//         const readingText = firstResult.japanese[0].reading || '';
//         setReading(readingText);
        
//         // Get translation
//         const meanings = firstResult.senses[0].english_definitions.join(', ');
//         setTranslation(meanings);

//         console.log("Reading:", readingText);
//         console.log("Translation:", meanings);
//       } else {
//         setReading('');
//         setTranslation('No translation found');
//       }
//     } catch (error) {
//       console.error("Error fetching translation:", error);
//       setReading('');
//       setTranslation('Translation unavailable');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     // The card
//     <View style={styles.listItemContainer}>
//       <TouchableOpacity style={styles.cardStyle} onPress={handleFlip}> 
//         {!isFlipped ? (
//           // Front of card
//           <Text style={styles.frontText}>{item.text}</Text>
//         ) : (
//           // Back of card
//           <View style={styles.backContainer}>
//             {loading ? (
//               <ActivityIndicator size="large" color="#ffffff" />
//             ) : (
//               <>
//                 {reading ? (
//                   <Text style={styles.readingText}>{reading}</Text>
//                 ) : null}
//                 <Text style={styles.translationText}>{translation}</Text>
//               </>
//             )}
//           </View>
//         )}
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   listItemContainer: {
//     width: '100%',
//     justifyContent: 'flex-start',
//     alignItems: 'center',
//     flexDirection: 'row',
//     backgroundColor: 'white',
//     padding: '1%',
//   },
//   cardStyle: {
//     backgroundColor: "red",
//     minHeight: 150,
//     minWidth: 250,
//     borderRadius: 12,
//     padding: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   frontText: {
//     color: "white",
//     fontSize: 48,
//     fontWeight: 'bold',
//   },
//   backContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   readingText: {
//     color: "white",
//     fontSize: 28,
//     marginBottom: 10,
//   },
//   translationText: {
//     color: "white",
//     fontSize: 20,
//     textAlign: 'center',
//   }
// });

// export default Flashcard;
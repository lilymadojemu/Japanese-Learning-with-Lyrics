import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { addFlashcardThunk } from '../Features/flashcardSlice';

// Simple offline tokenizer
function tokenizeJapanese(text) {
  if (!text) return [];

  return text
    .replace(/([。、・！？\s])/g, " $1 ")       // punctuation spacing
    .replace(/([ぁ-んァ-ン]+)/g, " $1 ")        // kana clusters
    .replace(/([一-龯]+)/g, " $1 ")             // kanji clusters
    .replace(/([A-Za-z0-9]+)/g, " $1 ")         // English/number segments
    .split(" ")
    .map(t => t.trim())
    .filter(t => t.length > 0);
}

function LyricLine({ line }) {
  // Individualizes Lyrics to sensible Japanese words (mostly)
  const [tokens, setTokens] = useState([]);
  // Translation for each word the user presses
  const [translation, setTranslation] = useState(null);

  useEffect(() => {
    setTokens(tokenizeJapanese(line));
  }, [line]);

  if (!tokens.length) return <Text style={styles.empty}>No tokens found</Text>;

  return (
    <View style={styles.lineContainer}>
      {translation && (
        <Text style={styles.translationText}>
          {translation}
        </Text>
      )}
      {tokens.map((word, i) => (
        <TouchableOpacity
          key={i}
          onPress={async () => {
            try {
              const url = `https://api.mymemory.translated.net/get?q=${word}&langpair=ja|en`;

              const res = await fetch(url);
              const data = await res.json();

              const translatedWord = data.responseData.translatedText;

              console.log("Translation:", translatedWord);

              setTranslation(translatedWord);

            } catch (err) {
              console.error("Translation error:", err);
            }
          }}
          onLongPress={() => {
            console.log("Save to flashcards:", word)
            dispatch(addFlashcardThunk(word))
          }}
        >
          <Text style={styles.word}>{word}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  lineContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 4,
    alignItems: 'center',
  },
  word: {
    fontSize: 18,
    marginHorizontal: 2,
    padding: 2,
  },
  empty: { color: 'gray' },
});

export default LyricLine;
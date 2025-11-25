import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    setTokens(tokenizeJapanese(line));
  }, [line]);

  if (!tokens.length) return <Text style={styles.empty}>No tokens found</Text>;

  return (
    <View style={styles.lineContainer}>
      {tokens.map((word, i) => (
        <TouchableOpacity
          key={i}
          onPress={async () => {
            try {
              const raw = await res.text();
              console.log(raw);
              const res = await fetch("https://libretranslate.com/translater", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  q: word,
                  source: "ja",
                  target: "en",
                  format: "text",
                }),
              });

              const data = await res.json();
              console.log("Translation:", data.translatedText);

            } catch (err) {
              console.error("Translation error:", err);
            }
          }}
          onLongPress={() => console.log("Save to flashcards:", word)}
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
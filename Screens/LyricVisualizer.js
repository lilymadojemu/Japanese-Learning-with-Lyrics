import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import LyricLine from "../Components/lyricLine";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

// Songs
import { Lilac } from "../Songs/Lilac";
import { SpringOfLife } from "../Songs/springOfLife";
import { PrayerX } from "../Songs/PrayerX";
import { RightNow } from "../Songs/rightNow";
import { Sakuranbo } from "../Songs/sakuranbo";

const songSelections = [Lilac, SpringOfLife, PrayerX, RightNow, Sakuranbo]

function LyricVisualizerScreen(props) {
  const { route, navigation } = props;
  const { song } = route.params;

  console.log (song)
  // loop through each character/word in a sentence
  // Once you press character/word in 


  return(
    <View style={styles.container}>
        {/* // Go back to home screen (songSelection.js) */}
        <Text
              style={{ fontSize: 20, color: 'blue' }}
              onPress={() => {
                navigation.goBack();
              }}
        >Back</Text>
      <View style={styles.listContainer}>
      <FlatList
        data={song.lyrics}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>     <LyricLine line={item} navigation={navigation} />}
      />
      </View>
      {/* Previous Song in List*/}
      <TouchableOpacity>
        <MaterialCommunityIcons name="skip-previous" size={24} color="black" />
      </TouchableOpacity>
      {/* onPress fetch song from api */}
     <TouchableOpacity onPress={async () => {
            {
              const url = `https://api.spotify.com/v1/search
`;

              const res = await fetch(url);
              const data = await res.json();

              const translatedWord = data.responseData.translatedText;

              console.log("Translation:", translatedWord);

              setTranslation(translatedWord);

            }
          }}>
          <FontAwesome name="play" size={24} color="black" />
      </TouchableOpacity>
      {/* Next Song in List*/}
      <TouchableOpacity>
          <AntDesign name="forward" size={24} color="black" />    
      </TouchableOpacity>
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
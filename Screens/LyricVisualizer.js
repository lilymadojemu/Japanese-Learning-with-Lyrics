import { StyleSheet, View, FlatList, Text, TouchableOpacity } from "react-native";
import LyricLine from "../Components/lyricLine";

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
      <View style={styles.listContainer}>
      <FlatList
        data={song.lyrics}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) =>     <LyricLine line={item} navigation={navigation} />
}
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
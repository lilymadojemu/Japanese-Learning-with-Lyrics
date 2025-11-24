import { StyleSheet, View, FlatList } from "react-native";
import SongChoice from "../Components/songChoice";


// Song
import { Lilac } from "../Songs/Lilac";
import { SpringOfLife } from "../Songs/springOfLife";
import { PrayerX } from "../Songs/PrayerX";
import { RightNow } from "../Songs/rightNow";
import { Sakuranbo } from "../Songs/sakuranbo";

const songSelections = [Lilac, SpringOfLife, PrayerX, RightNow, Sakuranbo]
function SongSelectionScreen(props) {

  const { navigation} = props;

  return(
    <View style={styles.container}>
      <View>
        <FlatList
          data={songSelections}
          renderItem={({item})=>{
            return (
              <SongChoice
              title = {item.title}
              albumArt = {item.albumArt}
              />
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

export default SongSelectionScreen;
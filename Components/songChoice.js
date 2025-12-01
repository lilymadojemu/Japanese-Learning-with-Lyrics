
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Lilac } from "../Songs/Lilac";
import { SpringOfLife } from "../Songs/springOfLife";
import { PrayerX } from "../Songs/PrayerX";
import { RightNow } from "../Songs/rightNow";
import { Sakuranbo } from "../Songs/sakuranbo";

const songSelections = [Lilac, SpringOfLife, PrayerX, RightNow, Sakuranbo]

function SongChoice(props) {

  const { item, navigation} = props;
  console.log(songSelections)


  return (
    <View style={styles.listItemContainer}>
      <ImageBackground source={item.albumArt} style={{ width: 50, height: 50 }} imageStyle={{resizeMode: 'stretch'}}> </ImageBackground>
      <TouchableOpacity onPress={() => navigation.navigate('LyricsView', { song: item })}> 
         <Text>{item.title}</Text>
    </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  listItemContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: '1%',
  },
});

export default SongChoice;
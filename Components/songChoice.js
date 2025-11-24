
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

function SongChoice(props) {

  const { item, navigation} = props;

  return (
    <View style={styles.listItemContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('LyricsView', { song: item })}> 
         <Image source={item.albumArt}> </Image>
         <Text style={styles.listItemText}>{item.title}</Text>
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
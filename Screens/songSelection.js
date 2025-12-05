import { StyleSheet, View, FlatList, TouchableOpacity, Alert } from "react-native";
import { signOut } from '../auth/AuthManager';

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
        <Text> Welcome! </Text>
        <FlatList
          data={songSelections}
          renderItem={({item})=>{
            return (
              <SongChoice item={item} navigation={navigation}
              />
            );
          }}
        />
        <TouchableOpacity 
        onPress={async () => {
          try {
            await signOut();
            navigation.navigate('Login');
          } catch (error) {
            Alert.alert("Sign Out Error", error.message,[{ text: "OK" }])
          }
        }}>
          Sign Out
        </TouchableOpacity>
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
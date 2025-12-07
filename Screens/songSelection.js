import { StyleSheet, View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { signOut, getAuthUser } from '../auth/AuthManager';
import {Button } from '@rneui/base';


import SongChoice from "../Components/songChoice";

// Song
import { Lilac } from "../Songs/Lilac";
import { SpringOfLife } from "../Songs/springOfLife";
import { PrayerX } from "../Songs/PrayerX";
import { RightNow } from "../Songs/rightNow";
import { Sakuranbo } from "../Songs/sakuranbo";

const songSelections = [Lilac, SpringOfLife, PrayerX, RightNow, Sakuranbo]

function SongSelectionScreen(props) {

  const {navigation} = props;

  
// Source - https://stackoverflow.com/a
// Posted by Steve Harrison, modified by community. See post 'Timeline' for change history
// Retrieved 2025-12-06, License - CC BY-SA 4.0
function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}


  return(
    <View style={styles.container}>
      <View>
        <Text>
          Welcome, {capitalizeFirstLetter(getAuthUser().email.split('@')[0])}!
        </Text>
        <FlatList
          data={songSelections}
          renderItem={({item})=>{
            return (
              <SongChoice item={item} navigation={navigation}
              />
            );
          }}
        />

      <Button
        title="Sign Out"
        onPress={async () => {
          await signOut();
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
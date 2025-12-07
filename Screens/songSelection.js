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

  return(
    <View style={styles.container}>
      <View>
        <Text>
          Welcome, {getAuthUser()?.displayName}!
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
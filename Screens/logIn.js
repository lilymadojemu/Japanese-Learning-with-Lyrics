import { StyleSheet, View, FlatList } from "react-native";
import ProfileChoice from "../Components/profileChoice";
// import profile info from firebase???


function LoginScreen(props) {

  const { navigation} = props;

  return(
    <View style={styles.container}>
      <View style={styles.profiles}>
        {/* Chose from one of the two profiles to enter */}
        {/* item is the profile names/info */}
        {/* Hana */}
        <ProfileChoice item={item} navigation={navigation}/>
        {/* Kawa */}
        <ProfileChoice item={item} navigation={navigation}/>
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
  profiles: {
    flexDirection: row
  }
});

export default LoginScreen;
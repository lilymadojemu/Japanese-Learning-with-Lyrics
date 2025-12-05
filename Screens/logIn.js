import { StyleSheet, View} from "react-native";
import ProfileChoice from "../Components/profileChoice";
import { styles } from '../Styles.js';


function LoginScreen(props) {

  const {navigation} = props;

  const [loginMode, setLoginMode] = useState(true);


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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profiles: {
    flexDirection: "row"
  }
});

export default LoginScreen;
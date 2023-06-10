import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';

function HomeScreen (){
  return (<Text>sdsdsd</Text>)
}
export default function Router() {
    const Stack = createNativeStackNavigator();
    return (
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen  name="Home" component={HomeScreen} options={{ title: 'Overview' }} />
          </Stack.Navigator>
        </NavigationContainer>
      );
}
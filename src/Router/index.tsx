import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StyleSheet} from 'react-native';
import {Home} from '../Screens/Home';

export function Router() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerTintColor: 'white',
          headerStyle: {backgroundColor: 'tomato'},
        }}>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            gestureEnabled: false,
            title: 'Awesome app',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    padding: 10,
    flexDirection: 'row',
  },
  iconButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: 8,
    borderRadius: 20,
    marginLeft: 10,
  },
});

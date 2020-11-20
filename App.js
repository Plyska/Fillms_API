import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {MainPage} from './src/MainPage';
import {Details} from './src/Details';
import {AddFilm} from './src/AddFilm';

const Stack = createStackNavigator();
const App = ({navigation}) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Films"
          component={MainPage}
          options={({navigation}) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('AddFilm');
                }}>
                <Image source={require('./src/plus.png')} />
              </TouchableOpacity>
            ),
            headerTitle: <Text>FILMS</Text>,
          })}
        />

        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddFilm" component={AddFilm} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {},
});

export default App;

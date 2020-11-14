import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
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
import {Details} from './src/Details'

const Stack = createStackNavigator(); 
const App = () => {


  return (
  <>

<NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Films"
                    component={MainPage}
                />
                    <Stack.Screen 
                    name="Details"
                    component={Details}
                />
              </Stack.Navigator>
</NavigationContainer>
 
  </>
  );
};



export default App;

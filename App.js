import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image
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
import { AddFilm } from "./src/AddFilm";

const Stack = createStackNavigator(); 
const App = ({ navigation }) => {



  return (
  
<NavigationContainer >

            <Stack.Navigator  >
                
                  
                <Stack.Screen 
                    
                    name="Films"
                    component={MainPage}
                    options={({navigation}) => ({
                      headerRight: () => (
                        <View>
                          <Image source={require('./src/plus.png')}/>
                        </View>
                      )
                    })}
                />
                
               
                <Stack.Screen 
                    name="Details"
                    component={Details}
                    
                />
                <Stack.Screen 
                    name="AddFilm"
                    component={AddFilm}
                />
              </Stack.Navigator>
              
</NavigationContainer>
 
  
  );
};
const styles = StyleSheet.create({
  container: {

  }
});


export default App;

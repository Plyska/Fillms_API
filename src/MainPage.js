import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
  } from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import AppContext from './App.Context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Details} from './Details'

export const MainPage = ({ navigation }) => {

    const [filmsList, setFilmsList] = useState([]);
    const [button, setButton] = useState(false);
    const appContext = useContext(AppContext);

   

useEffect(()=>{
    fetch("http://localhost:3000/films")
    .then(res => res.json())
    .then(res => {
        setFilmsList(res);
    })
    .catch((error) => {
        console.log("API call error");
        console.error(error);
    })
}, [])

    return (
 
        <ScrollView>
<View style={styles.container}>
           
           {filmsList.map((films) => (
               <View key={films._id}>

                   <Text 
                        onPress={()=> {navigation.navigate('Details', {
                            id: films._id
                        })}}
                        style={{margin: 10}} >
                           {films.Title}
                   </Text>
                    
               </View>
           ))}          
      
       </View>
     </ScrollView>

 
    )
    
}



const styles = StyleSheet.create({
    container: {
      

    }
});


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
import { Details } from './Details'

export const MainPage = ({ navigation }) => {

    const [filmsList, setFilmsList] = useState([]);
    const [button, setButton] = useState(false);
    const appContext = useContext(AppContext);



    useEffect(() => {
        fetch("http://192.168.31.105:3000/films")
            .then(res => res.json())
            .then(res => {
                setFilmsList(res);
            })
            .catch((error) => {
                console.log("API call error");
                console.log(error);
                console.log(123123);
                console.error(error);

            })
    }, [filmsList])

    return (

        <ScrollView style={styles.box}>
            <View >
            <Text onPress={() => { navigation.navigate('AddFilm') }}>Add Film</Text>
            <View style={styles.container}>

                {filmsList.map((films) => (
                    <View key={films._id} style={styles.boxText}>

                        <Text
                            style={styles.text}
                            onPress={() => {
                                navigation.navigate('Details', {
                                    id: films._id
                                })
                            }}
                             >
                            {films.Title}
                        </Text>

                    </View>
                ))}

            </View>
            </View>
        </ScrollView>


    )

}



const styles = StyleSheet.create({
    box: {
        backgroundColor: "pink"
    },
    container: {
        alignItems: "center",
    },
    boxText: {
        marginTop: 20,
        borderBottomColor: 'black',
        borderBottomWidth: 0.5
     },
     text: {
         fontSize: 17,
         fontFamily: "Cochin",
         fontWeight: "bold"
     }
});


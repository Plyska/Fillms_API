import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput
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
    const [search, setSearch] = useState("");
    const appContext = useContext(AppContext);


    useEffect(() => {
        fetch(`http://192.168.31.105:3000/films?search=${search}` )
            .then(res => res.json())
            .then(res => {
                setFilmsList(res.sort((a,b) => {
                    let nameA = a.Title.toLowerCase();
                    let nameB = b.Title.toLowerCase();
                    if(nameA < nameB) {
                        return - 1;
                    }
                     else if (nameA > nameB) {
                        return 1;
                    } else{
                        return 0;
                    }
                }));
            })
            .catch((error) => {
                console.log("API call error");
                console.log(error);
                console.log(123123);
                console.error(error);

            })
    }, [filmsList, search])

    return (

        <ScrollView>
            <View >
                <View style={{margin: 20}}>
                    <TextInput 
                    placeholder="search"
                    onChangeText={(text) => { 
                        setSearch(text);                    
                    }}
                    />
                </View>
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
    container: {
        alignItems: "flex-start",
        marginLeft: 10
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


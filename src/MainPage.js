import React, { useState, useContext, useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    TextInput,
    Image
} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Details } from './Details'
import {backEndAdress} from './backEndAdress';

export const MainPage = ({ navigation }) => {

    const [filmsList, setFilmsList] = useState([]);
    const [button, setButton] = useState(false);
    const [search, setSearch] = useState("");

   

    useEffect(() => {
        fetch(`${backEndAdress}/films?search=${search}` )
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
            <View>
            <View style={styles.search}>
                <Image 
                    source={require('./search.png')}
                />
                <View>
                    <TextInput 
                    placeholder="Search"
                    onChangeText={(text) => { 
                        setSearch(text);                    
                    }}
                    />
                </View>
            </View>
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
                { filmsList.length === 0 ? <Text style={styles.textNoFound}>No films found</Text> : null}

            </View>
            </View>
        </ScrollView>


    )

}



const styles = StyleSheet.create({
    container: {
        marginRight: 15,
        marginLeft: 15
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
    },
    textNoFound: {
        marginTop: 40,
        textAlign: "center",
        fontWeight: "bold"
    },
    search: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginRight: 15,
        marginTop: 15,
        marginLeft: 15,
        borderTopWidth: 0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderWidth: 2.5,
    }
});


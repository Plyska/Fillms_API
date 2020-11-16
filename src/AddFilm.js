import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


export const AddFilm = ( { navigation }) => {
    const [valueTitle, setValueTitle] = useState('');
    const [valueYear, setValueYear] = useState('');
    const [valueFormat, setValueFormat] = useState('');
    const [valueStars, setValueStars] = useState([]);
    const arrStars = []; 
    

    const sendObj = () => {
        fetch("http://192.168.31.105:3000/films", {
            method: "post",
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
              },
            body: JSON.stringify({
                "Title": valueTitle,
                "ReleaseYear": valueYear,
                "Format": valueFormat,
                "Stars": ['qwe', 'asd']
            })
        }
        )
        .then(res => res.json)
        .then(
            navigation.navigate('Films')
        )}



   const pushStarInArr = ()=> {
   setValueStars([valueStars]);   
   
   }
   console.log(valueStars);

   

    return (
     <View style={styles.container}>
         <View style={styles.boxInput}>
            <Text style={styles.text}>Title</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text)=>setValueTitle(text)}
            />
        </View>

        <View style={styles.boxInput}>
            <Text style={styles.text}>Release year</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(year)=>setValueYear(year)}
            />
        </View>

        <View style={styles.boxInput}>
            <Text style={styles.text}>Formate</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(format)=>setValueFormat(format)}
             />
        </View>

        <View style={styles.boxInput}>
            <Text style={styles.text}>Stars</Text>
            <Text><Button title="Add" onPress={() => pushStarInArr()}/></Text>
            <TextInput 
            style={styles.input}
            onChangeText={(star)=>setValueStars(star)}
             />
        </View>
    <Text>{valueStars}</Text>


        <Text style={styles.button}><Button color="magenta" title="ADD" onPress={() => sendObj()}/></Text>
     </View>
    )
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        alignItems: "center",
        height: "100%"
    },
    boxInput: {
        width: "80%",
        borderTopWidth: 0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderWidth: 2.5,
        borderColor: "black",
        marginBottom: 50
    },
    text: {
        fontSize: 22,
        fontFamily: "Cochin",
        fontWeight: "bold",
        color: "black"
    },
    input: {
        fontSize: 18
    },
    button: {
        marginTop: 60,
        alignItems: "center",
      }
  });
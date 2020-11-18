import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import {backEndAdress} from './backEndAdress';
import * as Animatable from 'react-native-animatable';
import RNPickerSelect from 'react-native-picker-select';


export const AddFilm = ( { navigation }) => {
    const [valueTitle, setValueTitle] = useState('');
    const [valueYear, setValueYear] = useState(0);
    const [valueFormat, setValueFormat] = useState('');
    const [valueStars, setValueStars] = useState([]);
    const [titleValidate, setTitleValidate] = useState(true);
    const [yearValidate, setYearValidate] = useState(true);
    const arrStars = []; 
    

    const sendObj = () => {
        if( valueTitle != " " && valueYear != 0 && valueFormat != " " && valueStars.length != 0 ){
        fetch(`${backEndAdress}/films`, {
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
        )} else {
                Alert.alert(
                    "NOT CORRECT",
                    "All fields must be filled",
                    [
                      {
                        text: "Yes",
                        onPress: () => console.log("yes"),
                      }
                    ],
                    { 
                      cancelable: false,
                    }
                  )
            
        }
    
    }
    
    
    
    
    
        const checkValidationTitle = (check) => { 
        if(check.length === 0 ) {
           return setTitleValidate(false);
        }
            return setTitleValidate(true);
        

    }
    const checkValidationYear = (check) => { 
        if(check < 1850 ) {
            console.log(check);
           return setYearValidate(false);
        } else if (check > new Date().getFullYear()){
            console.log(2);
            return setYearValidate(false);
        } else {
            console.log(3);
            return setYearValidate(true);
        }
        

    }



   const pushStarInArr = ()=> {
   setValueStars([valueStars]);   
   
   }

   

    return (
     <View style={styles.container}>
         <View style={styles.boxInput}>
            <Text style={styles.text}>Title</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(text)=>setValueTitle(text)}
            onBlur={(item) => checkValidationTitle(item.nativeEvent.text)}
            />
        </View>
        <View >
        {titleValidate ? null : 
        <Animatable.View style={styles.boxError} animation="fadeInLeft" duration={400}>
        <Text style={styles.errorMsg}>error.m</Text>
        </Animatable.View>
        }</View>
       

        <View style={styles.boxInput}>
            <Text style={styles.text}>Release year</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(year)=>setValueYear(year)}
            onBlur={(item) => checkValidationYear(item.nativeEvent.text)}
            />
        </View>

        <View >
        {yearValidate ? null : 
        <Animatable.View style={styles.boxError} animation="fadeInLeft" duration={400}>
        <Text style={styles.errorMsg}>error.m</Text>
        </Animatable.View>
        }</View>

        {/* <View style={styles.boxInput}>
            <Text style={styles.text}>Formate</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(format)=>setValueFormat(format)}
             />

        </View> */}

        <View style={styles.select}>
        <Text style={styles.textSelect}>Formate</Text>
        < RNPickerSelect 
            
            onValueChange={(format)=>setValueFormat(format)}
            items={[
                {label: "DVD", value:"DVD"},
                {label: "VHS", value:"VHS"},
                {label: "Blu-Ray", value:"Blu-Ray"}
            ]}
        />
        </View>
           
        <View style={styles.boxInput}>    
            <Text style={styles.text}>Stars</Text>
            <TextInput 
            style={styles.input}
            onChangeText={(star)=>setValueStars(star)}
             />
        </View>
        <Text><Button color="black" title="Add Star" onPress={() => pushStarInArr()}/></Text>
          

        <View style={styles.button}>
        <Text><Button color="black" title="ADD FILM" onPress={() => sendObj()}/></Text>
        </View>
     </View>
    )
}



const styles = StyleSheet.create({
    container: {
        paddingTop: 30,
        height: "100%",
        marginRight: 35,
        marginLeft: 35
    },
    boxInput: {
       
        borderTopWidth: 0,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderWidth: 2.5,
        borderColor: "black",
        marginBottom: 15,
        marginTop: 25


    },
    text: {
        fontSize: 22,
        fontFamily: "Cochin",
        fontWeight: "bold",
        color: "black",
    },
    input: {
        fontSize: 18
    },
    button: {
        marginTop: 80,
        alignItems: "center"
      },
    errorMsg: {
        color: "red",
        textAlign: "left"
    },
    select: {
        marginBottom: 15,
        marginTop: 25
    },
    textSelect: {
        fontSize: 22,
        fontFamily: "Cochin",
        fontWeight: "bold",
        color: "black",
    }
    
  });
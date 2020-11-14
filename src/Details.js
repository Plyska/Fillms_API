import React, { useEffect, useState } from 'react';
import { Button, View } from 'react-native';
import { Text } from 'react-native';

export const Details = ({route, navigation}) => {

    const {id} = route.params
    const [film, setFilm] = useState([]);
useEffect(()=> {
    fetch("http://localhost:3000/films/" + route.params.id)
    .then(res => res.json())
    .then(res => {
        setFilm(res);
    })  

}, [id])

const deleteFilm = () => {

   
        fetch("http://localhost:3000/films/" + route.params.id, {
            method: "delete"
        })
        .then(res => res.json())
        .then(
            navigation.navigate('MainPage')
        )


  

}
  


    return (
    <View>
        <View>
            <Text>Title: </Text>
            <Text>{film.Title}</Text>
        </View>
        <View>
            <Text>Release Year: </Text>
            <Text>{film.ReleaseYear}</Text>
        </View>
        <View>
            <Text>Format: </Text>
            <Text>{film.Format}</Text>
        </View>
        <Text>
            <Button title="DELETE" onPress={() => deleteFilm()}/>
        </Text>
        
    </View>    
    )
}
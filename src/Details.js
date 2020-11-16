import React, { useEffect, useState } from 'react';
import { Button, View, StyleSheet } from 'react-native';
import { Text } from 'react-native';

export const Details = ({route, navigation}) => {

    const {id} = route.params
    const [film, setFilm] = useState([]);


    useEffect(()=> {
    fetch("http://192.168.31.105:3000/films/" + route.params.id)
    .then(res => res.json())
    .then(res => {
        setFilm(res);
    })  

}, [id])

const deleteFilm = () => {

   
        fetch("http://192.168.31.105:3000/films/" + route.params.id, {
            method: "delete"
        })
        .then(res => res.json())
        .then(
            navigation.navigate('Films')
        )


  

}
  


    return (
  
    <View >
          {film.Stars != undefined ? 
<View style={styles.container}>
    <View style={styles.boxView}> 
          <Text style={styles.title}>Title: </Text>
          <Text style={styles.text}>{film.Title}</Text>   
    </View>

    <View style={styles.boxView}>      
         <Text style={styles.title}>Release Year: </Text>
          <Text style={styles.text}>{film.ReleaseYear}</Text>   
    </View> 

    <View style={styles.boxView}>             
          <Text style={styles.title}>Format: </Text>
          <Text style={styles.text}>{film.Format}</Text>  
    </View>

    <View style={styles.boxActors}>   
        <View><Text style={styles.stars}>Stars:</Text></View>     
           <View><Text style={styles.oneStar}>{film.Stars.map((star) => (
             <Text>{star}{"\n"}</Text>
            ))}</Text></View>     
    </View>

        <Text style={styles.button}>
          <Button color="black" title="DELETE" onPress={() => deleteFilm()}/>
        </Text>    
</View>
          
  : <Text>Text loading...</Text>}
        
        
    </View>    
    )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "pink",
    height: "100%",
    alignItems: "flex-start",
    paddingLeft: 10
  },
  text: {
    fontSize: 25,
    fontFamily: "Cochin",
    fontWeight: "bold",
   

  },
  title: {
    paddingTop: 5,
    fontSize: 17,
    fontWeight: "normal",
  },
  boxStars: {
    display: "flex"
  },
  boxActors: {
    marginTop: 30,
    alignItems: "center",
    flexDirection: "row",
    alignItems: "flex-start"
  },
  boxView: {
    marginTop: 30,
    flexDirection: "row"
  },
  stars: {
    paddingTop: 5,
    fontSize: 17
  },
  oneStar: {
    marginLeft: 10,
    fontSize: 25,
    fontFamily: "Cochin",
    fontWeight: "bold"
  },
  button: {
    marginTop: 60,
    alignItems: "center"
  }
});
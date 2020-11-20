import React, {useEffect, useState} from 'react';
import {Button, View, StyleSheet, Text, Alert} from 'react-native';
import {backEndAdress} from './backEndAdress';

export const Details = ({route, navigation}) => {
  const {id} = route.params;
  const [film, setFilm] = useState([]);

  useEffect(() => {
    fetch(`${backEndAdress}/films/` + route.params.id)
      .then((res) => res.json())
      .then((res) => {
        setFilm(res);
      });
  }, [id]);

  const getAlert = () => {
    Alert.alert(
      'Delete',
      'are you sure you want to delete this film?',
      [
        {
          text: 'No',
          onPress: () => null,
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => deleteFilm(),
        },
      ],
      {
        cancelable: false,
      },
    );
  };

  const deleteFilm = () => {
    fetch('http://192.168.31.105:3000/films/' + route.params.id, {
      method: 'delete',
    })
      .then((res) => res.json())
      .then(navigation.navigate('Films'));
  };

  return (
    <View>
      {film.Stars != undefined ? (
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
            <View>
              <Text style={styles.stars}>Stars:</Text>
            </View>
            <View>
              <Text style={styles.oneStar}>
                {film.Stars.map((star) => (
                  <Text>
                    {star}
                    {'\n'}
                  </Text>
                ))}
              </Text>
            </View>
          </View>
          <View style={styles.button}>
            <Text>
              <Button color="black" title="DELETE" onPress={() => getAlert()} />
            </Text>
          </View>
        </View>
      ) : (
        <Text>Text loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    height: '100%',
    paddingLeft: 20,
  },
  text: {
    fontSize: 25,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  title: {
    paddingTop: 5,
    fontSize: 17,
    fontWeight: 'normal',
  },
  boxStars: {
    display: 'flex',
  },
  boxActors: {
    marginTop: 30,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  boxView: {
    marginTop: 30,
    flexDirection: 'row',
  },
  stars: {
    paddingTop: 5,
    fontSize: 17,
  },
  oneStar: {
    marginLeft: 10,
    fontSize: 25,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 60,
    alignItems: 'center',
  },
});

import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ScrollView,
} from 'react-native';
import {backEndAdress} from './backEndAdress';
import * as Animatable from 'react-native-animatable';
import RNPickerSelect from 'react-native-picker-select';

export const AddFilm = ({navigation}) => {
  const [valueTitle, setValueTitle] = useState('');
  const [valueYear, setValueYear] = useState(0);
  const [valueFormat, setValueFormat] = useState('');
  const [valueStars, setValueStars] = useState([]);
  const [titleValidate, setTitleValidate] = useState(true);
  const [yearValidate, setYearValidate] = useState(true);
  const [text, setText] = useState('');
  const arrStars = [];

  const sendObj = () => {
    if (
      titleValidate === true &&
      yearValidate === true &&
      valueFormat != '' &&
      valueStars.length != 0
    ) {
      fetch(`${backEndAdress}/films`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          //'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          Title: valueTitle,
          ReleaseYear: valueYear,
          Format: valueFormat,
          Stars: valueStars,
        }),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.status === 'ok') {
            navigation.navigate('Films');
          } else {
            Alert.alert('NOT CORRECT', 'Film already exists');
          }
        });
    } else {
      Alert.alert(
        'NOT CORRECT',
        'All fields must be filled',
        [
          {
            text: 'OK',
            onPress: () => console.log('yes'),
          },
        ],
        {
          cancelable: false,
        },
      );
    }
  };

  const checkValidationTitle = () => {
    if (valueTitle === '') {
      return setTitleValidate(false);
    }
    return setTitleValidate(true);
  };

  const checkValidationYear = () => {
    if (isNaN(valueYear)) {
      return setYearValidate(false);
    } else if (valueYear < 1850) {
      return setYearValidate(false);
    } else if (valueYear > new Date().getFullYear()) {
      return setYearValidate(false);
    } else {
      return setYearValidate(true);
    }
  };

  const pushStarInArr = () => {
    setValueStars([...valueStars, text]);
    setText('');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.boxInput}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setValueTitle(text)}
          onBlur={(item) => checkValidationTitle(item.nativeEvent.text)}
        />
      </View>
      <View>
        {titleValidate ? null : (
          <Animatable.View
            style={styles.boxError}
            animation="fadeInLeft"
            duration={400}>
            <Text style={styles.errorMsg}>Fill correct value</Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.text}>Release year</Text>
        <TextInput
          style={styles.input}
          onChangeText={(year) => setValueYear(year)}
          onBlur={(item) => checkValidationYear(item.nativeEvent.target)}
        />
      </View>

      <View>
        {yearValidate ? null : (
          <Animatable.View
            style={styles.boxError}
            animation="fadeInLeft"
            duration={400}>
            <Text style={styles.errorMsg}>Fill correct value</Text>
          </Animatable.View>
        )}
      </View>

      <View style={styles.select}>
        <Text style={styles.textSelect}>Formate</Text>
        <RNPickerSelect
          value={valueFormat}
          onValueChange={(format) => setValueFormat(format)}
          items={[
            {label: 'DVD', value: 'DVD'},
            {label: 'VHS', value: 'VHS'},
            {label: 'Blu-Ray', value: 'Blu-Ray'},
          ]}
        />
      </View>

      <View style={styles.boxInput}>
        <Text style={styles.text}>Stars</Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={(text) => setText(text)}
        />
      </View>
      <Text>
        <Button
          color="black"
          title="Add Star"
          onPress={() => pushStarInArr()}
        />
      </Text>
      {valueStars.map((item, index) => (
        <Text key={index}>{item} </Text>
      ))}

      <View style={styles.button}>
        <Text>
          <Button color="black" title="ADD FILM" onPress={() => sendObj()} />
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    paddingRight: 35,
    paddingLeft: 35,
  },
  boxInput: {
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 2.5,
    borderColor: 'black',
    marginBottom: 15,
    marginTop: 25,
  },
  text: {
    fontSize: 22,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    fontSize: 18,
  },
  button: {
    marginTop: 80,
    marginBottom: 80,
    alignItems: 'center',
  },
  errorMsg: {
    color: 'red',
    textAlign: 'left',
  },
  select: {
    marginBottom: 15,
    marginTop: 25,
  },
  textSelect: {
    fontSize: 22,
    fontFamily: 'Cochin',
    fontWeight: 'bold',
    color: 'black',
  },
});

import React, { useState } from 'react';
import { View, Text, TextInput, FlatList } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import DatePicker from './DatePicker';

import styles from './styles';
import api from '../../services/api';
import { useNavigation } from '@react-navigation/native';

const CreatePoll: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [closingDate, setClosingDate] = useState(new Date());

  const [optionAdd, setOptionAdd] = useState('');

  const navigation = useNavigation();

  function handleAddOption() {
    setOptions(val => [...val, optionAdd]);
    setOptionAdd('');
  }

  function handleRemoveOption(option: string) {
    setOptions(val => val.filter(item => item !== option));
  }

  async function handleSubmit() {
    const response = await api.post('polls', {
      title,
      description,
      options,
      closingDate,
    });

    if (response.status === 200) {
      navigation.navigate('Home');
    } else {
      alert('There was an error while saving your poll. Please try again.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        <View style={styles.inputGroup}>
          <Text style={styles.text}>Poll title:</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>Description:</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={text => setDescription(text)}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>Options:</Text>
          <FlatList
            data={options}
            renderItem={({ item }) => (
              <View style={styles.optionsListItem}>
                <Text style={styles.text}>{item}</Text>
                <TouchableOpacity
                  style={{ marginLeft: 10, padding: 10 }}
                  onPress={() => handleRemoveOption(item)}
                >
                  <Ionicons name="ios-close" size={20} color="red" />
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={option => option}
          />

          <View style={styles.optionsInputContainer}>
            <TextInput
              style={styles.optionsInput}
              value={optionAdd}
              onChangeText={text => setOptionAdd(text)}
            />
            <RectButton
              style={styles.optionsAddButton}
              onPress={handleAddOption}
            >
              <Ionicons name="ios-add" size={20} color="#fff" />
            </RectButton>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.text}>Closing date:</Text>
          <DatePicker
            value={closingDate}
            onChange={date => setClosingDate(date)}
            styleAndroid={styles.input}
            textStyleAndroid={styles.text}
          />
        </View>

        <RectButton style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.savingButtonText}>Save</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default CreatePoll;

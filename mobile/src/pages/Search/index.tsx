import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, FlatList } from 'react-native';

import api from '../../services/api';
import Poll from '../../interfaces/Poll';
import PollCard from '../../components/PollCard';

import styles from './styles';

let lastTerm = '';

const Search: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Poll[]>([]);

  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setSearchResults([]);
    } else if (searchTerm !== lastTerm) {
      api
        .get<Poll[]>('polls', { params: { search: searchTerm } })
        .then(response => {
          setSearchResults(response.data);
          lastTerm = searchTerm;
        });
    }
  }, [searchTerm]);

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        style={styles.searchBox}
        placeholder="Search for polls"
        value={searchTerm}
        onChangeText={text => setSearchTerm(text)}
      />

      <FlatList
        data={searchResults}
        renderItem={({ item }) => <PollCard poll={item} />}
        keyExtractor={item => String(item.id)}
      />
    </View>
  );
};

export default Search;

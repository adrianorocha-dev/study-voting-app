import React from 'react';
import { View } from 'react-native';
import PollCard from '../../components/PollCard';

import useFetch from '../../hooks/useFetch';
import Poll from '../../interfaces/Poll';

import styles from './styles';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Home: React.FC = () => {
  const [polls, loading] = useFetch<Poll[]>('polls');

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.pollsListContainer}
        data={polls}
        renderItem={({ item }) => <PollCard poll={item} />}
        keyExtractor={poll => String(poll.id)}
      />
    </View>
  );
};

export default Home;

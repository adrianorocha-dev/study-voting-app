import React from 'react';
import { Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import Poll from '../../interfaces/Poll';

import styles from './styles';

const PollCard: React.FC<{ poll: Poll }> = ({ poll }) => {
  const navigation = useNavigation();

  function handleOpenPoll() {
    navigation.navigate({ name: 'Detail', params: { poll_id: poll.id } });
  }

  return (
    <RectButton style={styles.container} onPress={handleOpenPoll}>
      <Text style={[styles.text, styles.textBold]}>{poll.title}</Text>
      <Text style={styles.text}>{poll.votes} votes</Text>
    </RectButton>
  );
};

export default PollCard;

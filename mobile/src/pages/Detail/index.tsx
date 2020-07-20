import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { RectButton, TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import RadioButton from '../../components/RadioButton';
import api from '../../services/api';

import styles from './styles';

type Poll = {
  id: number;
  title: string;
  description: string;
  views: number;
  creationDate: string;
  closingDate: string;
  options: {
    id: number;
    name: string;
    votes: number;
  }[];
};

const Detail: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<number>();
  const [resultMode, setResultMode] = useState(false);
  const [poll, setPoll] = useState<Poll>();

  const route = useRoute();

  const voteCount = poll?.options.reduce((sum, option) => ({
    id: -1,
    poll,
    name: 'Total',
    votes: sum.votes + option.votes,
  }));

  useEffect(() => {
    fetchPoll();
  }, []);

  function handleSelectOption(option: number) {
    setSelectedOption(option);
  }

  const fetchPoll = useCallback(async () => {
    //@ts-ignore
    const response = await api.get(`polls/${route.params?.poll_id}`);

    setPoll(response.data);
  }, [route]);

  async function handleVote() {
    const response = await api.post('votes', { option_id: selectedOption });

    if (response.status === 200) {
      showResults();
    } else {
      alert('There was an error registering the vote. Please try again');
    }
  }

  async function showResults() {
    await fetchPoll();
    setResultMode(true);
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoBox}>
        {!poll ? (
          <ActivityIndicator />
        ) : (
          <>
            <Text style={styles.title}>{poll?.title}</Text>
            <Text style={styles.text}>{poll?.description}</Text>
            <View style={[styles.optionsContainer]}>
              {poll?.options.map(option =>
                resultMode ? (
                  <View key={option.id} style={styles.optionResult}>
                    <Text style={styles.text}>
                      {option.name}: {option.votes} (
                      {Math.round(
                        (option.votes / Number(voteCount?.votes)) * 100 * 100
                      ) / 100}
                      %)
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    key={option.id}
                    style={styles.option}
                    onPress={() => setSelectedOption(option.id)}
                  >
                    <RadioButton
                      size={16}
                      color="#000"
                      checked={selectedOption === option.id}
                    />
                    <Text style={styles.text}> {option.name}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>

            {!resultMode && (
              <RectButton style={styles.voteButton} onPress={handleVote}>
                <Text style={styles.voteButtonText}>Vote</Text>
              </RectButton>
            )}
          </>
        )}
      </View>
    </View>
  );
};

export default Detail;

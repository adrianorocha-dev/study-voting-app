import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';
import Poll from '../../interfaces/Poll';

import './styles.css';
import api from '../../services/api';

const Detail: React.FC = () => {
  const { id: poll_id } = useParams();

  const [poll, loading] = useFetch<Poll>(`polls/${poll_id}`);
  const [selectedOption, setSelectedOption] = useState<number>();

  const history = useHistory();

  useEffect(() => {
    api.post('views', { poll_id });
  }, [poll_id]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedOption(Number(event.target.value));
  }

  async function handleVote() {
    const response = await api.post('votes', { option_id: selectedOption });

    if (response.status === 200) {
      history.push(`/results/${poll_id}`);
    } else {
      alert('Error while registering vote. Please try again');
    }
  }

  return (
    <div className="detail-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <h1>{poll?.title}</h1>
          <p>{poll?.description}</p>
          <ul className="options-list">
            {poll?.options.map(option => (
              <li key={option.id} className="options-list-item hover-pointer">
                <input
                  id={String(option.id)}
                  name="option"
                  type="radio"
                  value={option.id}
                  checked={selectedOption === option.id}
                  onChange={handleChange}
                />
                <label htmlFor={String(option.id)}> {option.name}</label>
              </li>
            ))}
          </ul>

          <button className="button-vote" onClick={handleVote}>
            Vote
          </button>
        </section>
      )}
    </div>
  );
};

export default Detail;

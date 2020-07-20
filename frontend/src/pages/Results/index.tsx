import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

import useFetch from '../../hooks/useFetch';

import './styles.css';

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

const Results: React.FC = () => {
  const { id: poll_id } = useParams();

  const [poll, loading] = useFetch<Poll>(`polls/${poll_id}`);

  const totalVotes = poll?.options.reduce((count, option) => ({
    id: -1,
    name: 'Total',
    votes: count.votes + option.votes,
  }));

  return (
    <div className="detail-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section>
          <h1>{poll?.title} - Results</h1>
          <p>{poll?.description}</p>
          <ul className="options-list">
            {poll?.options.map(option => (
              <li key={option.id} className="options-list-item">
                <p>
                  {option.name}: {option.votes} (
                  {Math.round(
                    (option.votes / Number(totalVotes?.votes)) * 100 * 100
                  ) / 100}
                  %)
                </p>
              </li>
            ))}
            <li className="options-list-item">
              <p>Total votes: {totalVotes?.votes}</p>
            </li>
          </ul>
        </section>
      )}
    </div>
  );
};

export default Results;

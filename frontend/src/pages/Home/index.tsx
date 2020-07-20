import React, { useState, useMemo } from 'react';

import useFetch from '../../hooks/useFetch';
import sortByOption, { SortType } from '../../utils/sortByOption';

import Sidebar from '../../components/Sidebar';
import PollCard from '../../components/PollCard';

import Poll from '../../interfaces/Poll';

import './styles.css';

const Home: React.FC = () => {
  const [polls, loading] = useFetch<Poll[]>('polls');
  const [sortBy, setSortBy] = useState<SortType>();
  const [sortAscending, setSortAscending] = useState(false);

  function sortPollsBy(option: SortType) {
    if (sortBy !== option) {
      setSortBy(option);
    } else {
      setSortAscending(val => !val);
    }
  }

  return (
    <>
      <div className="container">
        <Sidebar sortFunction={sortPollsBy} />
        <main>
          <ul className="poll-list">
            {loading ? (
              <p>Loading...</p>
            ) : (
              (sortBy
                ? sortByOption(polls ?? [], sortBy, sortAscending)
                : polls
              )?.map(poll => (
                <li key={poll.id}>
                  <PollCard poll={poll} />
                </li>
              ))
            )}
          </ul>
        </main>
      </div>
    </>
  );
};

export default Home;
